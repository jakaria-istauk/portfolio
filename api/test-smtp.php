<?php
/**
 * SMTP Configuration Test Script
 * 
 * This script tests your SMTP configuration without sending actual emails
 * Usage: php test-smtp.php
 */

echo "SMTP Configuration Test\n";
echo "======================\n\n";

// Load configuration
if (file_exists('config.local.php')) {
    $config = include 'config.local.php';
    echo "✓ Loaded config.local.php\n";
} else {
    $config = include 'config.php';
    echo "⚠ Using default config.php (create config.local.php for custom settings)\n";
}

echo "\nSMTP Configuration:\n";
echo "-------------------\n";
echo "Use SMTP: " . ($config['use_smtp'] ? 'Yes' : 'No') . "\n";

if ($config['use_smtp']) {
    echo "SMTP Host: " . $config['smtp_host'] . "\n";
    echo "SMTP Port: " . $config['smtp_port'] . "\n";
    echo "SMTP Username: " . $config['smtp_username'] . "\n";
    echo "SMTP Password: " . (empty($config['smtp_password']) ? 'NOT SET' : '***HIDDEN***') . "\n";
    echo "SMTP Encryption: " . $config['smtp_encryption'] . "\n";
    
    echo "\nTesting SMTP Connection...\n";
    echo "-------------------------\n";
    
    // Test SMTP connection
    $result = test_smtp_connection($config);
    
    if ($result['success']) {
        echo "✓ SMTP connection successful!\n";
        echo "✓ Authentication successful!\n";
        echo "✓ Ready to send emails\n";
    } else {
        echo "✗ SMTP connection failed: " . $result['error'] . "\n";
        echo "\nTroubleshooting tips:\n";
        echo "- Check your SMTP credentials\n";
        echo "- Verify SMTP host and port\n";
        echo "- Ensure firewall allows outbound connections\n";
        echo "- For Gmail: Use app password, not regular password\n";
        echo "- Check if 2FA is enabled for your email account\n";
    }
} else {
    echo "SMTP is disabled. Using PHP mail() function.\n";
    echo "Note: SMTP is recommended for better deliverability.\n";
}

echo "\nRecipient Email: " . $config['recipient_email'] . "\n";
echo "From Name: " . $config['from_name'] . "\n";

echo "\nTest completed.\n";

/**
 * Test SMTP connection without sending email
 */
function test_smtp_connection($config) {
    $smtp_host = $config['smtp_host'];
    $smtp_port = $config['smtp_port'];
    $smtp_username = $config['smtp_username'];
    $smtp_password = $config['smtp_password'];
    $smtp_encryption = $config['smtp_encryption'];
    
    // Check if credentials are provided
    if (empty($smtp_username) || empty($smtp_password)) {
        return [
            'success' => false,
            'error' => 'SMTP username or password not configured'
        ];
    }
    
    // Create socket connection
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);
    
    if ($smtp_encryption === 'ssl') {
        $smtp_host = 'ssl://' . $smtp_host;
    }
    
    echo "Connecting to {$smtp_host}:{$smtp_port}...\n";
    
    $socket = @stream_socket_client(
        $smtp_host . ':' . $smtp_port,
        $errno,
        $errstr,
        10, // 10 second timeout
        STREAM_CLIENT_CONNECT,
        $context
    );
    
    if (!$socket) {
        return [
            'success' => false,
            'error' => "Connection failed: $errstr ($errno)"
        ];
    }
    
    echo "✓ Connected to SMTP server\n";
    
    // Read initial response
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '220') {
        fclose($socket);
        return [
            'success' => false,
            'error' => "Invalid initial response: $response"
        ];
    }
    
    echo "✓ Server ready: " . trim($response) . "\n";
    
    // Send EHLO
    fwrite($socket, "EHLO localhost\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        return [
            'success' => false,
            'error' => "EHLO failed: $response"
        ];
    }
    
    echo "✓ EHLO successful\n";
    
    // Handle STARTTLS if needed
    if ($smtp_encryption === 'tls') {
        fwrite($socket, "STARTTLS\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) !== '220') {
            fclose($socket);
            return [
                'success' => false,
                'error' => "STARTTLS failed: $response"
            ];
        }
        
        echo "✓ STARTTLS initiated\n";
        
        // Enable crypto
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return [
                'success' => false,
                'error' => "Failed to enable TLS encryption"
            ];
        }
        
        echo "✓ TLS encryption enabled\n";
        
        // Send EHLO again after STARTTLS
        fwrite($socket, "EHLO localhost\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) !== '250') {
            fclose($socket);
            return [
                'success' => false,
                'error' => "EHLO after STARTTLS failed: $response"
            ];
        }
    }
    
    // Test authentication
    fwrite($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '334') {
        fclose($socket);
        return [
            'success' => false,
            'error' => "AUTH LOGIN not supported: $response"
        ];
    }
    
    echo "✓ AUTH LOGIN supported\n";
    
    // Send username
    fwrite($socket, base64_encode($smtp_username) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '334') {
        fclose($socket);
        return [
            'success' => false,
            'error' => "Username rejected: $response"
        ];
    }
    
    echo "✓ Username accepted\n";
    
    // Send password
    fwrite($socket, base64_encode($smtp_password) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '235') {
        fclose($socket);
        return [
            'success' => false,
            'error' => "Authentication failed: $response"
        ];
    }
    
    echo "✓ Authentication successful\n";
    
    // Quit
    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    
    return ['success' => true];
}
?>
