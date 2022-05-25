## 记一次docker的使用
## 写在前头
- 其实本地项目打包镜像再上传这个过程也就那么回事，整理一下，给自己捋一捋
- 为了在一个服务器上最大限度地利用好资源，可以把一个项目不同的服务包括前端各个组件的服务，后端服务，数据库服务等用单独的容器包装起来并运行，互不干扰，就好像用虚拟机一样隔离开不同的项目，这样就可以在一台服务器上部署多个应用，[docker官方文档](https://docs.docker.com/)，不用命令行操作还有可视化的桌面软件[Docker](https://docs.docker.com/desktop/windows/install/)
## 重要概念
#### 镜像(images)
- 当本地项目运行调试没有问题之后，build打包后，再把这些需要的环境资源打包成镜像，可以类比为虚拟机镜像，镜像是创建容器的基础
#### 容器(container)
- 在镜像的基础上创建的应用运行实例，就可以类比为虚拟机，一个单独的可以运行的环境
#### 镜像仓库(repository)
- 用来统一管理镜像的一个仓库
## 常用的docker命令
```shell
docker help       //自助命令查看
docker images     //查看所有本地镜像
docker pull       //镜像拉取 默认是使用:latest标签，没有的话会报错，可指定标签
docker tag        //给本地的镜像进行标签操作
docker push       //把本地镜像上传到仓库，会包含仓库地址，镜像保存路径，及版本号即标签
docker login registory //登录仓库
docker build      //镜像打包，是基于Dockerfile文件的，这个命令后面要加一个`.` 不加会报错的，根据报错也可以知道
```
- Dockerfile文件是一个相当于进行镜像打包的脚本文件，包含下面命令 :point_down:
```shell
# 镜像来源 FROM
FROM <image> or <image>:<tag>

# 维护者 MAINTAINER
MAINTAINER <username>

# 运行指令 RUN
# 三种终端
# 1. 默认 shell ，即 /bin/sh -c
# 2. exec
# 3. 其他终端
#
# ps:
# 每条 RUN 指令在当前镜像中执行命令，并提交新的镜像
# 命令过长，使用/换行
RUN <command>
# or
RUN ['executable', 'param1', 'param2'] # 使用 exec 执行，或者使用其他终端

# CMD
# 每个 dockerfile 只能有一个 CMD 命令，如果指定了多条，则会最有一条命令
# 如果用户启动容器时制定了运行的命令（RUN），则会覆盖 CMD 指定的命令
CMD ['executable', 'param1', 'param2'] # 使用 exec 执行，官方推荐方式
CMD command param1 param2 # /bin/sh 执行，当需要交互时使用
CMD ['param1', 'param2'] # 提供给 ENTRYPOINT 的默认参数

# EXPOSE
# EXPOSE 22 80 8443
# 暴露端口供互联系统使用
# 容器运行时，-P 自动分配一个端口到指定端口；-p 可以具体指定本地端口
# docker run -d -p 80:80 docker/getting-started
# 指定本地的 80 端口，映射到容器的 80 端口
EXPOSE <port> [<port> ...]

# ENV
# 指定环境变量，在 RUN 中使用，并在容器运行中保持
ENV <key> <value>

# ADD
# 复制指定的 src 到容器中的 dest
# 其中 src 可以是 dockerfile 所在目录的相对路径中的文件或目录，也可以是一个 URL，或者一个 tar 文件（会自动解压成一个目录）
ADD <src> <dest>

# COPY
# 与 ADD 功能一致，区别有二：
# 1. 当目标路径不存在时，会自动创建
# 2. 当使用本地目录为源目录时，更推荐使用 COPY
COPY <src> <dest>

# ENTRYPOINT
# 配置容器启动后执行的命令，并且不可被 docker run 提供的参数覆盖
# 每个 dockerfile 中只能有一个 ENTRYPOINT ,当存在多个时，以最后一个为准
ENTRYPOINT ['executable', 'param1', 'param2']
EXTRYPOINT command param1 param2 # shell 中执行

# VOLUME
# 创建一个可以从本地主机或其他容器挂在的挂载点，一般用于存放数据路或需要保持的数据等

VOLUME ["/data"]

# USER
# 指定运行容器时的用户名或 UID，在后续的 RUN 中也会使用指定用户
# 当服务不需要管理员权限时，可以通过 USER 命令指定运行用户
# 使用 RUN 创建所需要的用户， 如 RUN groupadd -r postgres && useradd -r -g postgres postgres, 创建用户组 postgres，同时创建用户postgres，并加入该用户组
# 临时获取管理员权限，使用gosu，而不是sudo

USER deamon

# WORKDIR   
# 为 RUN、CMD、ENTRYPOINT 配置工作目录
# 如果参数是相对路径，则基于之前命令的指令的路径

WORKDIR /a
WORKDIR b
# 最终工作目录为 /a/b

# ONBUILD
# 配置当目前镜像作为其他新创建镜像的基础镜像时，所执行的指令
# image-a
 ONBUILD ADD . /app/src
 ONBUILD RUN /usr/local/bin/python-build --dir /app/src
 
 # 当镜像 image-a 作为基础镜像时，会自动执行 ONBUILD 指令
 FROM image-a
 
 ADD . /app/src
 RUN /usr/loca/bin/python-build --dir /app/src
 ```
 ## Docker-compose
 - docker-compose就是为了方便管理多个容器而存在的，你可以使用一句命令进行容器的启动和关闭，还有所有组件的镜像打包，该工具需要依赖`docker-compose.yaml`文件，该文件配置大概如下:point_down:
 ```yaml
 version: '3.7'    # 指定compose文件的版本
services:          # 定义所有的 service 信息, services 下面的第一级别的 key 既是一个 service 的名称
  aaa:             # 服务名称
    container_name: frontend-aaa    # 容器名称
    build:                          # 指定包含构建上下文的路径, 或作为一个对象，该对象具有 context 和指定的 dockerfile 文件以及 args 参数值
      context: ./aaa                # context: 指定 Dockerfile 文件所在的路径
      dockerfile: docker/Dockerfile  # dockerfile: 指定 context 指定的目录下面的 Dockerfile 的名称(默认为 Dockerfile)
    ports:                          # 建立宿主机和容器之间的端口映射关系
      - 9000:9000                   # 容器9000端口和宿主机9000建立映射关系
  bbb:
    container_name: frontend-bbb
    build:
      context: ./bbb
      dockerfile: docker/Dockerfile
    ports:
      - 80:9000
 ```
## Docker-compose命令
```shell
docker-compose help  # 自助命令查看
docker-compose build serviceName # 依赖`docker-compose.yaml`文件把指定服务打包成镜像文件
docker-compose up serviceName  # 启动指定容器
```
- 完成镜像打包的工作后就可以打上标签，并推送到镜像仓库   build-->tag-->push
## 总结一下
docker的作用相当于就是把本地没有问题的项目所需要的环境打包成镜像文件，并根据这个镜像文件创建一个运行容器，把部署的服务隔离开，起到类似虚拟机的作用，但是更加轻量