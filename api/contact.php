<?php
/**
 * Contact Form Handler
 *
 * Handles contact form submissions from the React frontend
 * Validates, sanitizes input and sends email notifications
 */

// Load configuration
$config = file_exists('config.local.php') ? include 'config.local.php' : include 'config.php';

// Enable error reporting for development (disable in production)
if (getenv('APP_ENV') !== 'production') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// Set content type to JSON
header('Content-Type: application/json');

// CORS handling
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'])) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: *'); // For development only
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit();
}

/**
 * Sanitize input data
 */
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate email address
 */
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate required fields
 */
function validate_required_fields($data, $required_fields) {
    $errors = [];
    
    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            $errors[] = ucfirst($field) . ' is required.';
        }
    }
    
    return $errors;
}

/**
 * Additional validation rules
 */
function validate_form_data($data, $config) {
    $errors = [];

    // Validate name length
    if (strlen($data['name']) < $config['min_name_length']) {
        $errors[] = "Name must be at least {$config['min_name_length']} characters long.";
    }

    if (strlen($data['name']) > $config['max_name_length']) {
        $errors[] = "Name must be less than {$config['max_name_length']} characters.";
    }

    // Validate email
    if (!validate_email($data['email'])) {
        $errors[] = 'Please provide a valid email address.';
    }

    // Validate subject length
    if (strlen($data['subject']) < $config['min_subject_length']) {
        $errors[] = "Subject must be at least {$config['min_subject_length']} characters long.";
    }

    if (strlen($data['subject']) > $config['max_subject_length']) {
        $errors[] = "Subject must be less than {$config['max_subject_length']} characters.";
    }

    // Validate message length
    if (strlen($data['message']) < $config['min_message_length']) {
        $errors[] = "Message must be at least {$config['min_message_length']} characters long.";
    }

    if (strlen($data['message']) > $config['max_message_length']) {
        $errors[] = "Message must be less than {$config['max_message_length']} characters.";
    }

    return $errors;
}

/**
 * Send email using SMTP or PHP mail function
 */
function send_contact_email($data, $config) {
    if ($config['use_smtp']) {
        return send_smtp_email($data, $config);
    } else {
        return send_php_mail($data, $config);
    }
}

/**
 * Send email using PHP mail function (fallback)
 */
function send_php_mail($data, $config) {
    $to = $config['recipient_email'];
    $subject = $config['subject_prefix'] . $data['subject'];

    // Create email body
    $message = create_email_body($data);

    // Set email headers
    $headers = [];
    $headers[] = 'From: ' . $config['from_name'] . ' <noreply@' . $_SERVER['HTTP_HOST'] . '>';
    $headers[] = 'Reply-To: ' . $data['name'] . ' <' . $data['email'] . '>';
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';

    $headers_string = implode("\r\n", $headers);

    // Send email
    $mail_sent = mail($to, $subject, $message, $headers_string);

    return $mail_sent;
}

/**
 * Send email using SMTP
 */
function send_smtp_email($data, $config) {
    $to = $config['recipient_email'];
    $subject = $config['subject_prefix'] . $data['subject'];
    $message = create_email_body($data);

    // SMTP connection
    $smtp_host = $config['smtp_host'];
    $smtp_port = $config['smtp_port'];
    $smtp_username = $config['smtp_username'];
    $smtp_password = $config['smtp_password'];
    $smtp_encryption = $config['smtp_encryption'];

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

    $socket = stream_socket_client(
        $smtp_host . ':' . $smtp_port,
        $errno,
        $errstr,
        30,
        STREAM_CLIENT_CONNECT,
        $context
    );

    if (!$socket) {
        log_error("SMTP connection failed: $errstr ($errno)");
        return false;
    }

    // Read initial response
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '220') {
        log_error("SMTP initial response error: $response");
        fclose($socket);
        return false;
    }

    // SMTP conversation
    $commands = [
        "EHLO " . $_SERVER['HTTP_HOST'],
    ];

    // Add STARTTLS if using TLS
    if ($smtp_encryption === 'tls') {
        $commands[] = "STARTTLS";
    }

    foreach ($commands as $command) {
        fwrite($socket, $command . "\r\n");
        $response = fgets($socket, 512);

        if ($command === "STARTTLS") {
            if (substr($response, 0, 3) !== '220') {
                log_error("STARTTLS failed: $response");
                fclose($socket);
                return false;
            }

            // Enable crypto
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                log_error("Failed to enable TLS encryption");
                fclose($socket);
                return false;
            }

            // Send EHLO again after STARTTLS
            fwrite($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
            $response = fgets($socket, 512);
        }

        if (substr($response, 0, 3) !== '250' && substr($response, 0, 3) !== '220') {
            log_error("SMTP command '$command' failed: $response");
            fclose($socket);
            return false;
        }
    }

    // Authentication
    fwrite($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '334') {
        log_error("AUTH LOGIN failed: $response");
        fclose($socket);
        return false;
    }

    // Send username
    fwrite($socket, base64_encode($smtp_username) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '334') {
        log_error("Username authentication failed: $response");
        fclose($socket);
        return false;
    }

    // Send password
    fwrite($socket, base64_encode($smtp_password) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '235') {
        log_error("Password authentication failed: $response");
        fclose($socket);
        return false;
    }

    // Send email
    $from_email = $smtp_username;

    // MAIL FROM
    fwrite($socket, "MAIL FROM: <$from_email>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        log_error("MAIL FROM failed: $response");
        fclose($socket);
        return false;
    }

    // RCPT TO
    fwrite($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        log_error("RCPT TO failed: $response");
        fclose($socket);
        return false;
    }

    // DATA
    fwrite($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '354') {
        log_error("DATA command failed: $response");
        fclose($socket);
        return false;
    }

    // Email headers and body
    $email_content = "From: " . $config['from_name'] . " <$from_email>\r\n";
    $email_content .= "To: <$to>\r\n";
    $email_content .= "Reply-To: " . $data['name'] . " <" . $data['email'] . ">\r\n";
    $email_content .= "Subject: $subject\r\n";
    $email_content .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_content .= "X-Mailer: Portfolio Contact Form\r\n";
    $email_content .= "\r\n";
    $email_content .= $message;
    $email_content .= "\r\n.\r\n";

    fwrite($socket, $email_content);
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        log_error("Email sending failed: $response");
        fclose($socket);
        return false;
    }

    // QUIT
    fwrite($socket, "QUIT\r\n");
    fclose($socket);

    return true;
}

