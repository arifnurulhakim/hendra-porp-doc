/**
 * Navigation Module
 * Handles smooth scrolling and anchor link navigation
 */
export class Navigation {
    constructor() {
        this.anchors = null;
        this.init();
    }

    init() {
        this.setupSmoothScroll();
    }

    /**
     * Setup smooth scroll for all anchor links
     */
    setupSmoothScroll() {
        this.anchors = document.querySelectorAll('a[href^="#"]');
        
        this.anchors.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        });
    }

    /**
     * Scroll to a specific element
     * @param {string|HTMLElement} target - Element ID or HTMLElement
     * @param {Object} options - Scroll options
     */
    scrollTo(target, options = {}) {
        const element = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;

        if (!element) {
            console.warn('Target element not found:', target);
            return;
        }

        const defaultOptions = {
            behavior: 'smooth',
            block: 'start',
            ...options
        };

        element.scrollIntoView(defaultOptions);
    }

    /**
     * Get scroll position
     * @returns {number} Current scroll position
     */
    getScrollPosition() {
        return window.scrollY || window.pageYOffset;
    }
}


