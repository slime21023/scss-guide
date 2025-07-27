# Hydoc Theme Configuration Guide

This guide provides detailed information about configuring the Hydoc theme for optimal educational content presentation.

## Basic Configuration

### Minimal config.toml

```toml
theme = "hydoc"
title = "Your Educational Site"
description = "Your site description"
base_url = "https://your-site.com"
default_language = "en"

[extra]
hyde_sticky = true
hyde_theme = "theme-base-08"
hydoc_enable_code_copy = true
```

### Complete config.toml

```toml
# Basic site settings
theme = "hydoc"
title = "SCSS Learning Guide"
description = "Comprehensive SCSS tutorial from basics to advanced"
base_url = "https://scss-guide.example.com"
default_language = "zh-tw"  # or "en" for English

# Build settings
compile_sass = true
minify_html = true
generate_feed = true
feed_filename = "atom.xml"

# Markdown settings
[markdown]
highlight_code = true
highlight_theme = "base16-ocean-dark"
render_emoji = true
external_links_target_blank = true
external_links_no_follow = true
external_links_no_referrer = true
smart_punctuation = true

[extra]
# Hyde inherited settings
hyde_sticky = true          # Sticky sidebar on desktop
hyde_reverse = false        # Sidebar on left (true for right)
hyde_theme = "theme-base-08" # Color theme

# Navigation links
hyde_links = [
    { name = "Basics", url = "/basics/" },
    { name = "Organization", url = "/organization/" },
    { name = "Advanced", url = "/advanced/" },
    { name = "Patterns", url = "/patterns/" },
    { name = "Best Practices", url = "/best-practices/" },
    { name = "Examples", url = "/examples/" },
]

# Hydoc specific settings
hydoc_enable_code_copy = true
hydoc_educational_colors = true

# SEO and metadata
keywords = ["SCSS", "Sass", "CSS", "Tutorial", "Education"]
author = "Your Name"
```

## Theme Color Options

The `hyde_theme` setting controls the sidebar and accent colors:

| Theme | Color | Description |
|-------|-------|-------------|
| `theme-base-08` | Red | Default, good for technical content |
| `theme-base-09` | Orange | Warm, friendly for tutorials |
| `theme-base-0a` | Yellow | Bright, attention-grabbing |
| `theme-base-0b` | Green | Natural, calming for learning |
| `theme-base-0c` | Cyan | Cool, modern for tech content |
| `theme-base-0d` | Blue | Professional, trustworthy |
| `theme-base-0e` | Magenta | Creative, distinctive |
| `theme-base-0f` | Brown | Warm, traditional |

## Navigation Configuration

### Sidebar Links

Configure navigation links in the `hyde_links` array:

```toml
[extra]
hyde_links = [
    { name = "Home", url = "/" },
    { name = "Getting Started", url = "/getting-started/" },
    { name = "Tutorials", url = "/tutorials/" },
    { name = "Reference", url = "/reference/" },
    { name = "Examples", url = "/examples/" },
    { name = "FAQ", url = "/faq/" },
]
```

### Hierarchical Navigation

For complex sites, organize content in sections:

```
content/
├── _index.md
├── basics/
│   ├── _index.md
│   ├── variables.md
│   └── nesting.md
├── advanced/
│   ├── _index.md
│   ├── functions.md
│   └── mixins.md
└── examples/
    ├── _index.md
    └── portfolio.md
```

## Content Configuration

### Page Templates

Use different templates for different content types:

```yaml
+++
title = "SCSS Variables"
description = "Learn about SCSS variables"
template = "page.html"  # Default page template
weight = 1
+++
```

### Section Configuration

Configure sections for better organization:

```yaml
+++
title = "Basic Concepts"
description = "Fundamental SCSS concepts"
sort_by = "weight"
template = "section.html"
page_template = "page.html"
weight = 1
+++
```

### Educational Metadata

Add educational metadata to pages:

```yaml
+++
title = "Advanced Functions"
description = "Deep dive into SCSS functions"
weight = 3

[extra]
difficulty = "advanced"        # beginner, intermediate, advanced
estimated_time = "30 minutes"  # Reading time estimate
prerequisites = ["basics", "mixins"]  # Required knowledge
next_page = "/advanced/control-directives/"
prev_page = "/advanced/maps/"
+++
```

## JavaScript Configuration

### Enabling Features

Control JavaScript features through configuration:

```toml
[extra]
# Enable/disable code copy functionality
hydoc_enable_code_copy = true

# Enable educational color enhancements
hydoc_educational_colors = true
```

### Feature Detection

The theme automatically detects browser capabilities:

- **Clipboard API**: Copy buttons only appear if supported
- **Modern CSS**: Uses CSS custom properties with fallbacks
- **Touch Support**: Mobile navigation adapts to touch devices

## Customization Options

### CSS Variables

Override educational colors in your custom CSS:

```css
:root {
  --edu-primary: #1a202c;      /* Darker text for better contrast */
  --edu-secondary: #2b6cb0;    /* Custom blue for links */
  --edu-accent: #c53030;       /* Custom red for warnings */
}
```

### Typography Customization

