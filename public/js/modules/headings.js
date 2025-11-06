/**
 * Headings Module
 * Handles heading link generation and copy-to-clipboard functionality
 */
import { Toast } from './toast.js';

export class Headings {
    constructor(toast) {
        this.toast = toast || new Toast();
        this.headings = null;
        this.init();
    }

    init() {
        // Check if DOM is already loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupHeadings();
            });
        } else {
            // DOM already loaded
            this.setupHeadings();
        }
    }

    /**
     * Setup heading links for all headings
     */
    setupHeadings() {
        // Wait a bit for sections to be fully rendered
        setTimeout(() => {
            this.headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            
            // Filter out headings that already have links
            this.headings.forEach(heading => {
                // Skip if already has a heading link
                if (heading.querySelector('.heading-link')) {
                    return;
                }
                
                // Generate ID if not exists
                if (!heading.id) {
                    heading.id = this.generateId(heading.textContent);
                }

                // Create link element
                const link = this.createHeadingLink(heading);
                heading.appendChild(link);
            });
            
            console.log(`✅ Setup ${this.headings.length} heading links`);
        }, 500); // Wait 500ms for sections to render
    }

    /**
     * Generate ID from text content
     * @param {string} text - Heading text
     * @returns {string} Generated ID
     */
    generateId(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    /**
     * Create heading link element
     * @param {HTMLElement} heading - Heading element
     * @returns {HTMLElement} Link element
     */
    createHeadingLink(heading) {
        const link = document.createElement('a');
        link.className = 'heading-link';
        link.innerHTML = '🔗';
        link.title = 'Copy link to clipboard';
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.copyHeadingLink(heading.id);
        });

        return link;
    }

    /**
     * Copy heading link to clipboard
     * @param {string} headingId - Heading ID
     */
    async copyHeadingLink(headingId) {
        // Get full URL
        const url = `${window.location.origin}${window.location.pathname}#${headingId}`;
        
        try {
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
                this.toast.show('📋 Link copied to clipboard!');
                console.log('✅ Copied to clipboard:', url);
            } else {
                // Fallback for older browsers
                this.fallbackCopy(url);
            }
        } catch (err) {
            console.error('Failed to copy link:', err);
            // Fallback for older browsers or if clipboard API fails
            this.fallbackCopy(url);
        }
    }

    /**
     * Fallback copy method for older browsers
     * @param {string} text - Text to copy
     */
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.style.opacity = '0';
        textArea.style.zIndex = '-1';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.toast.show('📋 Link copied to clipboard!');
                console.log('✅ Copied to clipboard (fallback):', text);
            } else {
                throw new Error('execCommand failed');
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            this.toast.show('❌ Failed to copy link. Please copy manually.');
            // Show URL in alert as last resort
            alert(`Copy this link:\n${text}`);
        } finally {
            document.body.removeChild(textArea);
        }
    }

    /**
     * Get all headings
     * @returns {NodeList} All heading elements
     */
    getAllHeadings() {
        return this.headings || document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    }
}

