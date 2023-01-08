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
  `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` smallint UNSIGNED NOT NULL,
  `content` varchar(5000) NOT NULL DEFAULT '',
  `files` varchar(1000) NOT NULL DEFAULT '[]',
  `like` smallint UNSIGNED NOT NULL DEFAULT 0,
  `commentCount` smallint UNSIGNED NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `touch_app`.`users` (`id`)
);
```