Adjust typography for your content:

```css
:root {
  --edu-line-height: 1.7;      /* More spacing for dense content */
  --edu-paragraph-spacing: 1.5em;  /* Larger paragraph gaps */
  --edu-heading-spacing: 2em;  /* More space above headings */
}
```

### Code Block Customization

The theme uses a dark code theme by default for better readability. Customize code presentation:

```css
/* Code block dark theme colors */
:root {
  --edu-code-bg: #2d3748;      /* Dark background */
  --edu-code-border: #4a5568;  /* Border color */
  --edu-code-text: #e2e8f0;    /* Light text */
  --edu-code-keyword: #f56565; /* Keywords (red) */
  --edu-code-string: #68d391;  /* Strings (green) */
  --edu-code-comment: #cbd5e0; /* Comments (light gray) */
  --edu-code-number: #63b3ed;  /* Numbers (blue) */
}

/* Customize code block appearance */
pre {
  font-size: 0.85em;           /* Smaller code text */
  line-height: 1.3;            /* Tighter line spacing */
  border-radius: 8px;          /* More rounded corners */
}

.code-copy-btn {
  background: #4a5568;         /* Custom button color */
  font-size: 0.75em;           /* Smaller button text */
}
```

## Performance Configuration

### Build Optimization

Optimize for production builds:

```toml
# Enable minification
minify_html = true

# Optimize Sass compilation
compile_sass = true

# Generate search index if needed
build_search_index = false  # Only enable if using search
```

### Asset Optimization

The theme is optimized for performance:

- **CSS**: Compiled and minified SCSS
- **JavaScript**: Minimal, progressive enhancement
- **Images**: Use optimized formats (WebP, AVIF when possible)
- **Fonts**: Preload critical fonts

## Accessibility Configuration

### Language Settings

Set appropriate language for accessibility:

```toml
default_language = "en"  # or "zh-tw", "ja", etc.
```

### Color Contrast

The theme meets WCAG 2.1 AA standards by default. For AAA compliance, use high contrast colors:

```css
:root {
  --edu-primary: #000000;      /* Pure black text */
  --edu-secondary: #0066cc;    /* High contrast blue */
  --edu-accent: #cc0000;       /* High contrast red */
}
```

## Multi-language Configuration

### Basic Multi-language Setup

```toml
default_language = "en"

[languages.en]
title = "Educational Site"
description = "Learn with us"

[languages.zh-tw]
title = "教育網站"
description = "與我們一起學習"

[languages.ja]
title = "教育サイト"
description = "一緒に学びましょう"
```

### Language-specific Navigation

```toml
[languages.en.extra]
hyde_links = [
    { name = "Basics", url = "/basics/" },
    { name = "Advanced", url = "/advanced/" },
]

[languages.zh-tw.extra]
hyde_links = [
    { name = "基礎", url = "/basics/" },
    { name = "進階", url = "/advanced/" },
]
```

## Development Configuration

### Development Settings

For development, use these settings:

```toml
# Faster builds during development
minify_html = false
compile_sass = true

# Enable drafts
build_drafts = true

# Serve drafts locally
serve_drafts = true
```

### Debug Mode

Enable debug features:

```toml
[extra]
# Show debug information
debug_mode = true

# Verbose JavaScript logging
js_debug = true
```

## Deployment Configuration

### Production Settings

For production deployment:

```toml
# Production URL
base_url = "https://your-domain.com"

# Enable optimizations
minify_html = true
compile_sass = true

# Disable development features
build_drafts = false
serve_drafts = false

# Enable feed generation
generate_feed = true
feed_filename = "atom.xml"
```

### CDN Configuration

If using a CDN, configure asset URLs:

```toml
# Use CDN for assets
base_url = "https://cdn.your-domain.com"

[extra]
# Custom asset paths
asset_base = "https://cdn.your-domain.com/assets/"
```

## Troubleshooting Configuration

### Common Configuration Issues

**Theme not loading:**
```toml
# Ensure correct theme name
theme = "hydoc"  # Not "hyde" or "hydoc-theme"
```

**JavaScript not working:**
```toml
[extra]
# Ensure JavaScript is enabled
hydoc_enable_code_copy = true
```

**Styles not applying:**
```toml
# Ensure Sass compilation is enabled
compile_sass = true
```

### Validation

Validate your configuration:

```bash
# Check configuration
zola check

# Test build
zola build

# Serve locally
zola serve
```

## Migration from Hyde

### Minimal Migration

To migrate from Hyde to Hydoc:

1. Change theme name:
```toml
# Before
theme = "hyde"

# After
theme = "hydoc"
```

2. Add Hydoc settings:
```toml
[extra]
# Keep existing Hyde settings
hyde_sticky = true
hyde_theme = "theme-base-08"

# Add Hydoc features
hydoc_enable_code_copy = true
hydoc_educational_colors = true
```

### Full Migration

For complete migration with all features:

1. Update configuration as shown above
2. Add educational metadata to content
3. Convert blockquotes to callouts where appropriate
4. Test all pages for proper rendering
5. Verify JavaScript features work correctly

The migration is designed to be seamless with existing Hyde content.