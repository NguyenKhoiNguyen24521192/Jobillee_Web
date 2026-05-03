-- ============================================================
-- Migration 003: Tạo bảng orders, order_items, promotions, payment_history
-- Jobillee Vietnam Database
-- ============================================================

CREATE TABLE IF NOT EXISTS `orders` (
  `id`             INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `order_number`   VARCHAR(50)    NOT NULL,
  `user_id`        INT UNSIGNED   NOT NULL,
  `total_price`    DECIMAL(14, 0) NOT NULL DEFAULT 0,
  `status`         ENUM('pending','confirmed','preparing','delivering','completed','cancelled')
                                  NOT NULL DEFAULT 'pending',
  `payment_method` ENUM('cash','momo','vnpay','bank_transfer') NOT NULL DEFAULT 'cash',
  `payment_status` ENUM('unpaid','paid','refunded') NOT NULL DEFAULT 'unpaid',
  `address`        TEXT           DEFAULT NULL,
  `note`           TEXT           DEFAULT NULL,
  `created_at`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_orders_number` (`order_number`),
  KEY `idx_orders_user` (`user_id`),
  KEY `idx_orders_status` (`status`),
  CONSTRAINT `fk_orders_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `order_items` (
  `id`         INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `order_id`   INT UNSIGNED   NOT NULL,
  `product_id` INT UNSIGNED   NOT NULL,
  `quantity`   INT            NOT NULL DEFAULT 1,
  `price`      DECIMAL(12, 0) NOT NULL DEFAULT 0 COMMENT 'Giá tại thời điểm đặt',
  `created_at` TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_items_order` (`order_id`),
  KEY `idx_order_items_product` (`product_id`),
  CONSTRAINT `fk_order_items_order`
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_items_product`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `promotions` (
  `id`             INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `code`           VARCHAR(50)    NOT NULL,
  `description`    VARCHAR(255)   DEFAULT NULL,
  `discount_type`  ENUM('percent','fixed') NOT NULL DEFAULT 'percent',
  `discount_value` DECIMAL(10, 2) NOT NULL DEFAULT 0,
  `min_order`      DECIMAL(12, 0) NOT NULL DEFAULT 0,
  `max_discount`   DECIMAL(12, 0) DEFAULT NULL,
  `usage_limit`    INT            DEFAULT NULL,
  `used_count`     INT            NOT NULL DEFAULT 0,
  `start_date`     DATE           NOT NULL,
  `end_date`       DATE           NOT NULL,
  `is_active`      TINYINT(1)     NOT NULL DEFAULT 1,
  `created_at`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_promotions_code` (`code`),
  KEY `idx_promotions_dates` (`start_date`, `end_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `payment_history` (
  `id`             INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `order_id`       INT UNSIGNED   NOT NULL,
  `amount`         DECIMAL(14, 0) NOT NULL,
  `transaction_id` VARCHAR(100)   DEFAULT NULL,
  `gateway`        VARCHAR(50)    DEFAULT NULL COMMENT 'momo, vnpay, cash ...',
  `status`         ENUM('pending','success','failed','refunded') NOT NULL DEFAULT 'pending',
  `raw_response`   JSON           DEFAULT NULL,
  `created_at`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_payment_order` (`order_id`),
  CONSTRAINT `fk_payment_order`
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
