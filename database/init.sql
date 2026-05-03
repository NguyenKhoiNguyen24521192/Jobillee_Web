-- ============================================================
-- Jobillee Vietnam - Database Initialization Script
-- MySQL 5.7+
-- Chạy: mysql -u root -p < database/init.sql
-- ============================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';

-- Tạo database
CREATE DATABASE IF NOT EXISTS `jobillee_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `jobillee_db`;

-- Tắt kiểm tra khóa ngoại tạm thời khi chạy lần đầu
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- BẢNG: users
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

-- ============================================================
-- BẢNG: categories
-- ============================================================
CREATE TABLE IF NOT EXISTS `categories` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(100) NOT NULL,
  `description` TEXT         DEFAULT NULL,
  `sort_order`  INT          NOT NULL DEFAULT 0,
  `is_active`   TINYINT(1)   NOT NULL DEFAULT 1,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_categories_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BẢNG: products
-- ============================================================
CREATE TABLE IF NOT EXISTS `products` (
  `id`          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `sku`         VARCHAR(50)     NOT NULL,
  `name`        VARCHAR(255)    NOT NULL,
  `description` TEXT            DEFAULT NULL,
  `price`       DECIMAL(12, 0)  NOT NULL DEFAULT 0 COMMENT 'Giá VNĐ',
  `category_id` INT UNSIGNED    NOT NULL,
  `image_url`   VARCHAR(500)    DEFAULT NULL,
  `stock`       INT             NOT NULL DEFAULT 0,
  `is_active`   TINYINT(1)      NOT NULL DEFAULT 1,
  `created_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_products_sku` (`sku`),
  KEY `idx_products_category` (`category_id`),
  CONSTRAINT `fk_products_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BẢNG: orders
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

-- ============================================================
-- BẢNG: order_items
-- ============================================================
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

-- ============================================================
-- BẢNG: promotions
-- ============================================================
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

