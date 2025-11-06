/**
 * Section Loader Module
 * Handles dynamic loading of HTML sections
 */

export class SectionLoader {
    constructor() {
        this.sectionsContainer = null;
        this.loadedSections = new Set();
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Small delay to ensure DOM is fully ready
                setTimeout(() => this.setup(), 100);
            });
        } else {
            // DOM already loaded, wait a bit for scripts to initialize
            setTimeout(() => this.setup(), 100);
        }
    }

    setup() {
        this.sectionsContainer = document.getElementById('sections-container');
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.loadingProgress = document.getElementById('loading-progress');
        
        if (!this.sectionsContainer) {
            console.error('Sections container not found');
            return;
        }

        console.log('🚀 Starting to load sections...');
        
        // Load all sections
        this.loadAllSections();
    }

    /**
     * Load all sections in order
     */
    async loadAllSections() {
        const sections = [
            { id: 'cover', file: 'sections/cover.html' },
            { id: 'table-of-contents', file: 'sections/table-of-contents.html' },
            { id: 'implementation-status', file: 'sections/implementation-status.html' },
            { id: 'section-01', file: 'sections/section-01.html' },
            { id: 'section-02', file: 'sections/section-02.html' },
            { id: 'section-03', file: 'sections/section-03.html' },
            { id: 'section-04', file: 'sections/section-04.html' },
            { id: 'section-05', file: 'sections/section-05.html' },
            { id: 'section-06', file: 'sections/section-06.html' },
            { id: 'section-07', file: 'sections/section-07.html' },
            { id: 'section-08', file: 'sections/section-08.html' },
            { id: 'section-09', file: 'sections/section-09.html' },
            { id: 'section-10', file: 'sections/section-10.html' }
        ];

        const total = sections.length;
        let loaded = 0;

        try {
            for (const section of sections) {
                await this.loadSection(section.id, section.file);
                loaded++;
                
                // Update progress
                if (this.loadingProgress) {
                    this.loadingProgress.textContent = `Loading ${loaded}/${total} sections...`;
                }
            }
            
            // Hide loading indicator
            if (this.loadingIndicator) {
                this.loadingIndicator.style.display = 'none';
            }
            
            console.log('✅ All sections loaded successfully');
            
            // Trigger re-initialization of modules that depend on DOM
            this.notifySectionsLoaded();
        } catch (error) {
            console.error('Error loading sections:', error);
            if (this.loadingProgress) {
                this.loadingProgress.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
            }
        }
    }

    /**
     * Load a single section
     * @param {string} id - Section ID
     * @param {string} file - File path
     */
    async loadSection(id, file) {
        if (this.loadedSections.has(id)) {
            return; // Already loaded
        }

        try {
            // Use relative path from current location
            // If index.html is at root, sections/ is relative to root
            // If index.html is in subdirectory, adjust accordingly
            let fullPath = file;
            
            // Check if we're in a subdirectory
            const currentPath = window.location.pathname;
            if (currentPath !== '/' && currentPath !== '/index.html') {
                // Remove filename and keep directory
                const dir = currentPath.substring(0, currentPath.lastIndexOf('/'));
                fullPath = `${dir}/${file}`;
            }
            
            console.log(`Loading: ${fullPath}`);
            const response = await fetch(fullPath);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${file}: ${response.status} ${response.statusText}`);
            }

            const html = await response.text();
            
            if (!html || html.trim().length === 0) {
                throw new Error(`Empty content for ${file}`);
            }
            
            // Create temporary container to parse HTML
            const temp = document.createElement('div');
            temp.innerHTML = html.trim();
            
            // Append to sections container
            while (temp.firstChild) {
                this.sectionsContainer.appendChild(temp.firstChild);
            }

            this.loadedSections.add(id);
            
            console.log(`✅ Loaded section: ${id}`);
        } catch (error) {
            console.error(`❌ Error loading section ${id}:`, error);
            // Show error message in container
            const errorDiv = document.createElement('div');
            errorDiv.className = 'content-section';
            errorDiv.id = id;
            errorDiv.innerHTML = `
                <h1>Error Loading Section</h1>
                <p>Failed to load section: ${id}</p>
                <p><small>Error: ${error.message}</small></p>
                <p><small>File: ${file}</small></p>
            `;
            this.sectionsContainer.appendChild(errorDiv);
        }
    }

    /**
     * Load a specific section (for lazy loading)
     * @param {string} id - Section ID
     */
    async loadSpecificSection(id) {
        const sectionMap = {
            'cover': 'sections/cover.html',
            'table-of-contents': 'sections/table-of-contents.html',
            'implementation-status': 'sections/implementation-status.html',
            'section-01': 'sections/section-01.html',
            'section-02': 'sections/section-02.html',
            'section-03': 'sections/section-03.html',
            'section-04': 'sections/section-04.html',
            'section-05': 'sections/section-05.html',
            'section-06': 'sections/section-06.html',
            'section-07': 'sections/section-07.html',
            'section-08': 'sections/section-08.html',
            'section-09': 'sections/section-09.html',
            'section-10': 'sections/section-10.html'
        };

        const file = sectionMap[id];
        if (!file) {
            console.error(`Section ${id} not found in section map`);
            return;
        }

        await this.loadSection(id, file);
    }

    /**
     * Notify other modules that sections are loaded
     */
    notifySectionsLoaded() {
        // Dispatch custom event
        const event = new CustomEvent('sectionsLoaded', {
            detail: { loadedSections: Array.from(this.loadedSections) }
        });
        document.dispatchEvent(event);
    }

    /**
     * Check if section is loaded
     * @param {string} id - Section ID
     * @returns {boolean}
     */
    isSectionLoaded(id) {
        return this.loadedSections.has(id);
    }
}

