<?php
// Configure CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow only the frontend origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allowed HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers
header("Access-Control-Allow-Credentials: true"); // Allow credentials (if needed)

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Route requests to the appropriate file
$url = $_GET['url'] ?? '';
if ($url) {
    $filePath = __DIR__ . '/' . $url;
    if (file_exists($filePath)) {
        include($filePath);
    } else {
        echo json_encode(["success" => false, "message" => "Endpoint not found"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No endpoint specified"]);
}
