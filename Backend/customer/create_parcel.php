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

    // Begin transaction
    $conn->begin_transaction();

    // Insert into parcels table
    $stmt = $conn->prepare("INSERT INTO parcels 
        (sender_id, receiver_name, receiver_phone, pickup_address, delivery_address, weight, dimensions, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    if (!$stmt) {
        throw new Exception("Failed to prepare parcel query: " . $conn->error);
    }

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

    if (!$stmt->execute()) {
        throw new Exception("Failed to create parcel: " . $stmt->error);
    }

    $parcel_id = $stmt->insert_id; // Get ID of the inserted parcel
    $stmt->close();

    // Insert initial tracking record
    $initial_status = "Parcel Created";
    $initial_location = $pickup;

    $trackStmt = $conn->prepare("INSERT INTO parcel_tracking (parcel_id, status, location) VALUES (?, ?, ?)");
    if (!$trackStmt) {
        throw new Exception("Failed to prepare tracking query: " . $conn->error);
    }

    $trackStmt->bind_param("iss", $parcel_id, $initial_status, $initial_location);

    if (!$trackStmt->execute()) {
        throw new Exception("Failed to insert initial tracking record: " . $trackStmt->error);
    }

    $trackStmt->close();

    // Commit transaction
    $conn->commit();
    $conn->close();

    echo json_encode(["success" => true, "message" => "Parcel created and tracking started successfully", "parcel_id" => $parcel_id]);
} catch (Exception $e) {
    if (isset($conn)) $conn->rollback(); // Roll back on error
    error_log("Parcel creation error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "An internal error occurred."]);
}