-- ============================================================
-- BẢNG: stores
-- ============================================================
CREATE TABLE IF NOT EXISTS `stores` (
  `id`        INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`      VARCHAR(150) NOT NULL,
  `address`   VARCHAR(500) NOT NULL,
  `phone`     VARCHAR(20)  DEFAULT NULL,
  `latitude`  DECIMAL(10, 8) DEFAULT NULL,
  `longitude` DECIMAL(11, 8) DEFAULT NULL,
  `is_active` TINYINT(1)   NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BẢNG: store_hours
-- ============================================================
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

-- ============================================================
-- BẢNG: reviews
-- ============================================================
CREATE TABLE IF NOT EXISTS `reviews` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `user_id`    INT UNSIGNED NOT NULL,
  `rating`     TINYINT      NOT NULL DEFAULT 5 COMMENT '1-5 sao',
  `comment`    TEXT         DEFAULT NULL,
  `is_visible` TINYINT(1)   NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_reviews_product` (`product_id`),
  KEY `idx_reviews_user` (`user_id`),
  CONSTRAINT `fk_reviews_product`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BẢNG: favorites
-- ============================================================
CREATE TABLE IF NOT EXISTS `favorites` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id`    INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_favorites` (`user_id`, `product_id`),
  CONSTRAINT `fk_favorites_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_favorites_product`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BẢNG: payment_history
-- ============================================================
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

-- ============================================================
-- BẢNG: news
-- ============================================================
CREATE TABLE IF NOT EXISTS `news` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`      VARCHAR(500) NOT NULL,
  `slug`       VARCHAR(500) NOT NULL,
  `content`    LONGTEXT     DEFAULT NULL,
  `thumbnail`  VARCHAR(500) DEFAULT NULL,
  `author_id`  INT UNSIGNED DEFAULT NULL,
  `status`     ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  `published_at` TIMESTAMP  DEFAULT NULL,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_news_slug` (`slug`(255)),
  KEY `idx_news_status` (`status`),
  CONSTRAINT `fk_news_author`
    FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DỮ LIỆU MẪU
-- ============================================================

-- Users (password hash cho 'password123')
INSERT INTO `users` (`email`, `password`, `name`, `phone`, `role`) VALUES
('admin@jobillee.vn',  '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36ZBPTOWJbWVUVFBMPDSkzm', 'Admin Jobillee', '0901000001', 'admin'),
('staff@jobillee.vn',  '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36ZBPTOWJbWVUVFBMPDSkzm', 'Nhân viên A',    '0901000002', 'staff'),
('user1@example.com',  '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36ZBPTOWJbWVUVFBMPDSkzm', 'Nguyễn Văn A',   '0901000003', 'customer'),
('user2@example.com',  '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36ZBPTOWJbWVUVFBMPDSkzm', 'Trần Thị B',     '0901000004', 'customer');

-- Categories
INSERT INTO `categories` (`name`, `description`, `sort_order`) VALUES
('Gà Rán',       'Các món gà rán giòn tan đặc trưng của Jobillee', 1),
('Burger',        'Burger bò và gà thơm ngon',                      2),
('Mỳ Ý',          'Pasta và mỳ Ý đặc biệt',                          3),
('Món Phụ',       'Khoai tây chiên, salad và các món ăn kèm',        4),
('Tráng Miệng',   'Kem, bánh ngọt và dessert',                       5),
('Đồ Uống',       'Nước ngọt, nước ép và trà sữa',                   6);

-- Products
INSERT INTO `products` (`sku`, `name`, `description`, `price`, `category_id`, `image_url`, `stock`) VALUES
('GA-001', 'Gà Giòn Vui Vẻ (2 miếng)',    'Gà rán giòn tan với công thức độc quyền',            45000,  1, NULL, 100),
('GA-002', 'Gà Giòn Vui Vẻ (4 miếng)',    'Phần lớn hơn, ngon hơn cho cả gia đình',             85000,  1, NULL, 100),
('GA-003', 'Đùi Gà Nướng Cay',            'Đùi gà nướng với sốt cay đặc biệt',                  55000,  1, NULL, 80),
('BU-001', 'Burger Bò Phô Mai',           'Burger bò tươi với phô mai Cheddar và rau tươi',     65000,  2, NULL, 60),
('BU-002', 'Burger Gà Giòn',              'Gà rán giòn kẹp giữa bánh mềm thơm',                 55000,  2, NULL, 60),
('MY-001', 'Mỳ Ý Sốt Bò Bằm',           'Mỳ Ý sốt thịt bò bằm đậm đà hương vị Ý',            70000,  3, NULL, 50),
('MY-002', 'Mỳ Ý Carbonara',              'Mỳ Ý sốt kem trứng và thịt xông khói',               75000,  3, NULL, 50),
('PH-001', 'Khoai Tây Chiên Vừa',         'Khoai tây chiên giòn, vàng ươm',                      25000,  4, NULL, 200),
('PH-002', 'Salad Rau Củ Tươi',           'Salad hỗn hợp rau củ với sốt mè rang',               30000,  4, NULL, 100),
('TD-001', 'Kem Vani Cốc',                'Kem vani mịn màng, ngọt dịu',                         20000,  5, NULL, 150),
('TD-002', 'Bánh Sô Cô La',               'Bánh chocolate ẩm mềm phủ sốt chocolate đen',        35000,  5, NULL, 80),
('DU-001', 'Coca-Cola Lon',               'Nước ngọt Coca-Cola lon 330ml lạnh sảng khoái',       15000,  6, NULL, 300),
('DU-002', 'Trà Sữa Trân Châu',           'Trà sữa thơm ngon với trân châu dai mềm',             35000,  6, NULL, 200);

-- Stores
INSERT INTO `stores` (`name`, `address`, `phone`, `latitude`, `longitude`) VALUES
('Jobillee Quận 1',   '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',   '028 1234 5678', 10.77378800, 106.70268500),
('Jobillee Quận 3',   '456 Võ Văn Tần, Phường 5, Quận 3, TP.HCM',           '028 2345 6789', 10.77697700, 106.68687200),
('Jobillee Bình Thạnh','789 Xô Viết Nghệ Tĩnh, P.26, Bình Thạnh, TP.HCM',  '028 3456 7890', 10.81248300, 106.71310700),
('Jobillee Hà Nội',   '321 Kim Mã, Phường Kim Mã, Ba Đình, Hà Nội',         '024 4567 8901', 21.02962100, 105.82270800);

-- Store hours (mỗi cửa hàng 7 ngày)
INSERT INTO `store_hours` (`store_id`, `day_of_week`, `opening_time`, `closing_time`) VALUES
(1,0,'08:00:00','22:00:00'),(1,1,'08:00:00','22:00:00'),(1,2,'08:00:00','22:00:00'),
(1,3,'08:00:00','22:00:00'),(1,4,'08:00:00','22:00:00'),(1,5,'08:00:00','23:00:00'),
(1,6,'08:00:00','23:00:00'),
(2,0,'08:00:00','22:00:00'),(2,1,'08:00:00','22:00:00'),(2,2,'08:00:00','22:00:00'),
(2,3,'08:00:00','22:00:00'),(2,4,'08:00:00','22:00:00'),(2,5,'08:00:00','23:00:00'),
(2,6,'08:00:00','23:00:00'),
(3,0,'08:00:00','22:00:00'),(3,1,'08:00:00','22:00:00'),(3,2,'08:00:00','22:00:00'),
(3,3,'08:00:00','22:00:00'),(3,4,'08:00:00','22:00:00'),(3,5,'08:00:00','23:00:00'),
(3,6,'08:00:00','23:00:00'),
(4,0,'08:00:00','22:00:00'),(4,1,'08:00:00','22:00:00'),(4,2,'08:00:00','22:00:00'),
(4,3,'08:00:00','22:00:00'),(4,4,'08:00:00','22:00:00'),(4,5,'08:00:00','23:00:00'),
(4,6,'08:00:00','23:00:00');

-- Promotions
INSERT INTO `promotions` (`code`, `description`, `discount_type`, `discount_value`, `min_order`, `max_discount`, `start_date`, `end_date`) VALUES
('WELCOME10', 'Giảm 10% cho đơn hàng đầu tiên',       'percent', 10.00, 100000, 50000,  '2024-01-01', '2026-12-31'),
('FREESHIP',  'Miễn phí giao hàng cho đơn từ 150k',    'fixed',   30000, 150000, NULL,   '2024-01-01', '2026-12-31'),
('SUMMER25',  'Giảm 25% nhân dịp hè (tối đa 100k)',    'percent', 25.00, 200000, 100000, '2025-06-01', '2025-08-31'),
('VIP50K',    'Giảm cố định 50.000đ cho thành viên VIP','fixed',  50000, 300000, NULL,   '2024-01-01', '2026-12-31');

-- Sample orders
INSERT INTO `orders` (`order_number`, `user_id`, `total_price`, `status`, `payment_method`, `payment_status`, `address`) VALUES
('JB-2024-0001', 3, 120000, 'completed', 'momo',  'paid',   '100 Lê Lợi, Quận 1, TP.HCM'),
('JB-2024-0002', 4, 165000, 'completed', 'cash',  'paid',   '200 Hai Bà Trưng, Quận 3, TP.HCM'),
('JB-2024-0003', 3,  85000, 'delivering','vnpay', 'paid',   '100 Lê Lợi, Quận 1, TP.HCM'),
('JB-2024-0004', 4,  55000, 'pending',   'cash',  'unpaid', '200 Hai Bà Trưng, Quận 3, TP.HCM');

-- Order items
INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 2, 45000), (1, 8, 1, 25000),
(2, 4, 1, 65000), (2, 8, 2, 25000), (2, 12, 2, 15000),
(3, 2, 1, 85000),
(4, 5, 1, 55000);

