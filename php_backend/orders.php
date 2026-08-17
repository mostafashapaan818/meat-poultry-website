<?php
/**
 * Delicious Meats - Unified Orders API Endpoint
 * Handles GET (fetch all orders), POST (create order), PUT (update order status)
 * Supports CORS headers for Next.js and external clients.
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/db.php';

$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

try {
    // ------------------------------------------------------------------
    // GET: Fetch all orders with items
    // ------------------------------------------------------------------
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 200");
        $orders = $stmt->fetchAll();

        $result = [];
        foreach ($orders as $o) {
            $itemStmt = $pdo->prepare("SELECT item_id as id, name_ar as nameAr, name_en as nameEn, price, quantity FROM order_items WHERE order_ref = ?");
            $itemStmt->execute([$o['order_id']]);
            $items = $itemStmt->fetchAll();

            // Format numerical values correctly
            $formattedItems = array_map(function($i) {
                return [
                    "id" => $i['id'],
                    "nameAr" => $i['nameAr'],
                    "nameEn" => $i['nameEn'],
                    "price" => (float)$i['price'],
                    "quantity" => (int)$i['quantity']
                ];
            }, $items);

            $result[] = [
                "id" => $o['order_id'],
                "customerName" => $o['customer_name'],
                "phone" => $o['phone'],
                "governorate" => $o['governorate'],
                "area" => $o['area'],
                "address" => $o['address'],
                "items" => $formattedItems,
                "totalValue" => (float)$o['total_value'],
                "status" => $o['status'],
                "createdAt" => $o['created_at']
            ];
        }

        echo json_encode(["success" => true, "orders" => $result], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // ------------------------------------------------------------------
    // POST: Create a new order with items (Atomic Transaction)
    // ------------------------------------------------------------------
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Invalid JSON payload"]);
            exit();
        }

        $orderId = !empty($input['id']) ? trim($input['id']) : 'DM-' . rand(100000, 900000);
        $customerName = !empty($input['customerName']) ? trim($input['customerName']) : 'عميل';
        $phone = !empty($input['phone']) ? trim($input['phone']) : '';
        $governorate = !empty($input['governorate']) ? trim($input['governorate']) : 'Cairo';
        $area = !empty($input['area']) ? trim($input['area']) : '';
        $address = !empty($input['address']) ? trim($input['address']) : '';
        $totalValue = isset($input['totalValue']) ? (float)$input['totalValue'] : 0.00;
        $status = !empty($input['status']) ? trim($input['status']) : 'new';
        $createdAt = !empty($input['createdAt']) ? date('Y-m-d H:i:s', strtotime($input['createdAt'])) : date('Y-m-d H:i:s');
        $items = !empty($input['items']) && is_array($input['items']) ? $input['items'] : [];

        $pdo->beginTransaction();

        // Check if order already exists
        $checkStmt = $pdo->prepare("SELECT id FROM orders WHERE order_id = ?");
        $checkStmt->execute([$orderId]);
        if ($checkStmt->fetch()) {
            // Update existing order
            $upStmt = $pdo->prepare("UPDATE orders SET customer_name = ?, phone = ?, governorate = ?, area = ?, address = ?, total_value = ?, status = ? WHERE order_id = ?");
            $upStmt->execute([$customerName, $phone, $governorate, $area, $address, $totalValue, $status, $orderId]);
            $pdo->prepare("DELETE FROM order_items WHERE order_ref = ?")->execute([$orderId]);
        } else {
            // Insert new order
            $insStmt = $pdo->prepare("INSERT INTO orders (order_id, customer_name, phone, governorate, area, address, total_value, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $insStmt->execute([$orderId, $customerName, $phone, $governorate, $area, $address, $totalValue, $status, $createdAt]);
        }

        // Insert order items
        $itemInsStmt = $pdo->prepare("INSERT INTO order_items (order_ref, item_id, name_ar, name_en, price, quantity) VALUES (?, ?, ?, ?, ?, ?)");
        foreach ($items as $item) {
            $itemId = !empty($item['id']) ? $item['id'] : 'item';
            $nameAr = !empty($item['nameAr']) ? $item['nameAr'] : (!empty($item['name']) ? $item['name'] : 'منتج');
            $nameEn = !empty($item['nameEn']) ? $item['nameEn'] : (!empty($item['name']) ? $item['name'] : 'Product');
            $price = isset($item['price']) ? (float)$item['price'] : 0.00;
            $quantity = isset($item['quantity']) ? (int)$item['quantity'] : 1;

            $itemInsStmt->execute([$orderId, $itemId, $nameAr, $nameEn, $price, $quantity]);
        }

        $pdo->commit();

        echo json_encode([
            "success" => true,
            "message" => "Order saved successfully",
            "orderId" => $orderId
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // ------------------------------------------------------------------
    // PUT: Update order status
    // ------------------------------------------------------------------
    if ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        $orderId = !empty($input['orderId']) ? trim($input['orderId']) : null;
        $status = !empty($input['status']) ? trim($input['status']) : null;

        if (!$orderId || !$status) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing orderId or status"]);
            exit();
        }

        $allowedStatuses = ['new', 'preparing', 'delivering', 'delivered', 'cancelled'];
        if (!in_array($status, $allowedStatuses)) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Invalid status value"]);
            exit();
        }

        $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE order_id = ?");
        $stmt->execute([$status, $orderId]);

        echo json_encode([
            "success" => true,
            "message" => "Order status updated successfully",
            "orderId" => $orderId,
            "status" => $status
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // Unhandled HTTP method
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);

} catch (Exception $e) {
    if ($pdo && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Server Error: " . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
