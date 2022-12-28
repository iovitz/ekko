# Touch项目使用文档

## 1 项目启动

### 1.1 拉取项目

你需要从Github上拉取这份代码，并进入目录

```shell
# 拉取代码
git clone https://github.com/iovitz/touch-app

# 进入目录
cd touch-app
```

### 1.2 安装依赖

要求使用pnpm作为包管理工具，不推荐使用npm或者yarn，没有pnpm先安装

```shell
# 全局安装pnpm
npm i pnpm -g
```

安装完pnpm之后，使用pnpm安装依赖

```shell
pnpm i
```

### 1.4 项目运行

配置完前面的内容可以开始运行项目了，值得一提的是项目代码中已经填好了数据库的账号和密码，所以你无需配置额外的内容，这是我申请的免费的数据库，用于开发使用，你也可以在[SQLHub](http://sqlpub.com/)也申请一个自己的免费数据库，如何让项目指向自己的数据库后一小节介绍

客户端开发
```shell
pnpm run dev:app
```

服务端开发

```shell
pnpm run dev:server
```

同时启动客户端和服务端开发

```shell
pnpm run dev
```

### 1.5 接入自己的数据库

如果你想让项目在自己的环境里跑起来，你需要有自己的数据库，本地数据库或者云数据库都可以，然后参考[Touch数据库设计和创建](./server/database.md)创建自己的数据库

拥有了自己的数据库之后，需要修改文件内容配置项目运行时的环境，这三个文件都在项目的服务端目录下：

```shell
cd server
```

然后你会发现三个文件：

* .env (通用配置)
* .env.production (生产配置)
* .env.development (开发环境)

你可以修改文件中的值修改成自己所期望的，以及修改一些项目的运行设定

> 如果你熟悉dotenv的使用，想删除一些重复的字段内容也无所谓，但是一定要确保字段名以及文件名正确

## 参与开发

联系我咯
