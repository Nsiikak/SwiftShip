<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once("../config/db.php"); // Ensure the database connection is included
header("Content-Type: application/json");

// Validate and retrieve the sender_id from the request
if (!isset($_GET['sender_id'])) {
    echo json_encode(["success" => false, "message" => "Sender ID is required"]);
    exit;
}

$sender_id = intval($_GET['sender_id']); // Ensure sender_id is an integer

// Prepare and execute the query
$query = $conn->prepare("SELECT * FROM parcels WHERE sender_id = ?");
if (!$query) {
    echo json_encode(["success" => false, "message" => "Failed to prepare query: " . $conn->error]);
    exit;
}

$query->bind_param("i", $sender_id);
$query->execute();

$result = $query->get_result();
$parcels = [];

while ($row = $result->fetch_assoc()) {
    $parcels[] = $row;
}

echo json_encode(["success" => true, "data" => $parcels]);

$query->close();
$conn->close();
