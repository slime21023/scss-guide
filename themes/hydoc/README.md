# Hydoc Theme

Hydoc is an educational documentation theme for Zola static site generator, based on the Hyde theme. It provides enhanced features specifically designed for technical education and documentation while maintaining Hyde's clean two-column layout.

## Features

### 🎨 Enhanced Visual Design
- Clean, educational-focused design with improved typography
- Educational color scheme optimized for readability
- Better spacing and visual hierarchy for learning materials
- Mobile-responsive design that works on all devices

### 💻 Code Presentation
- Enhanced syntax highlighting with dark theme colors for better readability
- Copy-to-clipboard functionality for code blocks
- Dark code blocks with professional styling and borders
- Improved inline code formatting with dark background

### 📚 Educational Elements
- Three types of callouts: tips (💡), warnings (⚠️), and important notes (❗)
- Enhanced page templates for educational content
- Section templates with learning path visualization
- Progress indicators and navigation aids

### 📱 Mobile Experience
- Responsive navigation with mobile toggle
- Touch-friendly interface elements
- Optimized typography for mobile reading
- Collapsible sidebar for small screens

### ⚡ Performance & Accessibility
- Minimal JavaScript with graceful degradation
- WCAG 2.1 AA compliant color contrast
- Semantic HTML structure
- Fast loading with optimized assets

## Installation

### 1. Add Theme to Your Project

Copy the `hydoc` theme to your Zola project's `themes/` directory:

```bash
# If using git submodules
git submodule add https://github.com/your-repo/hydoc themes/hydoc

# Or copy the theme directory directly
cp -r path/to/hydoc themes/hydoc
```

### 2. Update Configuration

Update your `config.toml` to use the hydoc theme:

```toml
theme = "hydoc"

# Basic site configuration
title = "Your Educational Site"
description = "Your site description"
base_url = "https://your-site.com"

[extra]
# Hyde inherited settings
hyde_sticky = true
hyde_reverse = false
hyde_theme = "theme-base-08"

# Navigation links
hyde_links = [
    { name = "Basics", url = "/basics/" },
    { name = "Advanced", url = "/advanced/" },
    { name = "Examples", url = "/examples/" },
]

# Hydoc specific settings
hydoc_enable_code_copy = true
hydoc_educational_colors = true
```

## Configuration Options

### Hyde Inherited Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `hyde_sticky` | boolean | `true` | Makes sidebar sticky on desktop |
| `hyde_reverse` | boolean | `false` | Reverses layout (sidebar on right) |
| `hyde_theme` | string | `"theme-base-08"` | Color theme (08-0f available) |
| `hyde_links` | array | `[]` | Navigation links in sidebar |

### Hydoc Specific Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `hydoc_enable_code_copy` | boolean | `true` | Enables copy buttons on code blocks |
| `hydoc_educational_colors` | boolean | `true` | Uses educational color scheme |

## Content Structure

### Page Front Matter

```yaml
+++
title = "Your Page Title"
description = "Page description for better SEO"
weight = 1
date = 2024-01-15

[extra]
# Optional: estimated reading time
estimated_time = "15 minutes"

# Optional: difficulty level
difficulty = "beginner"  # beginner, intermediate, advanced

# Optional: navigation (for page templates)
prev_page = "/previous-page/"
next_page = "/next-page/"
+++
```

### Section Front Matter

```yaml
+++
title = "Section Title"
description = "Section description"
sort_by = "weight"
template = "section.html"
page_template = "page.html"
weight = 1
+++
```

## Educational Features

### Callouts

Use HTML div elements with callout classes:

```html
<div class="callout tip">
This is a helpful tip for learners.
</div>

<div class="callout warning">
This is an important warning to pay attention to.
</div>

<div class="callout important">
This is critical information that must not be missed.
</div>
```

### Code Blocks

Standard Markdown code blocks work automatically:

````markdown
```scss
$primary-color: #3498db;
$font-size: 16px;

.button {
  background-color: $primary-color;
  font-size: $font-size;
}
```
````

Copy buttons are automatically added when JavaScript is enabled.

### Navigation

The theme provides enhanced navigation:

- **Sidebar Navigation**: Automatically highlights current section
- **Page Navigation**: Next/previous links at bottom of pages
- **Mobile Navigation**: Responsive toggle for mobile devices

## Customization

### Colors

Modify the educational color scheme in `sass/_educational.scss`:

```scss
:root {
  --edu-primary: #2c3e50;      /* Main text color */
  --edu-secondary: #3498db;    /* Links and accents */
  --edu-accent: #e74c3c;       /* Important highlights */
  --edu-success: #27ae60;      /* Success states */
  --edu-warning: #f39c12;      /* Warning states */
  --edu-info: #3498db;         /* Info states */
}
```

### Typography

Adjust typography variables:

```scss
:root {
  --edu-line-height: 1.6;
  --edu-paragraph-spacing: 1.2em;
  --edu-heading-spacing: 1.5em;
}
```

### JavaScript

Customize JavaScript behavior by modifying `static/js/enhancements.js`:

- Change copy button text
- Adjust mobile breakpoints
- Modify search highlighting colors
- Customize animation timings

## Browser Support

- **Modern Browsers**: Full functionality with all enhancements
- **Older Browsers**: Graceful degradation, core functionality maintained
- **No JavaScript**: All content remains accessible and functional

## Performance

- **CSS**: ~15KB minified
- **JavaScript**: ~10KB minified
- **Build Time**: Optimized for fast Zola builds
- **Loading**: Progressive enhancement ensures fast initial render

## Accessibility

- **WCAG 2.1 AA**: Compliant color contrast ratios
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Respects user preferences

## Development

### Building

```bash
# Development server
zola serve

# Production build
zola build

# Check for issues
zola check
```

### File Structure

```
themes/hydoc/
├── sass/
│   ├── hydoc.scss          # Main theme styles
│   ├── poole.scss          # Base styles (from Hyde)
│   ├── print.scss          # Print styles
│   └── _educational.scss   # Educational enhancements
├── templates/
│   ├── index.html          # Base layout
│   ├── page.html           # Page template
│   └── section.html        # Section template
├── static/
│   └── js/
│       └── enhancements.js # JavaScript enhancements
├── theme.toml              # Theme configuration
├── README.md               # This file
├── CALLOUTS_USAGE.md       # Callout documentation
└── JAVASCRIPT_FEATURES.md  # JavaScript documentation
```

## Troubleshooting

### Common Issues

**Copy buttons not appearing:**
- Ensure `hydoc_enable_code_copy = true` in config
- Check that HTTPS is used (required for Clipboard API)
- Verify JavaScript is enabled

**Styles not loading:**
- Confirm `theme = "hydoc"` in config.toml
- Check that theme files are in correct directory
- Verify Zola build completes without errors

**Mobile navigation not working:**
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify screen width triggers mobile breakpoint

### Getting Help

1. Check the documentation files in the theme directory
2. Verify your configuration matches the examples
3. Test with a minimal setup to isolate issues
4. Check browser developer tools for errors

## Contributing

This theme is based on the excellent Hyde theme. When contributing:

1. Maintain compatibility with existing Hyde configurations
2. Follow the educational focus and simplicity principles
3. Ensure accessibility standards are met
4. Test across different browsers and devices
5. Update documentation for any new features

## Credits

- **Original Hyde Theme**: [Mark Otto](https://github.com/mdo) and [Vincent Prouillet](https://github.com/Keats)
- **Hydoc Enhancements**: Educational features and improvements
- **Zola**: Static site generator by [Vincent Prouillet](https://github.com/Keats)

## License

MIT License - same as the original Hyde theme.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```