FROM golang:1.19

# 设置工作目录
WORKDIR /code

# 将文件复制到容器的/code目录下
COPY .  ./

# 设置golang的环境变量
ENV GO111MODULE=on
ENV GOPROXY=https://goproxy.cn,direct

# 配置镜像源 及下载依赖包
RUN go mod download  \
    && go install github.com/cosmtrek/air@latest

# 开放端口
EXPOSE 8000
# CMD [ "air" ]