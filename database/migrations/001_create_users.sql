-- ============================================================
-- Migration 001: Tạo bảng users
-- Jobillee Vietnam Database
-- ============================================================

CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `email`      VARCHAR(255)    NOT NULL,
  `password`   VARCHAR(255)    NOT NULL COMMENT 'Bcrypt hash',
  `name`       VARCHAR(150)    NOT NULL,
  `phone`      VARCHAR(20)     DEFAULT NULL,
  `role`       ENUM('customer','staff','admin') NOT NULL DEFAULT 'customer',
  `avatar_url` VARCHAR(500)    DEFAULT NULL,
  `is_active`  TINYINT(1)      NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`),
  KEY `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
