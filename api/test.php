<?php
/**
 * Simple test script for the contact form API
 * 
 * Usage: php test.php
 * Or visit: http://localhost:8000/test.php
 */

// Test data
$testData = [
    'name' => 'John Doe',
    'email' => 'john.doe@example.com',
    'subject' => 'Test Message',
    'message' => 'This is a test message from the API test script.'
];

echo "Contact Form API Test\n";
echo "====================\n\n";

// Test 1: Valid submission
echo "Test 1: Valid submission\n";
echo "------------------------\n";

$response = sendTestRequest($testData);
echo "Response: " . $response . "\n\n";

// Test 2: Missing required field
echo "Test 2: Missing required field\n";
echo "------------------------------\n";

$invalidData = $testData;
unset($invalidData['email']);

$response = sendTestRequest($invalidData);
echo "Response: " . $response . "\n\n";

// Test 3: Invalid email
echo "Test 3: Invalid email\n";
echo "--------------------\n";

$invalidEmailData = $testData;
$invalidEmailData['email'] = 'invalid-email';

$response = sendTestRequest($invalidEmailData);
echo "Response: " . $response . "\n\n";

// Test 4: Empty message
echo "Test 4: Empty message\n";
echo "--------------------\n";

$emptyMessageData = $testData;
$emptyMessageData['message'] = '';

$response = sendTestRequest($emptyMessageData);
echo "Response: " . $response . "\n\n";

function sendTestRequest($data) {
    // Simulate the contact.php processing
    $_SERVER['REQUEST_METHOD'] = 'POST';
    $_SERVER['HTTP_HOST'] = 'localhost';
    $_SERVER['REMOTE_ADDR'] = '127.0.0.1';
    $_SERVER['HTTP_USER_AGENT'] = 'Test Script';
    
    // Capture output
    ob_start();
    
    // Mock the input
    $GLOBALS['test_input'] = json_encode($data);
    
    // Include the contact script with modifications for testing
    include_once 'contact_test_wrapper.php';
    
    $output = ob_get_clean();
    
    return $output;
}

// Create a test wrapper that modifies file_get_contents behavior
file_put_contents('contact_test_wrapper.php', '<?php
// Override file_get_contents for testing
function file_get_contents($filename) {
    if ($filename === "php://input") {
        return $GLOBALS["test_input"];
    }
    return call_user_func_array("\\file_get_contents", func_get_args());
}

// Override mail function for testing (fallback)
function mail($to, $subject, $message, $headers) {
    echo "EMAIL WOULD BE SENT (PHP mail):\n";
    echo "To: $to\n";
    echo "Subject: $subject\n";
    echo "Headers: $headers\n";
    echo "Message: " . substr($message, 0, 100) . "...\n";
    return true; // Simulate successful sending
}

// Override SMTP functions for testing
function stream_socket_client($remote_socket, &$errno, &$errstr, $timeout = null, $flags = null, $context = null) {
    echo "SMTP CONNECTION WOULD BE MADE TO: $remote_socket\n";
    return fopen("php://memory", "r+"); // Return a fake socket
}

function fgets($handle, $length = null) {
    // Simulate SMTP responses
    static $responses = [
        "220 smtp.gmail.com ESMTP ready\r\n",
        "250 Hello\r\n",
        "220 Ready to start TLS\r\n",
        "250 Hello again\r\n",
        "334 VXNlcm5hbWU6\r\n", // AUTH LOGIN
        "334 UGFzc3dvcmQ6\r\n", // Username accepted
        "235 Authentication successful\r\n", // Password accepted
        "250 OK\r\n", // MAIL FROM
        "250 OK\r\n", // RCPT TO
        "354 Start mail input\r\n", // DATA
        "250 OK Message accepted\r\n", // End of DATA
        "221 Bye\r\n" // QUIT
    ];

    static $index = 0;
    if (isset($responses[$index])) {
        return $responses[$index++];
    }
    return "250 OK\r\n";
}

function fwrite($handle, $string, $length = null) {
    echo "SMTP COMMAND: " . trim($string) . "\n";
    return strlen($string);
}

function fclose($handle) {
    echo "SMTP CONNECTION CLOSED\n";
    return true;
}

function stream_socket_enable_crypto($stream, $enable, $crypto_type = null, $session_stream = null) {
    echo "TLS ENCRYPTION ENABLED\n";
    return true;
}

// Include the actual contact script
include "contact.php";
');

echo "Test completed. Check the output above.\n";
echo "Note: No actual emails were sent during testing.\n";

// Cleanup
unlink('contact_test_wrapper.php');
?>
