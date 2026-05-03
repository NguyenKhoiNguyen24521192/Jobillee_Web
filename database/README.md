# Database Setup

## Requirements

- MySQL 8.0+

## Initialize the database

The script creates the `jobillee` database automatically. Simply run:

```bash
mysql -u <user> -p < database/init.sql
```

If the database already exists (or you want to use a different name), edit the
`CREATE DATABASE` / `USE` lines at the top of `init.sql`, then run:

```bash
mysql -u <user> -p jobillee < database/init.sql
```

## Schema overview

| Table         | Description                              |
|---------------|------------------------------------------|
| `users`       | Customer and admin accounts              |
| `products`    | Menu items (chicken, pasta, burger, …)   |
| `stores`      | Restaurant locations                     |
| `orders`      | Customer orders                          |
| `order_items` | Individual line items within each order  |
| `reviews`     | Customer ratings and comments for stores |
| `news`        | News articles and announcements          |

All tables use the `utf8mb4` character set and `InnoDB` storage engine.
