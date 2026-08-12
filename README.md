# 🚀 Mohammad Jakaria Istauk - Portfolio

A modern, responsive portfolio website showcasing my work as a Full Stack Developer specializing in WordPress development and open-source contributions.

![Portfolio Preview](https://images.unsplash.com/photo-1537111261224-6fa49cecda2f?q=80&w=1170&auto=format&fit=crop)

## ✨ Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Components**: Smooth scrolling navigation and hover effects
- **Project Showcase**: Filterable portfolio with live demos and source code links
- **Skills Visualization**: Animated progress bars showing technical proficiencies
- **Contact Form**: Functional contact form with PHP backend and validation
- **Performance Optimized**: Built with Vite for fast loading and development
- **Accessibility**: WCAG compliant with semantic HTML structure

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0
- **Build Tool**: Vite 4.5.3
- **Styling**: Tailwind CSS 3.4.0
- **Code Quality**: ESLint with React hooks and refresh plugins
- **Package Manager**: npm/pnpm

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation with smooth scroll
│   ├── Hero.jsx           # Landing section with CTA
│   ├── About.jsx          # Professional background
│   ├── Skills.jsx         # Technical skills with progress bars
│   ├── Projects.jsx       # Portfolio showcase with filters
│   ├── Contact.jsx        # Contact form with PHP backend integration
│   └── Footer.jsx         # Footer with social links
├── assets/               # Static assets
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles and Tailwind imports

api/
├── contact.php           # PHP contact form handler
├── config.php           # Default configuration
├── config.local.example.php # Configuration template
├── .htaccess           # Apache configuration
├── test.php            # API testing script
├── test.html           # Manual testing interface
└── README.md           # API documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jakaria-istauk/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Set up the contact form backend (optional)**
   ```bash
   # Copy the configuration template
   cp api/config.local.example.php api/config.local.php

   # Edit the configuration with your SMTP settings
   # See api/README.md and api/SMTP_SETUP.md for detailed instructions
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `src/components/Hero.jsx` - Name, title, and bio
- `src/components/About.jsx` - Professional experience and background
- `src/components/Skills.jsx` - Technical skills and proficiency levels
- `src/components/Projects.jsx` - Portfolio projects and demos
- `src/components/Contact.jsx` - Contact information and social links

### Styling
- Tailwind CSS classes can be customized in `tailwind.config.js`
- Global styles are in `src/index.css`
- Component-specific styles use Tailwind utility classes

### Content
- Replace placeholder images with your own
- Update project links and descriptions
- Modify the color scheme by updating Tailwind configuration

## 🌟 Key Sections

### Hero Section
- Professional introduction with profile image
- Call-to-action buttons for projects and contact
- Smooth scroll indicators
- Palestine support banner (customizable)

### About Section
- Professional background and experience
- Work history with detailed descriptions
- Personal philosophy and approach

### Skills Section
- Categorized technical skills (Frontend, Backend, Tools)
- Animated progress bars showing proficiency levels
- Technologies currently learning

### Projects Section
- Filterable portfolio showcase
- Live demo and source code links
- Technology tags for each project
- Responsive grid layout

### Contact Section
- Functional contact form with PHP backend
- Server-side validation and email sending
- Rate limiting and security features
- Multiple contact methods
- Social media links
- Professional email and location

## 📧 Contact Form Setup

The portfolio includes a fully functional contact form with PHP backend. To enable it:

### Quick Setup
1. **Copy configuration template**
   ```bash
   cp api/config.local.example.php api/config.local.php
   ```

2. **Configure SMTP and recipient**
   ```php
   // In api/config.local.php
   'recipient_email' => 'your-email@domain.com',
   'allowed_origins' => ['https://yourdomain.com'],

   // SMTP settings (recommended)
   'use_smtp' => true,
   'smtp_host' => 'smtp.gmail.com',
   'smtp_username' => 'your-email@gmail.com',
   'smtp_password' => 'your-app-password',
   ```

3. **Deploy API folder**
   Upload the `api/` folder to your web server alongside your built React app.

4. **Test the setup**
   Visit `yoursite.com/api/test.html` to test the contact form.

### Development Testing
```bash
# Start PHP development server
cd api
php -S localhost:8000

# Update Contact.jsx API URL to http://localhost:8000/contact.php
```

For detailed setup instructions, see [api/README.md](api/README.md).

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About the Developer

**Mohammad Jakaria Istauk**
- 🌍 Based in Bangladesh
- 💼 WordPress Developer at WPDeveloper, Inc
- 🔧 6+ years of experience in web development
- 🌟 Open-source contributor to WordPress Core, Polyglots, and Photo Directory
- 📧 Contact: jakariamd35@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from Heroicons
- Images from Unsplash
- Built with React and Vite
- Styled with Tailwind CSS

---

⭐ **Star this repository if you found it helpful!**

📧 **Questions?** Feel free to reach out via [email](mailto:jakariamd35@gmail.com) or [LinkedIn](https://www.linkedin.com/in/jakariaistauk)

## Deploying

The site is published from the `gh-pages` branch, which holds build output
only — never edit it by hand.

```bash
npm run deploy
```

That builds and pushes to `gh-pages`, and GitHub Pages serves the result at
<https://jakaria-istauk.github.io/portfolio/> within a minute or so.

The script refuses to run with uncommitted changes, so every deploy matches a
commit you can point at. Commit your work first, then deploy.

### Custom domain

A project page is served from `/portfolio/`, so the build is given a matching
base path. To serve the site from the root of a domain instead:

```bash
BASE_PATH=/ npm run deploy
```

Add the domain to `public/CNAME` (one line, no protocol) so it survives each
deploy, and point the DNS at GitHub Pages.
