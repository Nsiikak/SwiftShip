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
        // Establish database connection
        $db = new Database();
        $conn = $db->connect();

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Prepare and execute the query
        $query = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        if (!$query) {
            throw new Exception("Failed to prepare statement: " . $conn->error);
        }

        $query->bind_param("ssss", $name, $email, $hashedPassword, $role);

        if ($query->execute()) {
            echo json_encode(['success' => true, 'message' => 'User registered successfully']);
        } else {
            throw new Exception("Failed to execute query: " . $query->error);
        }

        $query->close();
        $conn->close();
    } catch (Exception $e) {
        error_log("Error in register.php: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'An error occurred during registration.']);
    }
}
