# Tech Summit 2025 - Event Documentation Site

A sleek, modern Hugo-based documentation site for event management featuring beautiful design, comprehensive information, and smooth user experience.

## 🌟 Features

✨ **Modern & Sleek Design**
- Beautiful gradient-based UI with purple and orange accents
- Smooth transitions and hover effects
- Responsive layout for all devices
- Dark-themed navigation with contrast

📱 **Comprehensive Event Information**
- Getting Started guide
- Full event schedule with 3 days of programming
- Speaker bios and keynotes
- Detailed venue information with directions
- Extensive FAQ section

🎯 **User Experience**
- Fast loading with Hugo's static generation
- Search functionality
- Table of contents for easy navigation
- Mobile-friendly responsive design
- Live reload during development

## 📂 Project Structure

```
event-docs/
├── content/
│   ├── _index.md              # Home page
│   └── docs/
│       ├── getting-started/    # Getting started guide
│       ├── schedule/           # Event schedule
│       ├── speakers/           # Speaker information
│       ├── venue/              # Venue details
│       └── faq/                # FAQ section
├── static/
│   └── custom.css             # Custom styling
├── layouts/
│   └── partials/              # Custom layouts
├── themes/
│   └── hugo-book/             # Book theme (submodule)
└── hugo.toml                  # Site configuration
```

## 🚀 Getting Started

### Prerequisites
- Hugo (Extended version) - [Install Hugo](https://gohugo.io/installation/)
- Git

### Installation

```bash
# Clone or navigate to the site
cd event-docs

# Start the development server
hugo server --port 1313
```

The site will be available at `http://localhost:1313/`

### Building for Production

```bash
# Generate static files
hugo

# Output will be in the 'public/' directory
```

## 📝 Customization

### Colors & Theme

Edit `static/custom.css` to customize colors:

```css
:root {
  --primary-color: #0066cc;      /* Main blue */
  --accent-color: #ff6b35;       /* Orange accent */
  --dark-bg: #0a0e27;           /* Dark background */
}
```

### Site Title & Base URL

Edit `hugo.toml`:

```toml
baseURL = 'https://yourdomain.com/'
title = 'Your Event Name'
```

### Navigation Menu

Add or modify menu items in `hugo.toml`:

```toml
[[menu.before]]
  identifier = "home"
  name = "🏠 Home"
  url = "/"
  weight = 1
```

## 📄 Adding Content

### Create a New Page

```bash
hugo new docs/section/page-name.md
```

### Add to Navigation

Edit the new file's front matter:

```yaml
---
title: Page Title
weight: 5
---
```

The `weight` parameter determines the menu order (lower numbers appear first).

## 🎨 Styling Guide

### Headings
- `# H1` - Large titles with accent underline
- `## H2` - Section headers with accent border

### Tables
- Formatted with gradient header
- Hover effects for rows
- Shadow effects for depth

### Links
- Styled in primary blue color
- Orange on hover
- Underline effect

### Code Blocks
- Dark background with syntax highlighting
- Inline code with colored background

## 📊 Content Sections

### 1. Getting Started
- Registration information
- Accommodation options
- Transportation details
- What to bring
- Pro tips

### 2. Schedule
- 3-day event schedule
- Multiple tracks
- Workshop details
- Keynote information

### 3. Speakers
- Keynote speaker bios
- Workshop leaders
- Panel discussions
- Networking opportunities

### 4. Venue
- Location and directions
- Transportation options
- Parking information
- Facilities and amenities
- Floor plan

### 5. FAQ
- Registration questions
- Schedule inquiries
- Travel & accommodation
- Technical support
- Contact information

## 🔧 Deployment Options

### Netlify
```bash
# Connect your GitHub repo
# Select hugo as build command
# Set publish directory to: public
```

### GitHub Pages
```bash
# Push to GitHub
# Enable Pages in repository settings
# Select main branch
```

### Traditional Hosting
```bash
# Build the site
hugo

# Upload 'public' directory to your web server
scp -r public/ user@yourhost:/var/www/html/
```

## 🎯 Customization Tips

1. **Add Event Logo**: Place logo in `static/` and reference in CSS
2. **Customize Colors**: Modify `--primary-color` and `--accent-color` in `custom.css`
3. **Add Team Information**: Create new section in `content/docs/`
4. **Update Contact**: Edit contact info in `hugo.toml`

## 📱 Mobile Optimization

The site is fully responsive with:
- Mobile navigation drawer
- Touch-friendly buttons
- Optimized table display
- Fast loading on slow connections

## 🔍 SEO Features

- Semantic HTML
- Meta tags support
- Sitemap generation
- RSS feed support
- Fast page load times

## 🤝 Theme Attribution

This site uses the [Hugo Book Theme](https://github.com/alex-shpak/hugo-book) by Alex Shpak.

## 📄 License

Feel free to use this as a template for your own event documentation!

## 🆘 Support

For Hugo documentation: https://gohugo.io/documentation/  
For Theme documentation: https://github.com/alex-shpak/hugo-book

---

**Ready to run?** Execute `hugo server` and visit `http://localhost:1313/` 🚀
