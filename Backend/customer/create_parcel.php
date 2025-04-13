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

// Parse incoming JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validate input data
$sender_id = $data['sender_id'] ?? null;
$receiver_name = $data['recipientName'] ?? null;
$receiver_phone = $data['recipientPhone'] ?? null;
$pickup = $data['pickupAddress'] ?? null;
$delivery = $data['deliveryAddress'] ?? null;
$weight = $data['weight'] ?? null;
$dimensions = $data['dimensions'] ?? null;
$description = $data['description'] ?? null;

if (
    !$sender_id || !$receiver_name || !$receiver_phone || !$pickup ||
    !$delivery || !$weight || !$dimensions || !$description
) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

try {
    // Connect to the database
    $db = new Database();
    $conn = $db->connect();

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO parcels 
        (sender_id, receiver_name, receiver_phone, pickup_address, delivery_address, weight, dimensions, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    if (!$stmt) {
        throw new Exception("Failed to prepare parcel creation query: " . $conn->error);
    }

    // Bind parameters
    $stmt->bind_param(
        "issssdss",
        $sender_id,
        $receiver_name,
        $receiver_phone,
        $pickup,
        $delivery,
        $weight,
        $dimensions,
        $description
    );

    // Execute and respond
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Parcel created successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to create parcel: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    error_log("Parcel creation error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "An internal error occurred."]);
}
