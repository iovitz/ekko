# Touch项目使用文档

## 1 项目启动

### 1.1 拉取项目

你需要从Github上拉取这份代码

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

### 1.3 创建数据库

项目使用**MySQL**作为数据库，如果你想让项目在自己的环境里跑起来，你需要有自己的数据库，本地数据库或者云数据库都可以，然后参考[Touch数据库设计和创建](./server/database.md)创建自己的数据库

### 1.4 设置运行环境

配置一下服务端的环境变量，文件主要有三个，具体使用可以npm上搜索**dotenv**

### 1.4 项目运行

## 参与开发

