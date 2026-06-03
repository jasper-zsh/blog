---
source_hash: 0318c47d9010c44a0d3824ce3ff0aea48bdd8ee6d620eae0412eb28141c9e1bb
title: Analysis of Junce Coulometer Bluetooth Protocol
author: JasperZ
date: 2025-08-14
tags:
  - car-life
  - embedded
draft: false
---

## Overview

Based on the behavior of selecting services via `uni.getBLEDeviceServices`, it was determined that the protocol uses the second-to-last service (a very crude method).

The `monitor` method is used to initiate data listening. Searching for `uni.onBLECharacteristicValueChange` reveals that the callback method for handling received data is `rxd`.

The usage of each Characteristic is as follows:

| Index | UUID | Purpose            |
|-------|------|--------------------|
| 0     | FFF1 | Receiving Data     |
| 1     | FFF2 | Sending Commands   |

---

## Data Handling

All numbers in the protocol are parsed by treating HEX values directly as decimal number strings. This will not be reiterated in the following sections.

### Some Special Packets

- `0x48`: Firmware upgrade in progress  
- `0x4848`: Unknown, possibly indicates upgrade completion  
- `0x44`: `t.online = true`, likely indicates connection status  
- `0x45`: Upgrade failed  
- `0x43`: `true1` increments, this is a counter, purpose unknown  

### Data Packets

Normal data packets start with either `0xBB` or `0xAA`, and end with `0xEE`.

The packet processing logic is quite crude. The packet type is determined by inclusion checks, and packets are categorized into three types:

- `0xA0`: Chart data object, handled by `historyStrToObj` function  
- `0xF4`: Chart data time, handled by `historyTimeStrToObj` function  
- All other cases are treated as general data objects, handled by `strToObj` function  

---

### Data Objects

The data stream is not structured as standard binary data, so byte order does not need to be considered. However, the disassembled processing logic still resembles Little Endian (processed from right to left). In single-byte HEX format, purely numeric values represent decimal integers (converted directly as decimal strings), while other values represent data fields. The meanings of these fields are listed below:

| Field | Meaning                                      |
|-------|----------------------------------------------|
| 0xF6  | Password                                     |
| 0xE0  | Data loading in progress. Send `0x9AA9` to continue retrieving data, or `0x9AE0` to start loading data |
| 0xD2  | Remaining battery, 3-digit integer + 3-digit decimal (DDD.DDD) |
| 0xB0  | Total battery, 3-digit integer + 1-digit decimal (DDD.D) |
| 0xF9  | Low battery alarm percentage, 2-digit value |
| 0xF7  | To be confirmed, temperature unit |
| 0xD9  | Temperature, first two bytes are unit, last two bytes are integer temperature |
| 0xC0  | Voltage, 2-digit integer + 2-digit decimal (DD.DD) |
| 0xC1  | Current, 2-digit integer + 2-digit decimal (DD.DD) |
| 0xD8  | Power, unit: Watts, 4-digit integer + 2-digit decimal (DDDD.DD) |
| 0xC4  | Address match, 2-digit value |
| 0xB7  | Relay type, 0 = Normally Open (NO), 1 = Normally Closed (NC) |
| 0xD5  | Number of data records |
| 0xF1  | Data logging switch, 0 = ON, 1 = OFF |
| 0xF8  | Data logging interval, 2-digit value = interval - 1 |

---

### Parsing Logic for Data Objects (`strToObj`)

Parsing is done from right to left. The first byte is the field identifier, followed by bytes that can be directly parsed as decimal numbers to form the value.

---

### Commands

When sending data, there are some special logic rules. The pseudo-code is as follows:

```javascript
writeDataValue = data
if writeDataValue == 0x9AA9
    send(0xBB9AA90CEE)
else
    if writeDataValue == 'AR' or 'AD'
        send(strToArrayBuffer(writeDataValue))
    else
        if writeDataValue contains 'b9', 'b8', 'f4', 'f6', 'f2', 'e1'
            send(0xBB + data + 0x0CEE)
        else
            send(checkAdd(writeDataValue))
```

Clearly, there are two special commands: `AR` and `AD`. They are not in HEX format.

`AR` and `AD` appear to be related to firmware upgrades and will not be analyzed at this time.

The `checkAdd` function's pseudo-code is as follows:

```javascript
checkAdd(data) {
    payload = 0xBB + data
    checksum = 0
    for b in payload
        checksum += b
    if password
        checksum = checksumWithPassword(checksum + password)
    else
        checksum = checksum[-1:]
    return payload + checksum + 0xEE
}
```

Judging from the magic numbers in the pseudo-code and the implementation of `checkAdd`, the last byte of the packet is a checksum. However, experiments have shown that without a password, this byte is always `0x0C`.

---

### Command List

| Command                                           | Meaning                                      |
|--------------------------------------------------|----------------------------------------------|
| `0x9AE0`                                         | Start loading data                           |
| `0x9AA9`                                         | Request data object                          |
| `0x9AF6`                                         | Unknown, used in password exchange           |
| `0x9AF9 + byte + 0xF9`                           | Set low battery warning threshold percentage   |
| `0x00A5`                                         | Factory reset                                |
| `0x00A6`                                         | Reboot device                                |
| `0x9AC100A4`                                     | CurrentClear                                 |
| `0x9AC4 + byte + C4`                             | Set communication address                    |
| `0x9AC3 + byte + C3`                             | Tpton                                        |
| `0x9AC2 + byte + C2`                             | Tptoff                                       |
| `0x9AE9 + byte + E9`                             | Min, byte = actual value × 10                |
| `0x9AE7 + byte + E7`                             | LossVoltage, byte = actual value × 100       |
| `0x9AE8 + byte + E8`                             | FullCurrent, byte = actual value truncated last two digits (to be confirmed) |
| `0x9AE6 + byte + E6`                             | FullVoltage, byte = actual value × 100       |
| `0x9AB7 + byte + B7`                             | Relay type, byte = 00 or 01, meaning to be confirmed |
| `0x9AE3 + byte + E3`                             | LTP, byte has a complex calculation logic (see below) |
| `0x9AB1 + byte + B1`                             | ETP, byte has a complex calculation logic (see below) |
| `0x9AC9 + byte + C9`                             | OPP, byte = actual value × 100               |
| `0x9AC8 + byte + C8`                             | NCP, byte = actual value × 100               |
| `0x9AC7 + byte + C7`                             | OCP, byte = actual value × 100               |
| `0x9AC6 + byte + C6`                             | LVP, byte = actual value × 100               |
| `0x9AC5 + byte + C5`                             | OVP, byte = actual value × 100               |
| `0x9AF1 + byte + F1`                             | Data logging, 00 = ON, 01 = OFF              |
| `0x9AF8 + byte + F8`                             | Clear data log, logic to be analyzed         |
| `bytes(yymmdd) + 0xF2 + bytes(hhiiss) + 0xF39AF29AF3` | Set date and time                            |
| `0x9AD2 + byte + D2`                             | MBFree, logic to be analyzed                 |
| `0x9AB0 + byte + 0xB0`                           | Set battery capacity, byte = actual value × 10, max 9999 |
| `0x9AE39AB19AF70255E30255B1 + byte + F7`         | Set temperature unit, byte logic to be confirmed |
| `0x9AD99AB4 + byte + B4`                         | Set temperature (to be confirmed), byte = actual value |
| `0x9AC09AB2 + byte + B2`                         | VoltageAlign                                 |
| `0x9AC19AB3 + byte + B3`                         | CurrentAlign                                 |

---

### Calculation Logic for LTP / ETP