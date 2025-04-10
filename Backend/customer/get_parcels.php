<?php
require_once("../config/db.php");
header("Content-Type: application/json");

$sender_id = $_GET['sender_id'];

$query = $conn->prepare("SELECT * FROM parcels WHERE sender_id = ?");
$query->bind_param("i", $sender_id);
$query->execute();

$result = $query->get_result();
$parcels = [];

while ($row = $result->fetch_assoc()) {
    $parcels[] = $row;
}

echo json_encode(["success" => true, "data" => $parcels]);