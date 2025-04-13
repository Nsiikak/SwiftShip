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

$name = $data['name'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;
$role = $data['role'] ?? "admin";

if (!$name || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "Name, email, and password are required"]);
    exit;
}

try {
    // Connect to DB using your OOP db class
    $db = new Database();
    $conn = $db->connect();

    // Check if user already exists
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    if (!$check) {
        throw new Exception("Failed to prepare check statement: " . $conn->error);
    }
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "User with this email already exists"]);
        $check->close();
        $conn->close();
        exit;
    }
    $check->close();

    // Hash password securely
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert new admin user
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Failed to prepare insert statement: " . $conn->error);
    }

    $stmt->bind_param("ssss", $name, $email, $hashedPassword, $role);
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Admin user created successfully",
            "user" => [
                "id" => $stmt->insert_id,
                "name" => $name,
                "email" => $email,
                "role" => $role
            ]
        ]);
    } else {
        throw new Exception("Failed to insert admin user: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    error_log("Create Admin Error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "An internal error occurred"]);
}
