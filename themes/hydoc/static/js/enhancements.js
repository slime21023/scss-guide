/**
 * Hydoc Theme JavaScript Enhancements
 * 
 * Minimal JavaScript enhancements for educational content
 * All features degrade gracefully if JavaScript is disabled
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        initCodeCopyButtons();
        initSearchHighlighting();
        initSmoothScrolling();
        initMobileNavigation();
    }
    
    /**
     * Add copy-to-clipboard functionality to code blocks
     */
    function initCodeCopyButtons() {
        // Only proceed if clipboard API is supported
        if (!navigator.clipboard) {
            return;
        }
        
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(function(codeBlock) {
            const pre = codeBlock.parentElement;
            
            // Skip if copy button already exists
            if (pre.querySelector('.code-copy-btn')) {
                return;
            }
            
            // Create copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'code-copy-btn';
            copyButton.textContent = '複製';
            copyButton.setAttribute('aria-label', '複製代碼');
            copyButton.setAttribute('type', 'button');
            
            // Add click handler
            copyButton.addEventListener('click', function() {
                copyCodeToClipboard(codeBlock, copyButton);
            });
            
            // Add button to pre element
            pre.style.position = 'relative';
            pre.appendChild(copyButton);
        });
    }
    
    /**
     * Copy code content to clipboard
     */
    function copyCodeToClipboard(codeElement, button) {
        const code = codeElement.textContent || codeElement.innerText;
        
        navigator.clipboard.writeText(code).then(function() {
            // Show success feedback
            const originalText = button.textContent;
            button.textContent = '已複製!';
            button.style.backgroundColor = '#27ae60';
            
            // Reset button after 2 seconds
            setTimeout(function() {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }).catch(function(err) {
            console.warn('Failed to copy code:', err);
            
            // Fallback: show error message
            const originalText = button.textContent;
            button.textContent = '複製失敗';
            button.style.backgroundColor = '#e74c3c';
            
            setTimeout(function() {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        });
    }
    
    /**
     * Highlight search results if search is enabled
     */
    function initSearchHighlighting() {
        // Check if there's a search query in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q') || urlParams.get('search');
        
        if (!searchQuery) {
            return;
        }
        
        // Highlight search terms in content
        highlightSearchTerms(searchQuery);
    }
    
    /**
     * Highlight search terms in the page content
     */
    function highlightSearchTerms(query) {
        const content = document.querySelector('.content');
        if (!content) {
            return;
        }
        
        const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
        
        terms.forEach(function(term) {
            highlightTerm(content, term);
        });
    }
    
    /**
     * Highlight a specific term in the content
     */
    function highlightTerm(container, term) {
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip script and style elements
                    const parent = node.parentElement;
                    if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(function(textNode) {
            const text = textNode.textContent;
            const regex = new RegExp('(' + escapeRegExp(term) + ')', 'gi');
            
            if (regex.test(text)) {
                const highlightedHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
                const wrapper = document.createElement('span');
                wrapper.innerHTML = highlightedHTML;
                textNode.parentNode.replaceChild(wrapper, textNode);
            }
        });
    }
    
    /**
     * Escape special regex characters
     */
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    /**
     * Add smooth scrolling to anchor links
     */
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }
    
    /**
     * Enhanced mobile navigation
     */
    function initMobileNavigation() {
        // Add mobile menu toggle if needed
        if (window.innerWidth <= 768) {
            addMobileMenuToggle();
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                addMobileMenuToggle();
            } else {
                removeMobileMenuToggle();
            }
        });
    }
    
    /**
     * Add mobile menu toggle functionality
     */
    function addMobileMenuToggle() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar || sidebar.querySelector('.mobile-menu-toggle')) {
            return;
        }
        
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.innerHTML = '☰';
        toggleButton.setAttribute('aria-label', '切換導航選單');
        toggleButton.setAttribute('type', 'button');
        
        // Add toggle functionality
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-open');
            document.body.classList.toggle('sidebar-open');
        });
        
        // Add button to sidebar
        sidebar.insertBefore(toggleButton, sidebar.firstChild);
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && sidebar.classList.contains('sidebar-open')) {
                sidebar.classList.remove('sidebar-open');
                document.body.classList.remove('sidebar-open');
            }
        });
    }
    
    /**
     * Remove mobile menu toggle
     */
    function removeMobileMenuToggle() {
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        if (toggleButton) {
            toggleButton.remove();
        }
        
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('sidebar-open');
        }
        
        document.body.classList.remove('sidebar-open');
    }
    
    /**
     * Add CSS for search highlighting
     */
    function addSearchHighlightCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .search-highlight {
                background-color: #fff3cd;
                color: #856404;
                padding: 0.1em 0.2em;
                border-radius: 2px;
                font-weight: bold;
            }
            
            .mobile-menu-toggle {
                display: none;
                position: fixed;
                top: 1rem;
                right: 1rem;
                z-index: 1001;
                background: var(--edu-secondary, #3498db);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 0.5rem;
                font-size: 1.2rem;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block;
                }
                
                .sidebar-open {
                    overflow: hidden;
                }
                
                .sidebar.sidebar-open {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1000;
                    overflow-y: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add CSS when script loads
    addSearchHighlightCSS();
    
})();