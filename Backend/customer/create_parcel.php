<?php
require_once("../config/db.php");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$sender_id = $data['sender_id'];
$receiver_name = $data['receiver_name'];
$pickup = $data['pickup_address'];
$delivery = $data['delivery_address'];

$stmt = $conn->prepare("INSERT INTO parcels (sender_id, receiver_name, pickup_address, delivery_address) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isss", $sender_id, $receiver_name, $pickup, $delivery);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Parcel created"]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}