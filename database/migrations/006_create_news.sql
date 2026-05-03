-- ============================================================
-- Migration 006: Tạo bảng news
-- Jobillee Vietnam Database
-- ============================================================

CREATE TABLE IF NOT EXISTS `news` (
  `id`           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`        VARCHAR(500) NOT NULL,
  `slug`         VARCHAR(500) NOT NULL,
  `content`      LONGTEXT     DEFAULT NULL,
  `thumbnail`    VARCHAR(500) DEFAULT NULL,
  `author_id`    INT UNSIGNED DEFAULT NULL,
  `status`       ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  `published_at` TIMESTAMP    DEFAULT NULL,
  `created_at`   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_news_slug` (`slug`(255)),
  KEY `idx_news_status` (`status`),
  CONSTRAINT `fk_news_author`
    FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
