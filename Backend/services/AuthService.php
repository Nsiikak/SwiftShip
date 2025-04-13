<?php

require_once __DIR__ . '/../config/db.php';

class AuthService
{
    private $conn;

    public function __construct()
    {
        $this->conn = (new Database())->connect();
    }

    public function login($email, $password)
    {
        $query = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
        $query->bind_param("s", $email);
        $query->execute();
        $user = $query->get_result()->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            return ['success' => true, 'user' => $user];
        }

        return ['success' => false, 'message' => 'Invalid credentials'];
    }

    public function register($name, $email, $password, $role)
    {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $query = $this->conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        $query->bind_param("ssss", $name, $email, $hashedPassword, $role);
        $query->execute();

        if ($query->affected_rows > 0) {
            return ['success' => true, 'message' => 'User registered successfully'];
        }

        return ['success' => false, 'message' => 'Registration failed'];
    }
}
