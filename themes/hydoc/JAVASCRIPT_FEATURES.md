# JavaScript Enhancements

The hydoc theme includes minimal JavaScript enhancements that improve the educational experience while maintaining graceful degradation.

## Features

### 1. Code Copy Functionality
- **Purpose**: Allows users to easily copy code examples
- **Activation**: Automatically adds copy buttons to all `<pre><code>` blocks
- **Requirements**: Modern browser with Clipboard API support
- **Fallback**: Buttons are not shown if Clipboard API is unavailable

**Usage**: Click the "複製" button that appears in the top-right corner of code blocks.

### 2. Search Result Highlighting
- **Purpose**: Highlights search terms when users arrive from search
- **Activation**: Automatically detects `?q=` or `?search=` URL parameters
- **Requirements**: JavaScript enabled
- **Fallback**: Search still works without highlighting

**Usage**: Automatic - no user interaction required.

### 3. Smooth Scrolling
- **Purpose**: Provides smooth scrolling for anchor links
- **Activation**: Automatically applies to all `href="#..."` links
- **Requirements**: Modern browser with `scrollIntoView` support
- **Fallback**: Standard jump scrolling

**Usage**: Click any anchor link (table of contents, etc.)

### 4. Mobile Navigation Enhancement
- **Purpose**: Improves mobile navigation experience
- **Activation**: Automatically on screens ≤ 768px width
- **Requirements**: JavaScript enabled
- **Fallback**: Standard responsive sidebar

**Features**:
- Mobile menu toggle button (☰)
- Overlay navigation
- Click-outside-to-close functionality

## Configuration

Enable JavaScript enhancements in your `config.toml`:

```toml
[extra]
hydoc_enable_code_copy = true
```

## Browser Support

- **Modern browsers**: Full functionality
- **Older browsers**: Graceful degradation
- **No JavaScript**: All content remains accessible

## Performance

- **File size**: ~4KB minified
- **Loading**: Deferred until DOM ready
- **Impact**: Minimal - only enhances existing functionality

## Accessibility

- **Keyboard navigation**: All interactive elements are keyboard accessible
- **Screen readers**: Proper ARIA labels and semantic HTML
- **High contrast**: Works with system high contrast modes
- **Reduced motion**: Respects `prefers-reduced-motion` settings

## Technical Details

### Code Copy Implementation
```javascript
// Checks for Clipboard API support
if (!navigator.clipboard) {
    return; // Graceful degradation
}

// Adds copy buttons to code blocks
navigator.clipboard.writeText(code).then(success, error);
```

### Search Highlighting
```javascript
// Extracts search terms from URL
const searchQuery = urlParams.get('q') || urlParams.get('search');

// Highlights terms in content
highlightTerm(content, term);
```

### Mobile Navigation
```javascript
// Responsive toggle based on screen size
if (window.innerWidth <= 768) {
    addMobileMenuToggle();
}
```

## Customization

The JavaScript can be customized by modifying `themes/hydoc/static/js/enhancements.js`. Key areas for customization:

1. **Copy button text**: Change `'複製'` and `'已複製!'`
2. **Mobile breakpoint**: Modify `768px` threshold
3. **Highlight colors**: Adjust `.search-highlight` CSS
4. **Animation timing**: Modify transition durations

## Troubleshooting

### Copy buttons not appearing
- Check if Clipboard API is supported: `navigator.clipboard`
- Ensure HTTPS (required for Clipboard API)
- Verify JavaScript is enabled

### Search highlighting not working
- Check URL contains search parameters (`?q=term`)
- Ensure content has `.content` class
- Verify JavaScript is enabled

### Mobile menu not working
- Check screen width is ≤ 768px
- Ensure JavaScript is enabled
- Verify sidebar has `.sidebar` class