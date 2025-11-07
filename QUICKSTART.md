# 🚀 Quick Start Guide

Get the Tech Summit 2025 event documentation site running in minutes!

## ⚡ 30-Second Setup

```bash
# Navigate to site directory
cd C:\work\hugo\event-docs

# Start development server
hugo server

# Open browser to
http://localhost:1313/
```

Done! You're running the site locally. ✨

---

## 📋 What You Get

### Pages Included
- ✅ **Homepage** - Welcome and quick links
- ✅ **Getting Started** - Registration, hotels, transportation tips
- ✅ **Schedule** - Full 3-day event agenda with tracks
- ✅ **Speakers** - Keynotes, workshops, panel discussions
- ✅ **Venue** - Location, parking, facilities, directions
- ✅ **FAQ** - Comprehensive Q&A section

### Design Features
- 🎨 Modern gradient-based UI (purple & orange)
- 📱 Fully responsive for mobile/tablet/desktop
- 🔍 Built-in search functionality
- ⚡ Lightning-fast static site generation
- 🎯 Professional typography and spacing
- 🌙 Dark navigation with light content area

---

## 🎯 Common Tasks

### Edit the Homepage

Edit: `content\_index.md`

```markdown
# Your Event Name

Welcome text here...

## Quick Links
- Link 1
- Link 2
```

### Update Event Details

Edit: `hugo.toml`

```toml
title = 'Your Event Name'
baseURL = 'https://yourdomain.com/'
```

### Add a New Section

```bash
# Create new page
hugo new docs/your-section/_index.md

# Edit the file and Hugo server auto-reloads
```

### Customize Colors

Edit: `static/custom.css`

```css
:root {
  --primary-color: #0066cc;      /* Your primary color */
  --accent-color: #ff6b35;       /* Your accent color */
}
```

### Change Navigation

Edit: `hugo.toml`

```toml
[[menu.before]]
  name = "Your Menu Item"
  url = "/your-page/"
  weight = 1
```

---

## 🔍 Project Structure

```
event-docs/
├── content/                  # All your content pages
│   ├── _index.md            # Homepage
│   └── docs/                # Documentation sections
│       ├── getting-started/
│       ├── schedule/
│       ├── speakers/
│       ├── venue/
│       └── faq/
├── static/
│   ├── custom.css           # Main styling
│   └── enhancements.css     # Additional styles
├── layouts/                 # Custom templates
├── themes/hugo-book/        # Theme files
├── public/                  # Generated site (ignore)
├── hugo.toml               # Site configuration
└── README.md               # Documentation
```

---

## 🎨 Customization Ideas

### Easy Wins
- [ ] Change site title in `hugo.toml`
- [ ] Update colors in `static/custom.css`
- [ ] Add your logo to `static/`
- [ ] Personalize welcome text in `content/_index.md`

### Medium Effort
- [ ] Create new documentation sections
- [ ] Add team member bios
- [ ] Customize navigation menu
- [ ] Add internal links between sections

### Advanced
- [ ] Integrate Google Analytics
- [ ] Add contact form
- [ ] Create custom page layouts
- [ ] Set up custom domain

---

## 📱 Testing

### Local Testing
```bash
# Start server with drafts visible
hugo server -D

# Test different viewport sizes
# Right-click → Inspect → Toggle device toolbar
```

### Production Build
```bash
# Create optimized build
hugo --minify

# Output is in 'public/' folder
# Ready to deploy!
```

---

## 🚀 Going Live

### Option 1: Netlify (Easiest)
1. Push to GitHub
2. Connect to Netlify
3. Auto-deploys on every commit

### Option 2: GitHub Pages
1. Push to GitHub
2. Enable Pages in settings
3. Live in minutes

### Option 3: Your Server
1. Build locally: `hugo --minify`
2. Upload `public/` folder
3. Point domain to server

[See DEPLOYMENT.md for full instructions]

---

## 🆘 Troubleshooting

**Site won't start**
```bash
# Check Hugo is installed
hugo version

# Make sure you're in right directory
cd event-docs

# Try again
hugo server
```

**Changes not showing**
- Stop server (Ctrl+C)
- Start again (hugo server)
- Hard refresh browser (Ctrl+Shift+R)

**Build errors**
- Check `hugo.toml` syntax
- Verify TOML formatting
- Review console output for details

**CSS not loading**
- Clear browser cache
- Check `static/` folder exists
- Verify CSS file names

---

## 📚 Learn More

- **Hugo Docs**: https://gohugo.io/
- **Theme Docs**: https://github.com/alex-shpak/hugo-book
- **Markdown Guide**: https://www.markdownguide.org/

---

## 💡 Pro Tips

1. **Use Hugo Shortcodes** for reusable content
2. **Organize content** with clear naming
3. **Test on mobile** before deployment
4. **Use version control** (Git) to track changes
5. **Keep backups** of important content
6. **Monitor analytics** after launch

---

## ✨ Next Steps

1. ✅ Run `hugo server`
2. ✅ Customize colors and title
3. ✅ Update event information
4. ✅ Test all pages
5. ✅ Deploy to your chosen platform

**Your awesome event site is ready to go!** 🎉

---

Need help? Check README.md or DEPLOYMENT.md for more details.