-- Reviews
INSERT INTO `reviews` (`product_id`, `user_id`, `rating`, `comment`) VALUES
(1, 3, 5, 'Gà rán giòn tan, thơm ngon, rất ưng!'),
(1, 4, 4, 'Ngon nhưng hơi mặn một chút'),
(4, 3, 5, 'Burger bò phô mai cực kỳ đỉnh, sẽ quay lại'),
(8, 4, 5, 'Khoai tây chiên vàng đều, giòn lâu');

-- Favorites
INSERT INTO `favorites` (`user_id`, `product_id`) VALUES
(3, 1), (3, 4), (3, 6),
(4, 2), (4, 5);

-- News
INSERT INTO `news` (`title`, `slug`, `content`, `author_id`, `status`, `published_at`) VALUES
('Jobillee khai trương chi nhánh thứ 4 tại Hà Nội',
 'jobillee-khai-truong-chi-nhanh-thu-4-tai-ha-noi',
 'Chúng tôi vui mừng thông báo khai trương chi nhánh mới tại 321 Kim Mã, Hà Nội. Đây là bước mở rộng quan trọng của Jobillee ra thị trường miền Bắc.',
 1, 'published', '2024-09-01 08:00:00'),
('Món mới: Mỳ Ý Carbonara đã chính thức có mặt',
 'mon-moi-my-y-carbonara-da-chinh-thuc-co-mat',
 'Jobillee tự hào giới thiệu món Mỳ Ý Carbonara với sốt kem trứng và thịt xông khói nhập khẩu. Ghé thử ngay hôm nay!',
 1, 'published', '2024-10-15 08:00:00');

-- ============================================================
-- VIEWS BÁO CÁO
-- ============================================================

CREATE OR REPLACE VIEW `v_sales_by_category` AS
SELECT
  c.id          AS category_id,
  c.name        AS category_name,
  COUNT(DISTINCT o.id)   AS total_orders,
  SUM(oi.quantity)       AS total_items_sold,
  SUM(oi.quantity * oi.price) AS total_revenue
FROM `categories` c
JOIN `products`   p  ON p.category_id = c.id
JOIN `order_items` oi ON oi.product_id = p.id
JOIN `orders`     o  ON o.id = oi.order_id AND o.status = 'completed'
GROUP BY c.id, c.name;

CREATE OR REPLACE VIEW `v_top_products` AS
SELECT
  p.id         AS product_id,
  p.sku,
  p.name       AS product_name,
  c.name       AS category_name,
  SUM(oi.quantity)            AS total_sold,
  SUM(oi.quantity * oi.price) AS total_revenue,
  ROUND(AVG(r.rating), 1)     AS avg_rating,
  COUNT(DISTINCT r.id)        AS review_count
FROM `products`   p
JOIN `categories` c  ON c.id = p.category_id
LEFT JOIN `order_items` oi ON oi.product_id = p.id
LEFT JOIN `orders`      o  ON o.id = oi.order_id AND o.status = 'completed'
LEFT JOIN `reviews`     r  ON r.product_id = p.id AND r.is_visible = 1
GROUP BY p.id, p.sku, p.name, c.name
ORDER BY total_sold DESC;

-- Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;

-- Xác minh
SELECT 'Database jobillee_db đã được tạo thành công!' AS message;
SHOW TABLES;
