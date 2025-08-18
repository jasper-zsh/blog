const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config(); // 从.env文件加载环境变量

// 配置部分
const CONTENT_DIR = path.join(__dirname, 'content');
const TARGET_LANG = 'en';
const API_KEY = process.env.DASHSCOPE_API_KEY; // 请设置百炼平台的API Key
const MODEL_ID = 'qwen-plus'; // 使用的模型ID

// 检查是否提供了API密钥
if (!API_KEY) {
  console.error('请设置DASHSCOPE_API_KEY环境变量');
  process.exit(1);
}

// 计算文件的SHA256哈希值
function calculateFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// 扫描所有Markdown文件
async function scanMarkdownFiles() {
  const pattern = path.join(CONTENT_DIR, '**/*.md');
  const files = await glob(pattern);
  
  // 过滤掉已经是翻译文件的文件（包含语言代码的文件）
  const originalFiles = files.filter(file => {
    const basename = path.basename(file);
    // 检查文件名是否符合"文件名.语言.md"模式
    const isTranslation = basename.includes('.') && basename.endsWith('.md') && 
                         basename.split('.').length === 3 && basename.split('.')[1].length <= 5;
    
    return !isTranslation;
  });
  
  return originalFiles;
}

// 检查翻译文件是否存在且是否需要更新
function checkTranslationExists(originalFile) {
  const dir = path.dirname(originalFile);
  const basename = path.basename(originalFile, '.md');
  const translationFile = path.join(dir, `${basename}.${TARGET_LANG}.md`);
  
  // 如果翻译文件不存在，直接返回
  if (!fs.existsSync(translationFile)) {
    return {
      exists: false,
      needsUpdate: true,
      translationFile: translationFile
    };
  }
  
  // 计算原文件的哈希值
  const originalFileHash = calculateFileHash(originalFile);
  
  // 读取翻译文件内容
  const translationContent = fs.readFileSync(translationFile, 'utf8');
  
  // 检查翻译文件的YAML头部是否包含源文件的哈希值
  const hashMatch = translationContent.match(/source_hash:\s*([a-f0-9]+)/);
  
  // 如果翻译文件中没有哈希或者哈希不匹配，则需要更新
  const needsUpdate = !hashMatch || hashMatch[1] !== originalFileHash;
  
  return {
    exists: true,
    needsUpdate: needsUpdate,
    translationFile: translationFile,
    sourceHash: originalFileHash
  };
}

// 调用百炼平台API进行翻译
async function translateContent(content) {
  try {
    const response = await axios.post(
      'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      {
        model: MODEL_ID,
        input: {
          messages: [
            {
              role: 'system',
              content: 'You are a professional translator. Translate the following Chinese text to English, maintaining the technical accuracy and natural flow of the content.'
            },
            {
              role: 'user',
              content: content
            }
          ]
        },
        parameters: {
          incremental_output: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'X-DashScope-SSE': 'disable' // 禁用SSE
        }
      }
    );
    
    // 提取翻译结果
    if (response.data && 
        response.data.output && 
        response.data.output.text) {
      return response.data.output.text;
    } else {
      throw new Error('Invalid response format: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('Translation error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// 处理单个文件的翻译
async function processFile(originalFile) {
  const checkResult = checkTranslationExists(originalFile);
  const { exists, needsUpdate, translationFile } = checkResult;
  
  // 计算原文件的哈希值
  const originalFileHash = calculateFileHash(originalFile);
  
  if (exists && !needsUpdate) {
    console.log(`翻译文件已存在且为最新: ${translationFile}`);
    return false; // 没有更新
  }
  
  if (exists && needsUpdate) {
    console.log(`原文件已更新，重新翻译: ${originalFile}`);
  } else {
    console.log(`正在翻译: ${originalFile}`);
  }
  
  try {
    // 读取原始文件内容
    const content = fs.readFileSync(originalFile, 'utf8');
    
    // 调用翻译API
    const translatedContent = await translateContent(content);
    
    // 解析YAML头部和正文
    let yamlHeader = '';
    let markdownContent = translatedContent;
    
    // 检查是否有YAML头部
    if (translatedContent.startsWith('---')) {
      const endOfYaml = translatedContent.indexOf('---', 3);
      if (endOfYaml > 0) {
        yamlHeader = translatedContent.substring(0, endOfYaml + 3);
        markdownContent = translatedContent.substring(endOfYaml + 3).trim();
      }
    }
    
    // 如果有YAML头部，添加source_hash字段
    let finalContent = translatedContent;
    if (yamlHeader) {
      // 检查是否已存在source_hash字段
      if (yamlHeader.includes('source_hash:')) {
        // 更新现有的source_hash
        finalContent = yamlHeader.replace(/source_hash:\s*[a-f0-9]+/, `source_hash: ${originalFileHash}`) + '\n' + markdownContent;
      } else {
        // 添加新的source_hash字段
        finalContent = yamlHeader.replace('---', `---\nsource_hash: ${originalFileHash}`) + '\n' + markdownContent;
      }
    } else {
      // 如果没有YAML头部，添加一个包含source_hash的新头部
      finalContent = `---\nsource_hash: ${originalFileHash}\n---\n${translatedContent}`;
    }
    
    // 写入翻译文件
    fs.writeFileSync(translationFile, finalContent, 'utf8');
    console.log(`翻译完成: ${translationFile}`);
    return true; // 有更新
  } catch (error) {
    console.error(`翻译失败 ${originalFile}:`, error.message);
    process.exit(127); // 翻译出错时使用127退出
  }
}

// 主函数
async function main() {
  try {
    const files = await scanMarkdownFiles();
    console.log(`找到 ${files.length} 个Markdown文件`);
    
    let hasUpdates = false;
    
    for (const file of files) {
      const updated = await processFile(file);
      if (updated) {
        hasUpdates = true;
      }
    }
    
    console.log('所有文件处理完成');
    
    // 如果有文件更新，退出码为1，否则为0
    if (hasUpdates) {
      console.log('检测到文件更新');
      process.exit(1);
    } else {
      console.log('没有文件需要更新');
      process.exit(0);
    }
  } catch (error) {
    console.error('处理过程中出错:', error.message);
    process.exit(127);
  }
}

main();