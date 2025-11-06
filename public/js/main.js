/**
 * Main Application Entry Point
 * Initializes all modules and coordinates functionality
 */
import { TableOfContents } from './modules/toc.js';
import { Navigation } from './modules/navigation.js';
import { Headings } from './modules/headings.js';
import { Toast } from './modules/toast.js';
import { MermaidDiagrams } from './modules/mermaid.js';
import { SectionLoader } from './modules/section-loader.js';

class App {
    constructor() {
        this.toc = null;
        this.navigation = null;
        this.headings = null;
        this.toast = null;
        this.mermaid = null;
        this.sectionLoader = null;
    }

    /**
     * Initialize the application
     */
    init() {
        // Initialize modules
        this.toast = new Toast();
        this.mermaid = new MermaidDiagrams();
        
        // Load sections first, then initialize other modules
        this.sectionLoader = new SectionLoader();
        
        // Wait for sections to load before initializing DOM-dependent modules
        document.addEventListener('sectionsLoaded', () => {
            this.toc = new TableOfContents();
            this.navigation = new Navigation();
            this.headings = new Headings(this.toast);
            
            // Setup global functions for inline event handlers
            this.setupGlobalFunctions();
            
            console.log('✅ Application initialized successfully');
        });
    }

    /**
     * Setup global functions for backward compatibility
     * with inline event handlers in HTML
     */
    setupGlobalFunctions() {
        const app = this;
        
        // Make toggleToc available globally
        window.toggleToc = function() {
            if (app.toc) {
                app.toc.toggle();
            }
        };

        // Make showToast available globally (if needed)
        window.showToast = function(message) {
            if (app.toast) {
                app.toast.show(message);
            }
        };
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new App();
        app.init();
    });
} else {
    // DOM already loaded
    const app = new App();
    app.init();
}

// Export for potential external use
export default App;

