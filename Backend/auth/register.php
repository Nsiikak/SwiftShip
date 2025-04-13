<?php

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'] ?? null;
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;
    $role = $data['role'] ?? 'customer'; // Default role is 'customer'

    if (!$name || !$email || !$password) {
        echo json_encode(['success' => false, 'message' => 'Name, email, and password are required']);
        exit;
    }

    try {
        $db = new Database();
        $conn = $db->connect();

        // 🔍 Check if email already exists
        $checkQuery = $conn->prepare("SELECT id FROM users WHERE email = ?");
        if (!$checkQuery) {
            throw new Exception("Failed to prepare email check: " . $conn->error);
        }

        $checkQuery->bind_param("s", $email);
        $checkQuery->execute();
        $checkQuery->store_result();

        if ($checkQuery->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Email already registered']);
            $checkQuery->close();
            $conn->close();
            exit;
        }
        $checkQuery->close();

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Insert new user
        $insertQuery = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        if (!$insertQuery) {
            throw new Exception("Failed to prepare insert: " . $conn->error);
        }

        $insertQuery->bind_param("ssss", $name, $email, $hashedPassword, $role);

        if ($insertQuery->execute()) {
            echo json_encode(['success' => true, 'message' => 'User registered successfully']);
        } else {
            throw new Exception("Failed to execute insert: " . $insertQuery->error);
        }

        $insertQuery->close();
        $conn->close();
    } catch (Exception $e) {
        error_log("Error in register.php: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'An error occurred during registration.']);
    }
}
