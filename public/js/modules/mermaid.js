/**
 * Mermaid Diagrams Module
 * Handles Mermaid diagram initialization
 */

export class MermaidDiagrams {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    /**
     * Initialize Mermaid diagrams
     */
    init() {
        // Wait for Mermaid library to load
        if (typeof mermaid !== 'undefined') {
            this.initializeMermaid();
        } else {
            // If Mermaid is loaded via script tag, wait for it
            window.addEventListener('load', () => {
                if (typeof mermaid !== 'undefined') {
                    this.initializeMermaid();
                }
            });
        }
    }

    /**
     * Initialize Mermaid configuration
     */
    initializeMermaid() {
        if (this.isInitialized) return;

        try {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'default',
                securityLevel: 'loose',
                flowchart: { useMaxWidth: true }
            });

            this.isInitialized = true;
            console.log('✅ Mermaid diagrams initialized');
        } catch (error) {
            console.error('Failed to initialize Mermaid:', error);
        }
    }

    /**
     * Render a specific diagram
     * @param {string} id - Element ID containing mermaid code
     */
    renderDiagram(id) {
        if (typeof mermaid !== 'undefined' && this.isInitialized) {
            mermaid.init(undefined, `#${id}`);
        }
    }
}


