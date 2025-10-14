# Contact Form API

This directory contains the PHP backend for handling contact form submissions from the React frontend.

## Setup Instructions

### 1. Server Requirements

- PHP 7.4 or higher
- Web server (Apache/Nginx) with PHP support
- Mail server configuration (for sending emails)

### 2. Configuration

1. Copy `config.php` to `config.local.php`:
   ```bash
   cp config.php config.local.php
   ```

2. Edit `config.local.php` with your settings:
   ```php
   <?php
   return [
       'recipient_email' => 'your-email@domain.com',
       'allowed_origins' => [
           'https://yourdomain.com',
           'http://localhost:3000', // For development
           'http://localhost:5173'  // For Vite dev server
       ],

       // SMTP Configuration (recommended)
       'use_smtp' => true,
       'smtp_host' => 'smtp.gmail.com',
       'smtp_port' => 587,
       'smtp_username' => 'your-email@gmail.com',
       'smtp_password' => 'your-app-password', // Gmail App Password
       'smtp_encryption' => 'tls',

       // ... other settings
   ];
   ```

### 3. Deployment Options

#### Option A: Same Domain (Recommended)
Place the `api` folder in your web root alongside your React build:
```
/var/www/html/
├── api/
│   ├── contact.php
│   ├── config.php
│   └── .htaccess
├── index.html
├── assets/
└── ...
```

#### Option B: Subdomain
Deploy to a subdomain like `api.yourdomain.com` and update CORS settings.

#### Option C: Development Server
For local development, you can use PHP's built-in server:
```bash
cd api
php -S localhost:8000
```

Then update the API URL in Contact.jsx to `http://localhost:8000/contact.php`

### 4. Frontend Configuration

Update the API URL in `src/components/Contact.jsx`:

```javascript
// For same domain deployment
const apiUrl = '/api/contact.php'

// For subdomain deployment
const apiUrl = 'https://api.yourdomain.com/contact.php'

// For development
const apiUrl = 'http://localhost:8000/contact.php'
```

### 5. Testing

1. Test SMTP configuration:
   ```bash
   php api/test-smtp.php
   ```

2. Test the API endpoint directly:
   ```bash
   curl -X POST http://localhost:8000/contact.php \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
   ```

3. Use the web interface: `http://localhost:8000/test.html`

4. Check the response for success/error messages.

### 6. Security Considerations

- **Production**: Disable error reporting in `config.local.php`
- **CORS**: Configure `allowed_origins` properly for production
- **Rate Limiting**: Enabled by default, adjust limits as needed
- **File Permissions**: Ensure proper permissions on log files and rate limit files
- **HTTPS**: Always use HTTPS in production
- **Email**: Consider using SMTP instead of PHP's mail() function for better deliverability

### 7. Troubleshooting

#### Common Issues:

1. **CORS Errors**: Check `allowed_origins` in config
2. **Email Not Sending**: Verify mail server configuration
3. **Permission Denied**: Check file permissions for log files
4. **Rate Limiting**: Clear rate limit files if needed

#### Log Files:
- `contact_form_errors.log` - Error logs
- `contact_form.log` - Submission logs (if enabled)
- `rate_limit_*.txt` - Rate limiting data

### 8. Environment Variables

You can use environment variables for sensitive configuration:

```bash
export CONTACT_EMAIL="your-email@domain.com"
export APP_ENV="production"
```

The configuration will automatically use these if available.

## File Structure

```
api/
├── contact.php          # Main contact form handler
├── config.php           # Default configuration
├── config.local.php     # Local configuration (create this)
├── .htaccess           # Apache configuration
└── README.md           # This file
```

## API Response Format

### Success Response:
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully."
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Name must be at least 2 characters long.",
    "Please provide a valid email address."
  ]
}
```

## Rate Limiting

The API includes basic rate limiting:
- 3 submissions per 5-minute window per IP address
- Configurable in `config.php`
- Can be disabled for development

## SMTP Configuration (Recommended)

The contact form includes built-in SMTP support for better email deliverability:

### Quick SMTP Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**: Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. **Configure in config.local.php**:
   ```php
   'use_smtp' => true,
   'smtp_host' => 'smtp.gmail.com',
   'smtp_port' => 587,
   'smtp_username' => 'your-email@gmail.com',
   'smtp_password' => 'your-16-char-app-password',
   'smtp_encryption' => 'tls',
   ```

### Test SMTP Configuration
```bash
php api/test-smtp.php
```

### Supported Providers
- **Gmail**: smtp.gmail.com:587 (TLS)
- **Outlook**: smtp-mail.outlook.com:587 (TLS)
- **Yahoo**: smtp.mail.yahoo.com:587 (TLS)
- **Custom**: Your hosting provider's SMTP settings

For detailed SMTP setup instructions, see [SMTP_SETUP.md](SMTP_SETUP.md).
