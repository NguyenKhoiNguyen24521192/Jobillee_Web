-- ============================================================
-- Migration 004: Tạo bảng stores và store_hours
-- Jobillee Vietnam Database
-- ============================================================

CREATE TABLE IF NOT EXISTS `stores` (
  `id`         INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(150)   NOT NULL,
  `address`    VARCHAR(500)   NOT NULL,
  `phone`      VARCHAR(20)    DEFAULT NULL,
  `latitude`   DECIMAL(10, 8) DEFAULT NULL,
  `longitude`  DECIMAL(11, 8) DEFAULT NULL,
  `is_active`  TINYINT(1)     NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `store_hours` (
  `id`           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `store_id`     INT UNSIGNED NOT NULL,
  `day_of_week`  TINYINT      NOT NULL COMMENT '0=Chủ nhật, 1=Thứ 2 ... 6=Thứ 7',
  `opening_time` TIME         NOT NULL DEFAULT '08:00:00',
  `closing_time` TIME         NOT NULL DEFAULT '22:00:00',
  `is_closed`    TINYINT(1)   NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_store_hours` (`store_id`, `day_of_week`),
  CONSTRAINT `fk_store_hours_store`
    FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
