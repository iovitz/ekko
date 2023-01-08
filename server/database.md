# 数据库设计

## 创建数据库
```sql
CREATE DATABASE `miit_data` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
```

## 用户表(users)

```sql
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `phone` char(11) NOT NULL,
  `nickname` char(32) NOT NULL,
  `sex` tinyint(1) UNSIGNED NULL DEFAULT NULL,
  `avatar` char(50) NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
);
```

## 验证码表

```sql
DROP TABLE IF EXISTS `varify_code`;
CREATE TABLE `varify_code`  (
  `phone` char(11) NOT NULL,
  `code` char(32) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`phone`)
);
```

## 文章表

```sql
DROP TABLE IF EXISTS `varify_code`;
CREATE TABLE `varify_code`  (
  `phone` char(11) NOT NULL,
  `code` char(32) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`phone`)
);
```

## 文章表
```sql
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` varchar(1023) NOT NULL,
  `files` varchar(1023) NOT NULL,
  `view` smallint UNSIGNED NOT NULL DEFAULT 0,
  `like` smallint UNSIGNED NOT NULL DEFAULT 0,
  `comment` smallint UNSIGNED NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);
```