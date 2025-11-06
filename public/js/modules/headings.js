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
        this.headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        this.headings.forEach(heading => {
            // Generate ID if not exists
            if (!heading.id) {
                heading.id = this.generateId(heading.textContent);
            }

            // Create link element
            const link = this.createHeadingLink(heading);
            heading.appendChild(link);
        });
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
        const url = `${window.location.origin}${window.location.pathname}#${headingId}`;
        
        try {
            await navigator.clipboard.writeText(url);
            this.toast.show('📋 Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy link:', err);
            // Fallback for older browsers
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
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.toast.show('📋 Link copied to clipboard!');
        } catch (err) {
            console.error('Fallback copy failed:', err);
            this.toast.show('❌ Failed to copy link');
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Get all headings
     * @returns {NodeList} All heading elements
     */
    getAllHeadings() {
        return this.headings || document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    }
}

