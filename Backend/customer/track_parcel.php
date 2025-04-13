<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once("../config/db.php");
header("Content-Type: application/json");

// Validate and retrieve the tracking_id
$tracking_id = $_GET['tracking_id'] ?? null;

if (!$tracking_id) {
    echo json_encode(["success" => false, "message" => "Tracking ID is required"]);
    exit;
}

try {
    $db = new Database();
    $conn = $db->connect();

    // Fetch parcel details
    $parcelQuery = $conn->prepare("
        SELECT 
            p.id AS parcel_id,
            p.tracking_id,
            p.pickup_address,
            p.delivery_address,
            p.description,
            COALESCE(pt.status, 'pending') AS status,
            MAX(pt.timestamp) AS last_updated
        FROM parcels p
        LEFT JOIN parcel_tracking pt ON p.id = pt.parcel_id
        WHERE p.tracking_id = ?
        GROUP BY p.id
    ");
    if (!$parcelQuery) {
        throw new Exception("Failed to prepare parcel query: " . $conn->error);
    }

    $parcelQuery->bind_param("s", $tracking_id);
    $parcelQuery->execute();
    $parcelResult = $parcelQuery->get_result();

    if ($parcelResult->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Parcel not found"]);
        exit;
    }

    $parcel = $parcelResult->fetch_assoc();

    // Fetch tracking events
    $trackingQuery = $conn->prepare("
        SELECT 
            id,
            status,
            location,
            timestamp,
            description
        FROM parcel_tracking
        WHERE parcel_id = ?
        ORDER BY timestamp ASC
    ");
    if (!$trackingQuery) {
        throw new Exception("Failed to prepare tracking query: " . $conn->error);
    }

    $trackingQuery->bind_param("i", $parcel['parcel_id']);
    $trackingQuery->execute();
    $trackingResult = $trackingQuery->get_result();

    $trackingEvents = [];
    while ($row = $trackingResult->fetch_assoc()) {
        $trackingEvents[] = $row;
    }

    // Return the parcel and tracking data
    echo json_encode([
        "success" => true,
        "data" => [
            "trackingId" => $parcel['tracking_id'],
            "status" => $parcel['status'],
            "pickupAddress" => $parcel['pickup_address'],
            "deliveryAddress" => $parcel['delivery_address'],
            "description" => $parcel['description'],
            "lastUpdated" => $parcel['last_updated'],
            "events" => $trackingEvents
        ]
    ]);

    $parcelQuery->close();
    $trackingQuery->close();
    $conn->close();
} catch (Exception $e) {
    error_log("Track parcel error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "An internal error occurred."]);
}
