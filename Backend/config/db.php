<?php

class Database
{
    private $host;
    private $user;
    private $pass;
    private $db;
    private $conn;

    // Constructor to load environment variables
    public function __construct()
    {
        $this->host = getenv('DB_HOST') ?: 'localhost';
        $this->user = getenv('DB_USER') ?: 'root';
        $this->pass = getenv('DB_PASS') ?: '';
        $this->db = getenv('DB_NAME') ?: 'swift ship';
    }

    // Singleton pattern to ensure a single connection
    public function connect()
    {
        if ($this->conn === null) {
            $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->db);

            if ($this->conn->connect_error) {
                // Log the error and return a user-friendly message
                error_log("Database connection failed: " . $this->conn->connect_error);
                die(json_encode(["success" => false, "error" => "Unable to connect to the database."]));
            }
        }

        return $this->conn;
    }

    // Close the connection (optional)
    public function close()
    {
        if ($this->conn !== null) {
            $this->conn->close();
            $this->conn = null;
        }
    }
}
