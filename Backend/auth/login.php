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

$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!$email || !$password) {
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
    exit;
}

try {
    // Connect to the database
    $db = new Database();
    $conn = $db->connect();

    // Prepare statement to find user by email
    $query = $conn->prepare("SELECT * FROM users WHERE email = ?");
    if (!$query) {
        throw new Exception("Failed to prepare login query: " . $conn->error);
    }

    $query->bind_param("s", $email);
    $query->execute();
    $result = $query->get_result();
    $user = $result->fetch_assoc();

    // Validate credentials
    if ($user && password_verify($password, $user['password'])) {
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user" => [
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email'],
                "role" => $user['role']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
    }

    $query->close();
    $conn->close();
} catch (Exception $e) {
    error_log("Login error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "An internal error occurred."]);
}
