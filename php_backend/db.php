<?php
/**
 * Delicious Meats - PDO Database Connection for InfinityFree
 * Configured automatically with user's MySQL parameters
 */

define('DB_HOST', getenv('DB_HOST') ?: 'sql102.infinityfree.com');
define('DB_USER', getenv('DB_USER') ?: 'if0_42676080');
define('DB_PASS', getenv('DB_PASS') ?: 'ApMcn2Kr8S');
define('DB_NAME', getenv('DB_NAME') ?: 'if0_42676080_orders_db');

function getDBConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Database Connection Failed: " . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
}
