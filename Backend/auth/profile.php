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

try {
    // Validate the Authorization header
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        echo json_encode(["success" => false, "message" => "Authorization header is missing"]);
        exit;
    }

    $authHeader = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $authHeader);

    if (empty($token)) {
        echo json_encode(["success" => false, "message" => "Invalid token"]);
        exit;
    }

    // Initialize DB connection
    $db = new Database();
    $conn = $db->connect();

    // Fetch user profile
    $query = $conn->prepare("SELECT id, name, email, role FROM users WHERE token = ?");
    if (!$query) {
        throw new Exception("Failed to prepare query: " . $conn->error);
    }

    $query->bind_param("s", $token);
    $query->execute();
    $result = $query->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        echo json_encode(["success" => true, "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }

    $query->close();
    $conn->close();
} catch (Exception $e) {
    error_log("Error fetching user profile: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "An internal error occurred"]);
}
