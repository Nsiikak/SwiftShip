<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once("../config/db.php");
header("Content-Type: application/json");

// Get input data
$data = json_decode(file_get_contents("php://input"), true);

// Validate all fields
if (
    !isset(
        $data['sender_id'],
        $data['pickupAddress'],
        $data['deliveryAddress'],
        $data['recipientName'],
        $data['recipientPhone'],
        $data['weight'],
        $data['dimensions'],
        $data['description']
    )
) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

// Assign and sanitize
$sender_id = intval($data['sender_id']);
$pickup_address = $data['pickupAddress'];
$delivery_address = $data['deliveryAddress'];
$receiver_name = $data['recipientName']; // renamed for DB match
$receiver_phone = $data['recipientPhone']; // renamed for DB match
$weight = floatval($data['weight']);
$dimensions = $data['dimensions'];
$description = $data['description'];

try {
    $db = new Database();
    $conn = $db->connect();

    // Get next auto-increment ID for tracking number
    $result = $conn->query("SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'parcels'");
    $row = $result->fetch_assoc();
    $next_id = intval($row['AUTO_INCREMENT']);
    $tracking_id = sprintf("SW-%04d", $next_id);

    // Prepare and bind statement
    $stmt = $conn->prepare("
        INSERT INTO parcels (sender_id, tracking_id, pickup_address, delivery_address, receiver_name, receiver_phone, weight, dimensions, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    if (!$stmt) {
        die(json_encode(["success" => false, "message" => "Prepare failed", "error" => $conn->error]));
    }

    $stmt->bind_param(
        "isssssdss",
        $sender_id,
        $tracking_id,
        $pickup_address,
        $delivery_address,
        $receiver_name,
        $receiver_phone,
        $weight,
        $dimensions,
        $description
    );

    if (!$stmt->execute()) {
        die(json_encode(["success" => false, "message" => "Execute failed", "error" => $stmt->error]));
    }

    echo json_encode([
        "success" => true,
        "message" => "Parcel created successfully",
        "trackingId" => $tracking_id
    ]);

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Server error", "error" => $e->getMessage()]);
}
