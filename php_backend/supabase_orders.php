<?php
/**
 * Delicious Meats - Supabase PHP API Backend
 * Automatic Realtime Synchronization Handler
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, apikey");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configurable Supabase credentials
define('SUPABASE_URL', getenv('SUPABASE_URL') ?: 'https://YOUR_PROJECT_ID.supabase.co');
define('SUPABASE_KEY', getenv('SUPABASE_KEY') ?: 'YOUR_SUPABASE_ANON_KEY');

function callSupabase($endpoint, $method = 'GET', $data = null) {
    $url = SUPABASE_URL . '/rest/v1/' . $endpoint;
    $ch = curl_init($url);
    
    $headers = [
        "apikey: " . SUPABASE_KEY,
        "Authorization: Bearer " . SUPABASE_KEY,
        "Content-Type: application/json",
        "Prefer: return=representation"
    ];

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if ($data !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [
        'code' => $httpCode,
        'body' => json_decode($response, true)
    ];
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $res = callSupabase('orders?select=*,order_items(*)&order=created_at.desc');
        echo json_encode(["success" => true, "orders" => $res['body'] ?? []], JSON_UNESCAPED_UNICODE);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $orderId = !empty($input['id']) ? $input['id'] : 'DM-' . rand(100000, 900000);
        
        $orderData = [
            "order_id" => $orderId,
            "customer_name" => $input['customerName'] ?? 'عميل',
            "phone" => $input['phone'] ?? '',
            "governorate" => $input['governorate'] ?? 'Cairo',
            "area" => $input['area'] ?? '',
            "address" => $input['address'] ?? '',
            "total_value" => (float)($input['totalValue'] ?? 0),
            "status" => "new"
        ];
        
        callSupabase('orders', 'POST', $orderData);

        if (!empty($input['items']) && is_array($input['items'])) {
            $itemsData = [];
            foreach ($input['items'] as $item) {
                $itemsData[] = [
                    "order_ref" => $orderId,
                    "item_id" => $item['id'] ?? 'item',
                    "name_ar" => $item['nameAr'] ?? 'منتج',
                    "name_en" => $item['nameEn'] ?? 'Product',
                    "price" => (float)($item['price'] ?? 0),
                    "quantity" => (int)($item['quantity'] ?? 1)
                ];
            }
            callSupabase('order_items', 'POST', $itemsData);
        }

        echo json_encode(["success" => true, "message" => "Order synced to Supabase", "orderId" => $orderId], JSON_UNESCAPED_UNICODE);
        exit();
    }

    if ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        $orderId = $input['orderId'] ?? null;
        $status = $input['status'] ?? null;

        if (!$orderId || !$status) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing parameters"]);
            exit();
        }

        callSupabase('orders?order_id=eq.' . urlencode($orderId), 'PATCH', ["status" => $status]);
        echo json_encode(["success" => true, "message" => "Status updated", "orderId" => $orderId, "status" => $status], JSON_UNESCAPED_UNICODE);
        exit();
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
