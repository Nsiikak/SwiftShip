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

// Validate and retrieve the sender_id
$sender_id = $_GET['sender_id'] ?? null;

if (!$sender_id || !is_numeric($sender_id)) {
    echo json_encode(["success" => false, "message" => "Valid sender ID is required"]);
    exit;
}

try {
    $db = new Database();
    $conn = $db->connect();

    $query = $conn->prepare("
        SELECT 
            p.id AS parcel_id,
            p.tracking_id,
            p.created_at,
            p.pickup_address,
            p.delivery_address,
            p.description,
            COALESCE(pt.status, 'pending') AS status,
            MAX(pt.timestamp) AS last_updated
        FROM parcels p
        LEFT JOIN parcel_tracking pt ON p.id = pt.parcel_id
        WHERE p.sender_id = ?
        GROUP BY p.id
        ORDER BY p.created_at DESC
    ");

    if (!$query) {
        throw new Exception("Failed to prepare query: " . $conn->error);
    }

    $query->bind_param("i", $sender_id);
    $query->execute();

    $result = $query->get_result();
    $parcels = [];

    while ($row = $result->fetch_assoc()) {
        $parcels[] = [
            "id" => $row["parcel_id"],
            "trackingId" => $row["tracking_id"],
            "createdAt" => $row["created_at"],
            "pickupAddress" => $row["pickup_address"],
            "deliveryAddress" => $row["delivery_address"],
            "description" => $row["description"],
            "status" => $row["status"],
            "lastUpdated" => $row["last_updated"]
        ];
    }

    echo json_encode([
        "success" => true,
        "message" => count($parcels) > 0 ? "Parcels retrieved successfully" : "No parcels found",
        "data" => $parcels
    ]);

    $query->close();
    $conn->close();
} catch (Exception $e) {
    error_log("Parcel fetch error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "An internal error occurred."]);
}
