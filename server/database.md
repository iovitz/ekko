# 数据库设计

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

## 验证码表

用来接受用户的验证码
```sql
-- 删除已存在的表(也可以不删)
DROP TABLE IF EXISTS `varify_code`;
CREATE TABLE `touch_app`  (
  `number` char(11) NOT NULL,
  `code` char(4) NOT NULL,
  `create_time` char(13) NOT NULL,
  PRIMARY KEY (`number`)
);
INSERT INTO `varify_code` (`number`, `code`) VALUES ('19233', '123');


DROP PROCEDURE IF EXISTS `ClearExpiredCodeItem`;
CREATE PROCEDURE `ClearExpiredCodeItem`()
BEGIN
	DELETE FROM varify_code WHERE create_time < DATA_ADD(now(), INTERVAL - 5 MINUTE)
END


DROP PROCEDURE IF EXISTS `clear_expired_code_item`;
CREATE EVENT `clear_expired_code_item` ON SCHEDULE 
EVERY 1 SECOND DO
CALL ClearExpiredCodeItem();
```