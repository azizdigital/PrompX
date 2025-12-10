/**
 * Aziz Prompt Forge - Main Application Controller
 * Coordinates all modules and handles app state
 */

const App = {
    // Current state
    currentView: 'home',
    currentCategory: null,
    currentPrompt: null,
    
    /**
     * Initialize the application
     */
    init() {
        console.log('🔨 Aziz Prompt Forge - Initializing...');

        // Setup event listeners
        this.setupEventListeners();
        
        // Check for saved state
        const lastView = Storage.getSetting('lastView', 'home');
        
        // Render initial view
        this.navigate(lastView);
        
        console.log('✅ App initialized');
    },

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            this.navigateBack();
        });

        // Menu button
        document.getElementById('menu-btn').addEventListener('click', () => {
            this.showMenu();
        });

        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                this.navigate(item.dataset.view);
            });
        });

        // Modal close button
        document.getElementById('modal-close').addEventListener('click', () => {
            UI.hideModal();
        });

        // Close modal on overlay click
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') {
                UI.hideModal();
            }
        });

        // Delegate events for dynamic content
        document.getElementById('app-content').addEventListener('click', (e) => {
            this.handleContentClick(e);
        });

        // Handle form submissions
        document.getElementById('app-content').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });
    },

    /**
     * Handle clicks on dynamic content
     */
    handleContentClick(e) {
        const target = e.target;
        const clickedElement = target.closest('[data-category], [data-prompt-id], [data-history-id], #copy-prompt-btn, #share-prompt-btn, #new-prompt-btn, #favorite-btn, #export-history-btn, #clear-history-btn');

        if (!clickedElement) return;

        // Category card clicked
        if (clickedElement.hasAttribute('data-category')) {
            const categoryId = clickedElement.dataset.category;
            this.navigate('category', { categoryId });
        }

        // Prompt item clicked
        else if (clickedElement.hasAttribute('data-prompt-id') && !clickedElement.id) {
            const promptId = clickedElement.dataset.promptId;
            this.navigate('prompt', { promptId });
        }

        // History item clicked
        else if (clickedElement.hasAttribute('data-history-id')) {
            const historyId = clickedElement.dataset.historyId;
            UI.renderHistoryDetail(historyId);
        }

        // Copy prompt button
        else if (clickedElement.id === 'copy-prompt-btn') {
            const text = clickedElement.dataset.text;
            Utils.copyToClipboard(text).then(success => {
                if (success) {
                    UI.showToast('Copied to clipboard!', 'success');
                } else {
                    UI.showToast('Failed to copy', 'error');
                }
            });
        }

        // Share prompt button
        else if (clickedElement.id === 'share-prompt-btn') {
            const text = clickedElement.dataset.text;
            const title = clickedElement.dataset.title;
            UI.showShareModal(text, title);
        }

        // New prompt button
        else if (clickedElement.id === 'new-prompt-btn') {
            this.navigate('home');
        }

        // Favorite button
        else if (clickedElement.id === 'favorite-btn') {
            const promptId = clickedElement.dataset.promptId;
            this.toggleFavorite(promptId);
        }

        // Export history button
        else if (clickedElement.id === 'export-history-btn') {
            this.exportHistory();
        }

        // Clear history button
        else if (clickedElement.id === 'clear-history-btn') {
            this.confirmClearHistory();
        }
    },

    /**
     * Handle form submissions
     */
    handleFormSubmit(e) {
        if (e.target.id === 'prompt-form') {
            e.preventDefault();
            this.handlePromptFormSubmit(e.target);
        }
    },

    /**
     * Handle prompt form submission
     */
    handlePromptFormSubmit(form) {
        const formData = new FormData(form);
        const inputs = {};

        // Collect all form inputs
        for (let [key, value] of formData.entries()) {
            // Handle checkboxes (multiple values with same name)
            if (inputs[key]) {
                if (!Array.isArray(inputs[key])) {
                    inputs[key] = [inputs[key]];
                }
                inputs[key].push(value);
            } else {
                inputs[key] = value;
            }
        }

        // Get the prompt
        const prompt = PromptsData.getPromptById(this.currentPrompt);
        if (!prompt) return;

        // Check if refine option selected (for hybrid prompts)
        const refineOption = inputs.refineOption;
        delete inputs.refineOption; // Remove from inputs

        // Generate the prompt
        let generatedText;
        if (refineOption) {
            generatedText = Utils.generateRefinePrompt(prompt, inputs, refineOption);
        } else {
            generatedText = Utils.generatePrompt(prompt, inputs);
        }

        // Check history limit before saving
        if (Storage.isHistoryLimitReached()) {
            UI.showHistoryLimitModal();
            // Still show the generated prompt but don't save to history yet
            this.currentGeneratedPrompt = {
                promptId: prompt.id,
                promptTitle: prompt.title,
                inputs: inputs,
                generatedPrompt: generatedText
            };
        } else {
            // Save to history
            const limitReached = Storage.saveHistory({
                promptId: prompt.id,
                promptTitle: prompt.title,
                inputs: inputs,
                generatedPrompt: generatedText
            });

            // Show limit modal if just reached
            if (limitReached) {
                UI.showHistoryLimitModal();
            }
        }

        // Render the generated prompt
        UI.renderGeneratedPrompt(prompt.id, generatedText, inputs);
        UI.updateHeader(prompt.title, true);
    },

    /**
     * Navigation
     */
    navigate(view, data = {}) {
        this.currentView = view;
        
        // Save current view
        Storage.saveSetting('lastView', view);

        // Update UI based on view
        switch (view) {
            case 'home':
                UI.renderHome();
                UI.updateHeader('Aziz Prompt Forge', false);
                UI.updateNav('home');
                this.currentCategory = null;
                this.currentPrompt = null;
                break;

            case 'category':
                this.currentCategory = data.categoryId;
                const category = PromptsData.getCategoryById(data.categoryId);
                UI.renderCategory(data.categoryId);
                UI.updateHeader(category ? category.name : 'Category', true);
                UI.updateNav('home');
                break;

            case 'prompt':
                this.currentPrompt = data.promptId;
                const prompt = PromptsData.getPromptById(data.promptId);
                UI.renderPromptForm(data.promptId);
                UI.updateHeader(prompt ? prompt.title : 'Prompt', true);
                UI.updateNav('home');
                break;

            case 'favorites':
                UI.renderFavorites();
                UI.updateHeader('Favorites', false);
                UI.updateNav('favorites');
                this.currentCategory = null;
                this.currentPrompt = null;
                break;

            case 'history':
                UI.renderHistory();
                UI.updateHeader('History', false);
                UI.updateNav('history');
                this.currentCategory = null;
                this.currentPrompt = null;
                break;
        }

        // Scroll to top
        window.scrollTo(0, 0);
    },

    /**
     * Navigate back
     */
    navigateBack() {
        if (this.currentPrompt) {
            // From prompt to category
            if (this.currentCategory) {
                this.navigate('category', { categoryId: this.currentCategory });
            } else {
                this.navigate('home');
            }
        } else if (this.currentCategory) {
            // From category to home
            this.navigate('home');
        } else {
            // Default to home
            this.navigate('home');
        }
    },

    /**
     * Toggle favorite
     */
    toggleFavorite(promptId) {
        const isFavorite = Storage.toggleFavorite(promptId);
        
        // Update favorite button if on prompt page
        const favoriteBtn = document.getElementById('favorite-btn');
        if (favoriteBtn) {
            const svg = favoriteBtn.querySelector('svg');
            if (isFavorite) {
                svg.setAttribute('fill', 'currentColor');
                svg.style.color = 'var(--primary)';
                UI.showToast('Added to favorites', 'success');
            } else {
                svg.setAttribute('fill', 'none');
                svg.style.color = 'currentColor';
                UI.showToast('Removed from favorites');
            }
        }

        // Refresh favorites view if currently viewing
        if (this.currentView === 'favorites') {
            UI.renderFavorites();
        }
    },

    /**
     * Export history
     */
    exportHistory() {
        const data = Storage.exportHistoryJSON();
        const filename = `prompt-forge-history-${new Date().toISOString().split('T')[0]}.json`;
        Utils.downloadJSON(data, filename);
        UI.showToast('History exported!', 'success');
    },

    /**
     * Confirm clear history
     */
    confirmClearHistory() {
        UI.showModal(
            '⚠️ Clear History',
            `
                <p style="margin-bottom: var(--spacing-lg);">
                    Are you sure you want to clear all history? This action cannot be undone.
                </p>
                <p style="margin-bottom: var(--spacing-lg); color: var(--text-secondary);">
                    Consider exporting your history first.
                </p>
                <div class="action-bar" style="flex-direction: column;">
                    <button class="btn btn-secondary btn-block" onclick="App.exportHistory(); UI.hideModal();">
                        Export First
                    </button>
                    <button class="btn btn-outline btn-block" style="border-color: var(--error); color: var(--error);" onclick="App.clearHistory()">
                        Clear All History
                    </button>
                    <button class="btn btn-secondary btn-block" onclick="UI.hideModal();">
                        Cancel
                    </button>
                </div>
            `
        );
    },

    /**
     * Clear history
     */
    clearHistory() {
        Storage.clearHistory();
        UI.hideModal();
        UI.showToast('History cleared', 'success');
        
        if (this.currentView === 'history') {
            UI.renderHistory();
        }
    },

    /**
     * Delete single history item
     */
    deleteHistoryItem(historyId) {
        Storage.deleteHistoryItem(historyId);
        UI.showToast('Item deleted');
        
        if (this.currentView === 'history') {
            UI.renderHistory();
        }
    },

    /**
     * Reuse history item
     */
    reuseHistoryItem(historyId) {
        const item = Storage.getHistoryItem(historyId);
        if (!item) return;

        UI.hideModal();
        this.navigate('prompt', { promptId: item.promptId });
        
        // Pre-fill form with previous inputs
        setTimeout(() => {
            const form = document.getElementById('prompt-form');
            if (form) {
                Object.keys(item.inputs).forEach(key => {
                    const input = form.elements[key];
                    if (input) {
                        if (input.type === 'checkbox') {
                            // Handle checkbox arrays
                            const values = Array.isArray(item.inputs[key]) ? item.inputs[key] : [item.inputs[key]];
                            form.querySelectorAll(`[name="${key}"]`).forEach(cb => {
                                cb.checked = values.includes(cb.value);
                            });
                        } else if (input.type === 'radio') {
                            // Handle radio buttons
                            form.querySelector(`[name="${key}"][value="${item.inputs[key]}"]`).checked = true;
                        } else {
                            // Handle text inputs, textareas, selects
                            input.value = item.inputs[key];
                        }
                    }
                });
            }
        }, 100);
    },

    /**
     * Show menu
     */
    showMenu() {
        const storageInfo = Storage.getStorageInfo();
        
        UI.showModal(
            '⚙️ Settings',
            `
                <div style="padding: var(--spacing-md) 0;">
                    <h3 style="margin-bottom: var(--spacing-md);">Storage Info</h3>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
                        <span>History:</span>
                        <strong>${storageInfo.historyCount} / ${storageInfo.historyLimit}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-lg);">
                        <span>Favorites:</span>
                        <strong>${storageInfo.favoritesCount}</strong>
                    </div>
                    
                    <div class="divider"></div>
                    
                    <h3 style="margin: var(--spacing-lg) 0 var(--spacing-md);">Actions</h3>
                    <div class="action-bar" style="flex-direction: column;">
                        <button class="btn btn-secondary btn-block" onclick="App.exportHistory(); UI.hideModal();">
                            Export History
                        </button>
                        <button class="btn btn-outline btn-block" onclick="UI.hideModal(); App.showAbout();">
                            About
                        </button>
                        <button class="btn btn-outline btn-block" style="border-color: var(--error); color: var(--error);" onclick="UI.hideModal(); App.confirmResetApp();">
                            Reset App
                        </button>
                    </div>
                </div>
            `
        );
    },

    /**
     * Show about dialog
     */
    showAbout() {
        UI.showModal(
            '🔨 About Aziz Prompt Forge',
            `
                <div style="padding: var(--spacing-md) 0;">
                    <p style="margin-bottom: var(--spacing-md);">
                        <strong>Version:</strong> 1.0.0
                    </p>
                    <p style="margin-bottom: var(--spacing-md);">
                        <strong>Description:</strong> All Your AI Prompts. One Smart Hub.
                    </p>
                    <p style="margin-bottom: var(--spacing-md); color: var(--text-secondary);">
                        A Progressive Web App for managing and generating AI prompts for offshore operations and professional use.
                    </p>
                    <div class="divider"></div>
                    <p style="margin-top: var(--spacing-md); font-size: 0.875rem; color: var(--text-secondary);">
                        📱 Works offline<br>
                        📚 ${PromptsData.prompts.length} prompts in ${PromptsData.categories.length} categories<br>
                        💾 Local storage only - your data stays private
                    </p>
                    <div class="divider"></div>
                    <p style="margin-top: var(--spacing-md); font-size: 0.875rem; color: var(--text-secondary); text-align: center;">
                        <strong>© 2025 Aziz Mohamad</strong><br>
                        Personal Development Division
                    </p>
                </div>
            `
        );
    },

    /**
     * Confirm reset app
     */
    confirmResetApp() {
        UI.showModal(
            '⚠️ Reset App',
            `
                <p style="margin-bottom: var(--spacing-lg);">
                    This will delete all your history, favorites, and settings. This action cannot be undone.
                </p>
                <p style="margin-bottom: var(--spacing-lg); color: var(--error); font-weight: 600;">
                    Are you absolutely sure?
                </p>
                <div class="action-bar" style="flex-direction: column;">
                    <button class="btn btn-outline btn-block" style="border-color: var(--error); color: var(--error);" onclick="App.resetApp()">
                        Yes, Reset Everything
                    </button>
                    <button class="btn btn-primary btn-block" onclick="UI.hideModal();">
                        Cancel
                    </button>
                </div>
            `
        );
    },

    /**
     * Reset app
     */
    resetApp() {
        Storage.clearAll();
        UI.hideModal();
        UI.showToast('App reset complete', 'success');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
