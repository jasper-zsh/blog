# 使用Alpine作为基础镜像
FROM alpine:3.18

# 设置工作目录
WORKDIR /app

# 安装基础依赖
RUN apk add --no-cache \
    curl \
    git \
    bash \
    tar \
    xz

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

# 验证安装
RUN echo "Dart Sass: $(sass --version)" && \
    echo "Go: $(go version)" && \
    echo "Hugo: $(hugo version)" && \
    echo "Node.js: $(node --version)" && \
    echo "npm: $(npm --version)" && \
    echo "npx: $(npx --version)"

# 将项目文件复制到工作目录
COPY . .

# 安装Node.js依赖
RUN npm ci --only=production

# 设置时区
ENV TZ=Asia/Chongqing
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

# 配置Git
RUN git config --global core.quotepath false

# 暴露Hugo默认端口
EXPOSE 1313

# 构建网站的命令
RUN chmod +x ./build.sh

# 构建网站
RUN ./build.sh

# 启动Hugo服务器的命令
CMD ["hugo", "server", "--bind", "0.0.0.0", "-p", "1313", "--baseURL", "http://localhost:1313", "--appendPort=true", "--liveReloadPort=1313"]