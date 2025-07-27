# Hydoc Theme Quick Start Guide

Get up and running with the Hydoc theme in minutes!

## 🚀 Quick Setup

### 1. Install Zola

If you haven't already, install Zola:

```bash
# macOS
brew install zola

# Windows
scoop install zola

# Linux
snap install --edge zola
```

### 2. Create New Site

```bash
zola init my-educational-site
cd my-educational-site
```

### 3. Add Hydoc Theme

```bash
# Create themes directory
mkdir themes

# Copy hydoc theme (replace with actual path)
cp -r path/to/hydoc themes/hydoc
```

### 4. Configure Theme

Edit `config.toml`:

```toml
theme = "hydoc"
title = "My Learning Site"
description = "Educational content made easy"
base_url = "https://my-site.com"

[extra]
hyde_sticky = true
hyde_theme = "theme-base-08"
hydoc_enable_code_copy = true

hyde_links = [
    { name = "Home", url = "/" },
    { name = "Tutorials", url = "/tutorials/" },
    { name = "Examples", url = "/examples/" },
]
```

### 5. Create Content

Create your first educational content:

```bash
mkdir content/tutorials
```

Create `content/tutorials/_index.md`:

```yaml
+++
title = "Tutorials"
description = "Step-by-step learning guides"
sort_by = "weight"
template = "section.html"
+++

# Tutorials

Welcome to our tutorial section! Here you'll find step-by-step guides to help you learn.
```

Create `content/tutorials/getting-started.md`:

```yaml
+++
title = "Getting Started"
description = "Your first steps into the topic"
weight = 1
date = 2024-01-15

[extra]
difficulty = "beginner"
estimated_time = "10 minutes"
+++

# Getting Started

Welcome to your first tutorial!

<div class="callout tip">
This is a helpful tip to get you started on the right track.
</div>

## Your First Code Example

Here's a simple example:

```javascript
function hello() {
    console.log("Hello, world!");
}

hello();
```

<div class="callout important">
Remember to practice what you learn!
</div>
```

### 6. Test Your Site

```bash
# Start development server
zola serve

# Open http://127.0.0.1:1111 in your browser
```

## 🎨 Customization

### Change Colors

Edit your `config.toml` to use different color themes:

```toml
[extra]
hyde_theme = "theme-base-0d"  # Blue theme
# Options: theme-base-08 (red) through theme-base-0f (brown)
```

### Add More Navigation

```toml
[extra]
hyde_links = [
    { name = "Home", url = "/" },
    { name = "Basics", url = "/basics/" },
    { name = "Advanced", url = "/advanced/" },
    { name = "Examples", url = "/examples/" },
    { name = "FAQ", url = "/faq/" },
]
```

### Enable All Features

```toml
[extra]
hyde_sticky = true
hyde_theme = "theme-base-08"
hydoc_enable_code_copy = true
hydoc_educational_colors = true
```

## 📚 Content Tips

### Use Educational Callouts

```html
<!-- Tips for helpful information -->
<div class="callout tip">
Pro tip: This will save you time!
</div>

<!-- Warnings for important cautions -->
<div class="callout warning">
Be careful with this approach in production.
</div>

<!-- Important for critical information -->
<div class="callout important">
This is essential knowledge you must understand.
</div>
```

### Add Learning Metadata

```yaml
+++
title = "Advanced Concepts"
description = "Deep dive into complex topics"
weight = 3

[extra]
difficulty = "advanced"        # beginner, intermediate, advanced
estimated_time = "45 minutes"  # Help learners plan their time
prerequisites = ["basics"]     # What they should know first
+++
```

### Structure Your Content

Organize content in logical sections:

```
content/
├── _index.md              # Homepage
├── basics/
│   ├── _index.md          # Basics section
│   ├── introduction.md    # First topic
│   └── fundamentals.md    # Second topic
├── advanced/
│   ├── _index.md          # Advanced section
│   └── expert-tips.md     # Advanced topic
└── examples/
    ├── _index.md          # Examples section
    └── real-world.md      # Practical examples
```

## 🔧 Development Workflow

### Daily Development

```bash
# Start development server
zola serve

# In another terminal, make changes to content
# The server will automatically reload
```

### Before Publishing

```bash
# Check for issues
zola check

# Build production version
zola build

# Test the built site
cd public && python -m http.server 8000
```

## 📱 Mobile Testing

Test your site on mobile devices:

1. **Chrome DevTools**: Use device emulation
2. **Real Devices**: Test on actual phones/tablets
3. **Responsive Features**: Verify navigation toggle works
4. **Touch Interactions**: Ensure buttons are touch-friendly

## 🚀 Deployment

### Static Hosting

Deploy to any static hosting service:

```bash
# Build for production
zola build

# Deploy the 'public' directory to:
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3
# - Any static host
```

### Netlify Example

Create `netlify.toml`:

```toml
[build]
publish = "public"
command = "zola build"

[build.environment]
ZOLA_VERSION = "0.17.2"

[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "DENY"
X-XSS-Protection = "1; mode=block"
```

## 🎯 Next Steps

### Enhance Your Site

1. **Add More Content**: Create comprehensive tutorials
2. **Customize Styling**: Modify colors and typography
3. **Add Images**: Include diagrams and screenshots
4. **Create Examples**: Provide practical code examples
5. **Test Accessibility**: Ensure your content is accessible

### Advanced Features

1. **Search**: Enable Zola's search functionality
2. **Analytics**: Add privacy-friendly analytics
3. **Comments**: Consider adding a comment system
4. **Multilingual**: Support multiple languages

### Community

1. **Share Your Site**: Show off your educational content
2. **Contribute**: Help improve the theme
3. **Feedback**: Report issues and suggest improvements

## 🆘 Troubleshooting

### Common Issues

**Site not loading:**
- Check `theme = "hydoc"` in config.toml
- Verify theme files are in `themes/hydoc/`
- Run `zola check` for errors

**Styles not working:**
- Ensure `compile_sass = true` in config.toml
- Check for SCSS syntax errors
- Verify theme files are complete

**JavaScript not working:**
- Check browser console for errors
- Ensure `hydoc_enable_code_copy = true`
- Test with HTTPS (required for clipboard)

### Getting Help

1. **Documentation**: Read the full README.md
2. **Configuration**: Check CONFIGURATION.md
3. **Examples**: Look at existing implementations
4. **Community**: Ask questions in relevant forums

## 🎉 You're Ready!

You now have a fully functional educational site with:

- ✅ Clean, professional design
- ✅ Mobile-responsive layout
- ✅ Code syntax highlighting
- ✅ Copy-to-clipboard functionality
- ✅ Educational callouts
- ✅ Accessible design
- ✅ Fast performance

Start creating amazing educational content! 🚀