# 初始化MySQL数据库

## 创建数据库
```sql
CREATE DATABASE `miit_data` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
```

## 用户表(users)

```sql
-- 删除已存在的表(也可以不删)
DROP TABLE IF EXISTS `users`;
-- 创建表
CREATE TABLE `users` (
  `id` smallint NOT NULL,
  `username` char(32) NOT NULL,
  `password` char(32) NOT NULL,
  `nickname` char(32) NOT NULL,
  `avatar` varchar(50) NULL,
  `phone` char(20) NULL,
  `email` char(30) NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
);
-- 填充mock数据
-- username: iovitz
-- password: iovitz
INSERT INTO `users` (`username`, `password`, `nickname`) VALUES ('iovitz', '3f73eca5db00d2fecd228ea5f3b7bf99', 'iovitz');
```

## 一级图书分类表(book_categora_1)

```sql
-- 删除已存在的表(也可以不删)
DROP TABLE IF EXISTS `fields`;
-- 创建表
CREATE TABLE `fields`  (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `sort_id` smallint NOT NULL DEFAULT 50,
  PRIMARY KEY (`id`)
);

INSERT INTO `fields` (`name`, `sort_id`) VALUES ('二次元', 1);
INSERT INTO `fields` (`name`) VALUES ('插画');
INSERT INTO `fields` (`name`) VALUES ('音乐');
INSERT INTO `fields` (`name`) VALUES ('饭圈');
INSERT INTO `fields` (`name`) VALUES ('美食');
```