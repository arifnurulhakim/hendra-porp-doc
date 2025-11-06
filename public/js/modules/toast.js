/**
 * Toast Notification Module
 * Handles copy-to-clipboard toast notifications
 */
export class Toast {
    constructor() {
        this.toastElement = document.getElementById('copyToast');
        this.init();
    }

    init() {
        if (!this.toastElement) {
            console.warn('Toast element not found');
        }
    }

    /**
     * Show toast notification
     * @param {string} message - Optional custom message
     * @param {number} duration - Duration in milliseconds (default: 2000)
     */
    show(message = null, duration = 2000) {
        if (!this.toastElement) return;

        if (message) {
            this.toastElement.textContent = message;
        }

        this.toastElement.classList.add('show');
        
        setTimeout(() => {
            this.toastElement.classList.remove('show');
        }, duration);
    }

    /**
     * Hide toast notification
     */
    hide() {
        if (this.toastElement) {
            this.toastElement.classList.remove('show');
        }
    }
}