/**
 * Create email body content
 */
function create_email_body($data) {
    $message = "New contact form submission:\n\n";
    $message .= "Name: " . $data['name'] . "\n";
    $message .= "Email: " . $data['email'] . "\n";
    $message .= "Subject: " . $data['subject'] . "\n\n";
    $message .= "Message:\n" . $data['message'] . "\n\n";
    $message .= "---\n";
    $message .= "Sent from: " . $_SERVER['HTTP_HOST'] . "\n";
    $message .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $message .= "User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "\n";
    $message .= "Timestamp: " . date('Y-m-d H:i:s') . "\n";

    return $message;
}

/**
 * Log errors for debugging
 */
function log_error($message) {
    $log_message = date('Y-m-d H:i:s') . ' - ' . $message . PHP_EOL;
    error_log($log_message, 3, 'contact_form_errors.log');
}

// Main processing
try {
    // Get JSON input
    $json_input = file_get_contents('php://input');
    $input_data = json_decode($json_input, true);
    
    // Check if JSON was parsed successfully
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON data received.');
    }
    
    // Sanitize all input data
    $sanitized_data = [];
    foreach ($input_data as $key => $value) {
        if (in_array($key, $config['required_fields'])) {
            $sanitized_data[$key] = sanitize_input($value);
        }
    }
    
    // Validate required fields
    $validation_errors = validate_required_fields($sanitized_data, $config['required_fields']);
    
    if (!empty($validation_errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed.',
            'errors' => $validation_errors
        ]);
        exit();
    }
    
    // Additional validation
    $additional_errors = validate_form_data($sanitized_data, $config);
    
    if (!empty($additional_errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed.',
            'errors' => $additional_errors
        ]);
        exit();
    }
    
    // Rate limiting (if enabled)
    if ($config['enable_rate_limiting']) {
        $rate_limit_file = 'rate_limit_' . md5($_SERVER['REMOTE_ADDR']) . '.txt';
        $current_time = time();

        if (file_exists($rate_limit_file)) {
            $submissions = json_decode(file_get_contents($rate_limit_file), true);
            $submissions = array_filter($submissions, function($timestamp) use ($current_time, $config) {
                return ($current_time - $timestamp) < $config['rate_limit_window'];
            });

            if (count($submissions) >= $config['max_submissions_per_window']) {
                http_response_code(429);
                echo json_encode([
                    'success' => false,
                    'message' => 'Too many submissions. Please wait before sending another message.'
                ]);
                exit();
            }

            $submissions[] = $current_time;
        } else {
            $submissions = [$current_time];
        }

        file_put_contents($rate_limit_file, json_encode($submissions));
    }
    
    // Send email
    $email_sent = send_contact_email($sanitized_data, $config);
    
    if ($email_sent) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully.'
        ]);
    } else {
        throw new Exception('Failed to send email.');
    }
    
} catch (Exception $e) {
    // Log the error
    log_error('Contact form error: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while processing your request. Please try again later.'
    ]);
}
?>
