<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once("../config/db.php");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

// Validate input data
if (!isset($data['sender_id'], $data['recipientName'], $data['recipientPhone'], $data['pickupAddress'], $data['deliveryAddress'], $data['weight'], $data['dimensions'], $data['description'])) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

$sender_id = intval($data['sender_id']);
$receiver_name = $data['recipientName'];
$receiver_phone = $data['recipientPhone'];
$pickup = $data['pickupAddress'];
$delivery = $data['deliveryAddress'];
$weight = floatval($data['weight']);
$dimensions = $data['dimensions'];
$description = $data['description'];

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO parcels (sender_id, receiver_name, receiver_phone, pickup_address, delivery_address, weight, dimensions, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare statement: " . $conn->error]);
    exit;
}

// Bind parameters and execute the query
$stmt->bind_param("issssdss", $sender_id, $receiver_name, $receiver_phone, $pickup, $delivery, $weight, $dimensions, $description);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Parcel created successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to create parcel: " . $stmt->error]);
}

$stmt->close();
$conn->close();
