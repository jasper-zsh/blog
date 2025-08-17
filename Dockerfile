# 使用Debian slim作为基础镜像
FROM debian:stable-slim

# 避免交互式安装
ENV DEBIAN_FRONTEND=noninteractive

# 设置工作目录
WORKDIR /app

# 安装基础依赖
RUN apt-get update && apt-get install -y \
    curl \
    git \
    bash \
    tar \
    xz-utils \
    && rm -rf /var/lib/apt/lists/*

# 设置版本环境变量（来自build.sh）
ENV DART_SASS_VERSION=1.90.0
ENV GO_VERSION=1.24.5
ENV HUGO_VERSION=0.148.2
ENV NODE_VERSION=22.18.0

# 安装Dart Sass
RUN curl -sL -o dart-sass.tar.gz "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz" && \
    tar -C /usr/local -xf dart-sass.tar.gz && \
    rm dart-sass.tar.gz && \
    ln -s /usr/local/dart-sass/sass /usr/local/bin/sass

# 安装Go
RUN curl -sL -o go.tar.gz "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" && \
    tar -C /usr/local -xf go.tar.gz && \
    rm go.tar.gz && \
    ln -s /usr/local/go/bin/go /usr/local/bin/go

# 安装Hugo
RUN curl -sL -o hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" && \
    mkdir -p /usr/local/hugo && \
    tar -C /usr/local/hugo -xf hugo.tar.gz && \
    rm hugo.tar.gz && \
    ln -s /usr/local/hugo/hugo /usr/local/bin/hugo

# 安装Node.js
RUN curl -sL -o node.tar.xz "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" && \
    tar -C /usr/local -xf node.tar.xz && \
    rm node.tar.xz && \
    ln -s /usr/local/node-v${NODE_VERSION}-linux-x64/bin/node /usr/local/bin/node && \
    ln -s /usr/local/node-v${NODE_VERSION}-linux-x64/bin/npm /usr/local/bin/npm && \
    ln -s /usr/local/node-v${NODE_VERSION}-linux-x64/bin/npx /usr/local/bin/npx

RUN npm install -g wrangler