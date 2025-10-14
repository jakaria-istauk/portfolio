# SMTP Setup Guide

This guide will help you configure SMTP for reliable email delivery from your contact form.

## Why Use SMTP?

- **Better Deliverability**: SMTP providers have better reputation than shared hosting mail servers
- **Authentication**: Proper authentication reduces spam filtering
- **Reliability**: More reliable than PHP's `mail()` function
- **Tracking**: Many providers offer delivery tracking and analytics

## Supported SMTP Providers

### 1. Gmail (Recommended for personal use)

**Configuration:**
```php
'use_smtp' => true,
'smtp_host' => 'smtp.gmail.com',
'smtp_port' => 587,
'smtp_username' => 'your-email@gmail.com',
'smtp_password' => 'your-app-password', // NOT your regular password
'smtp_encryption' => 'tls',
```

**Setup Steps:**
1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Use this app password in the configuration

### 2. Outlook/Hotmail

**Configuration:**
```php
'use_smtp' => true,
'smtp_host' => 'smtp-mail.outlook.com',
'smtp_port' => 587,
'smtp_username' => 'your-email@outlook.com',
'smtp_password' => 'your-password',
'smtp_encryption' => 'tls',
```

### 3. Yahoo Mail

**Configuration:**
```php
'use_smtp' => true,
'smtp_host' => 'smtp.mail.yahoo.com',
'smtp_port' => 587,
'smtp_username' => 'your-email@yahoo.com',
'smtp_password' => 'your-app-password',
'smtp_encryption' => 'tls',
```

**Setup Steps:**
1. Enable 2-Factor Authentication
2. Generate an app password in Yahoo Account Security settings

### 4. Custom/Hosting Provider SMTP

Most hosting providers offer SMTP services:

**Configuration:**
```php
'use_smtp' => true,
'smtp_host' => 'mail.yourdomain.com', // Or smtp.yourdomain.com
'smtp_port' => 587, // Or 465 for SSL
'smtp_username' => 'contact@yourdomain.com',
'smtp_password' => 'your-email-password',
'smtp_encryption' => 'tls', // Or 'ssl' for port 465
```

Contact your hosting provider for specific SMTP settings.

### 5. Professional Email Services

For high-volume or business use, consider:

#### SendGrid
- Free tier: 100 emails/day
- Configuration: Use their SMTP relay
- Website: [sendgrid.com](https://sendgrid.com)

#### Mailgun
- Free tier: 5,000 emails/month for 3 months
- Configuration: Use their SMTP credentials
- Website: [mailgun.com](https://mailgun.com)

#### Amazon SES
- Pay-as-you-go pricing
- Excellent deliverability
- Website: [aws.amazon.com/ses](https://aws.amazon.com/ses)

## Configuration Steps

### 1. Copy Configuration Template
```bash
cp api/config.local.example.php api/config.local.php
```

### 2. Edit SMTP Settings
```php
// In api/config.local.php
return [
    // ... other settings ...
    
    'use_smtp' => true,
    'smtp_host' => 'smtp.gmail.com',
    'smtp_port' => 587,
    'smtp_username' => 'your-email@gmail.com',
    'smtp_password' => 'your-app-password',
    'smtp_encryption' => 'tls',
];
```

### 3. Test Configuration
```bash
# Test using the test script
php api/test.php

# Or visit the test page
# http://yoursite.com/api/test.html
```

## Environment Variables (Recommended)

For better security, use environment variables:

### .env File
```bash
# Create .env file in your project root
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_ENCRYPTION=tls
```

### Server Environment
```bash
# Set on your server
export SMTP_HOST="smtp.gmail.com"
export SMTP_PORT="587"
export SMTP_USERNAME="your-email@gmail.com"
export SMTP_PASSWORD="your-app-password"
export SMTP_ENCRYPTION="tls"
```

The configuration will automatically use these environment variables if available.

## Common SMTP Ports

| Port | Encryption | Description |
|------|------------|-------------|
| 25   | None       | Standard SMTP (often blocked by ISPs) |
| 587  | TLS        | Submission port (recommended) |
| 465  | SSL        | Legacy secure SMTP |
| 2525 | TLS        | Alternative port (some providers) |

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Check username/password
   - For Gmail: Use app password, not regular password
   - Ensure 2FA is enabled for Gmail/Yahoo

2. **Connection Timeout**
   - Check firewall settings
   - Verify SMTP host and port
   - Try alternative ports (2525, 465)

3. **SSL/TLS Errors**
   - Check encryption setting (tls vs ssl)
   - Verify port matches encryption type
   - Some servers require specific SSL settings

4. **Emails Not Delivered**
   - Check spam folder
   - Verify recipient email address
   - Check SMTP provider limits
   - Review email content for spam triggers

### Debug Mode

Enable debug mode in your configuration:
```php
'debug_mode' => true,
```

This will log detailed SMTP conversation to help diagnose issues.

### Testing SMTP Connection

Use this simple test script:
```php
<?php
// test-smtp.php
$config = include 'config.local.php';

$test_data = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'subject' => 'SMTP Test',
    'message' => 'This is a test message to verify SMTP configuration.'
];

include 'contact.php';

if (send_contact_email($test_data, $config)) {
    echo "SMTP test successful!\n";
} else {
    echo "SMTP test failed. Check error logs.\n";
}
?>
```

## Security Best Practices

1. **Use App Passwords**: Never use your main email password
2. **Environment Variables**: Store credentials in environment variables
3. **File Permissions**: Secure your config files (chmod 600)
4. **HTTPS**: Always use HTTPS in production
5. **Rate Limiting**: Keep rate limiting enabled
6. **Monitor Logs**: Regularly check error logs

## Production Checklist

- [ ] SMTP credentials configured
- [ ] App passwords generated (Gmail/Yahoo)
- [ ] Environment variables set
- [ ] Configuration file secured
- [ ] Test email sent successfully
- [ ] Error logging enabled
- [ ] Rate limiting configured
- [ ] HTTPS enabled
- [ ] Spam folder checked

## Support

If you encounter issues:

1. Check the error logs: `api/contact_form_errors.log`
2. Test with `api/test.html`
3. Verify SMTP provider documentation
4. Check hosting provider SMTP policies
5. Consider using a dedicated email service for high volume

For Gmail-specific issues, see: [Google SMTP Documentation](https://support.google.com/mail/answer/7126229)
