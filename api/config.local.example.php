<?php
/**
 * Local Configuration Template
 * 
 * Copy this file to config.local.php and modify the values for your environment
 * The config.local.php file should not be committed to version control
 */

return [
    // Email configuration
    'recipient_email' => 'your-email@yourdomain.com', // CHANGE THIS
    'from_name' => 'Your Portfolio Contact Form',
    'subject_prefix' => '[Portfolio Contact] ',
    
    // Validation settings
    'max_message_length' => 5000,
    'min_name_length' => 2,
    'max_name_length' => 100,
    'min_subject_length' => 3,
    'max_subject_length' => 200,
    'min_message_length' => 10,
    
    // Required fields
    'required_fields' => ['name', 'email', 'subject', 'message'],
    
    // Rate limiting
    'rate_limit_window' => 300, // 5 minutes in seconds
    'max_submissions_per_window' => 3,
    
    // Security settings
    'enable_rate_limiting' => true,
    'log_submissions' => true,
    'log_file' => 'contact_form.log',
    
    // CORS settings - IMPORTANT: Configure for production
    'allowed_origins' => [
        'https://yourdomain.com',           // CHANGE THIS to your production domain
        'https://www.yourdomain.com',       // CHANGE THIS to your production domain
        'http://localhost:3000',            // For React development
        'http://localhost:5173',            // For Vite development
        'http://127.0.0.1:3000',           // Alternative localhost
        'http://127.0.0.1:5173',           // Alternative localhost
    ],
    
    // SMTP settings (recommended for production)
    'use_smtp' => true, // Set to true to use SMTP instead of mail()
    'smtp_host' => 'smtp.gmail.com', // Gmail SMTP server
    'smtp_port' => 587, // 587 for TLS, 465 for SSL
    'smtp_username' => 'your-email@gmail.com', // Your Gmail address
    'smtp_password' => 'your-app-password', // Gmail App Password (not regular password)
    'smtp_encryption' => 'tls', // 'tls' for port 587, 'ssl' for port 465

    // Alternative SMTP providers:
    // Outlook/Hotmail:
    // 'smtp_host' => 'smtp-mail.outlook.com',
    // 'smtp_port' => 587,
    // 'smtp_encryption' => 'tls',

    // Yahoo:
    // 'smtp_host' => 'smtp.mail.yahoo.com',
    // 'smtp_port' => 587,
    // 'smtp_encryption' => 'tls',

    // Custom SMTP (e.g., cPanel, hosting provider):
    // 'smtp_host' => 'mail.yourdomain.com',
    // 'smtp_port' => 587,
    // 'smtp_encryption' => 'tls',
    
    // Environment-specific settings
    'environment' => 'production', // 'development' or 'production'
    'debug_mode' => false, // Set to true for development debugging
];

/*
 * SETUP CHECKLIST:
 * 
 * 1. Change 'recipient_email' to your actual email address
 * 2. Update 'allowed_origins' with your actual domain(s)
 * 3. Configure SMTP settings if needed (recommended for production)
 * 4. Set 'environment' to 'production' for live sites
 * 5. Ensure this file has proper permissions (not web-accessible)
 * 6. Test the configuration using test.html or test.php
 * 
 * SECURITY NOTES:
 * 
 * - Never commit this file to version control
 * - Use environment variables for sensitive data when possible
 * - Enable HTTPS in production
 * - Consider using a dedicated email service (SendGrid, Mailgun, etc.)
 * - Monitor the log files for suspicious activity
 * - Adjust rate limiting based on your needs
 */
?>
