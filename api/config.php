<?php
/**
 * Configuration file for the contact form
 * 
 * Copy this file to config.local.php and modify the values as needed
 * The local config file is ignored by git for security
 */

return [
    // Email configuration
    'recipient_email' => getenv('CONTACT_EMAIL') ?: 'hello@jakaria.com.bd',
    'from_name' => 'Portfolio Contact Form',
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
    
    // CORS settings (configure for production)
    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://yourdomain.com' // Add your production domain
    ],
    
    // SMTP settings (recommended for production)
    'use_smtp' => true, // Set to true to use SMTP instead of mail()
    'smtp_host' => getenv('SMTP_HOST') ?: 'smtp.gmail.com',
    'smtp_port' => getenv('SMTP_PORT') ?: 587,
    'smtp_username' => getenv('SMTP_USERNAME') ?: '',
    'smtp_password' => getenv('SMTP_PASSWORD') ?: '',
    'smtp_encryption' => getenv('SMTP_ENCRYPTION') ?: 'tls', // 'tls' or 'ssl'
];
?>
