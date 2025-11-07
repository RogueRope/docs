# Deployment Guide for Tech Summit 2025 Event Site

## 🚀 Quick Start

### 1. **Local Development**
```bash
cd event-docs
hugo server --port 1313
```
Visit `http://localhost:1313/`

### 2. **Build for Production**
```bash
hugo --minify
```
This creates optimized static files in the `public/` directory.

---

## 📦 Deployment Options

### Option A: Netlify (Recommended)

**Easiest deployment option with free hosting and HTTPS.**

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - **Build command**: `hugo --minify`
   - **Publish directory**: `public`
6. Click Deploy

**Benefits**: Automatic deployments on every commit, free SSL, CDN, preview URLs

---

### Option B: GitHub Pages

**Free hosting directly from GitHub.**

1. Create a GitHub repository named `yourusername.github.io`
2. Push your code
3. In repository settings → Pages:
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Select "/" (root) folder
4. Site will be available at `https://yourusername.github.io`

**Alternative**: Use GitHub Actions for automatic builds
- Create `.github/workflows/hugo.yml`
- Add Hugo build action
- Commits trigger automatic deployment

---

### Option C: Traditional Hosting

**Deploy to any web server (Apache, Nginx, etc.)**

1. Build the site:
```bash
hugo --minify
```

2. Upload to your server:
```bash
scp -r public/* user@yourserver.com:/var/www/html/
```

3. Ensure proper permissions:
```bash
chmod 755 /var/www/html -R
```

---

### Option D: Docker Deployment

**Containerized deployment for production.**

Create `Dockerfile`:
```dockerfile
FROM klakegg/hugo:latest as build
WORKDIR /app
COPY . .
RUN hugo --minify

FROM nginx:alpine
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t event-docs .
docker run -p 80:80 event-docs
```

---

## 🔧 Configuration for Production

### 1. Update `hugo.toml`

Change your domain:
```toml
baseURL = 'https://yourdomain.com/'
title = 'Tech Summit 2025'
```

### 2. Enable Analytics (Optional)

Add to `hugo.toml`:
```toml
[params]
  BookTheme = "auto"
  # Google Analytics
  BookFavicon = "/favicon.ico"
```

### 3. Add Custom Domain (if using Netlify/GitHub Pages)

1. Purchase domain from registrar (GoDaddy, Namecheap, etc.)
2. Point DNS to your hosting:
   - **Netlify**: Add CNAME in DNS settings
   - **GitHub Pages**: Add CNAME file to repository

---

## 🔐 Security Checklist

- ✅ Use HTTPS (automatic with Netlify/GitHub Pages)
- ✅ Remove sensitive info from repo
- ✅ Don't commit API keys or credentials
- ✅ Keep dependencies updated
- ✅ Review content for personal information
- ✅ Test external links regularly

---

## 📊 SEO Optimization

### 1. Add Sitemap

Hugo generates `sitemap.xml` automatically. Verify in your build output.

### 2. Submit to Search Engines

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

Add your sitemap: `https://yourdomain.com/sitemap.xml`

### 3. Meta Tags

Edit `hugo.toml`:
```toml
[params]
  description = "Tech Summit 2025 - Official Event Documentation"
  keywords = "tech summit, conference, event"
```

---

## 📈 Performance Monitoring

### Lighthouse Scores (Google)
1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your domain
3. Get performance recommendations

### Monitor with Tools
- Netlify Analytics (free with Netlify hosting)
- Google Analytics (add to site config)
- Cloudflare (free CDN with analytics)

---

## 🔄 Continuous Updates

### Update Content

1. Make changes locally
2. Test with `hugo server`
3. Push to GitHub
4. Deployment happens automatically

### Update Dependencies

Keep Hugo updated:
```bash
# Check version
hugo version

# Download latest from https://gohugo.io/installation/
```

---

## 🆘 Troubleshooting

### Site builds locally but not on hosting

1. Check Hugo version matches
2. Verify `hugo.toml` settings
3. Check build logs for errors
4. Ensure all content is committed

### Custom CSS not loading

1. Clear browser cache (Ctrl+Shift+Del)
2. Check file paths in `layouts/partials/docs/inject/head.html`
3. Verify files exist in `static/` directory

### Domain not working

1. Wait for DNS propagation (up to 48 hours)
2. Check CNAME/A record configuration
3. Test with `nslookup yourdomain.com`

---

## 📞 Support Resources

- **Hugo Docs**: https://gohugo.io/documentation/
- **Theme Docs**: https://github.com/alex-shpak/hugo-book
- **Netlify Docs**: https://docs.netlify.com/
- **GitHub Pages**: https://pages.github.com/

---

## ✨ Next Steps

1. **Customize**: Update colors, fonts, and branding
2. **Add Content**: Expand sections with more details
3. **Test**: Verify all links and responsive design
4. **Deploy**: Choose hosting and go live!
5. **Monitor**: Track analytics and user feedback

---

**Ready to deploy?** Follow one of the options above and your event site will be live! 🎉
