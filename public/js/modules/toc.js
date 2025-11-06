/**
 * Table of Contents Module
 * Handles floating TOC toggle and active section tracking
 */
export class TableOfContents {
    constructor() {
        this.tocElement = document.getElementById('floatingToc');
        this.toggleElement = document.getElementById('tocToggle');
        this.tocItems = null;
        this.sections = null;
        this.isCollapsed = false;
        
        this.init();
    }

    init() {
        if (!this.tocElement || !this.toggleElement) {
            console.warn('TOC elements not found');
            return;
        }

        // Check initial state
        this.isCollapsed = this.tocElement.classList.contains('collapsed');
        
        // Cache elements
        this.tocItems = document.querySelectorAll('.floating-toc .toc-list li');
        this.sections = document.querySelectorAll('.content-section, .cover');

        // Initial update
        this.updateActiveItem();

        // Setup scroll listener
        window.addEventListener('scroll', () => this.updateActiveItem());
    }

    /**
     * Toggle TOC collapsed/expanded state
     */
    toggle() {
        if (!this.tocElement || !this.toggleElement) return;

        this.isCollapsed = !this.isCollapsed;

        if (this.isCollapsed) {
            // Collapse
            this.tocElement.classList.add('collapsed');
            this.toggleElement.textContent = '▶';
            this.toggleElement.title = 'Show Table of Contents';
        } else {
            // Expand
            this.tocElement.classList.remove('collapsed');
            this.toggleElement.textContent = '◀';
            this.toggleElement.title = 'Hide Table of Contents';
        }
    }

    /**
     * Update active TOC item based on scroll position
     */
    updateActiveItem() {
        if (!this.tocItems || !this.sections) return;

        let currentSection = '';
        const scrollPos = window.scrollY + 100; // Offset for better detection

        // Find current section
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        // Update TOC active state
        this.tocItems.forEach(item => {
            const link = item.querySelector('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            const sectionId = href.substring(1); // Remove #

            if (sectionId === currentSection) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Get current active section ID
     * @returns {string} Active section ID
     */
    getActiveSection() {
        const scrollPos = window.scrollY + 100;
        let activeSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });

        return activeSection;
    }
}


