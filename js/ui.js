/**
 * Aziz Prompt Forge - UI Manager
 * Handles all UI rendering and updates
 */

const UI = {
    /**
     * MAIN VIEW RENDERING
     */

    /**
     * Render home page with categories
     */
    renderHome() {
        const content = document.getElementById('app-content');
        
        // Hero section
        const heroHtml = `
            <div class="hero fade-in">
                <div class="hero-icon">🔨</div>
                <h2 class="hero-title">Aziz Prompt Forge</h2>
                <p class="hero-subtitle">All Your AI Prompts. One Smart Hub.</p>
            </div>
        `;

        // Search box
        const searchHtml = `
            <div class="search-container fade-in">
                <div class="search-box">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input type="text" class="search-input" id="search-prompts" placeholder="Search prompts...">
                </div>
            </div>
        `;

        // Categories
        const categoriesHtml = this._renderCategoriesGrid();

        content.innerHTML = heroHtml + searchHtml + categoriesHtml;

        // Add search listener
        const searchInput = document.getElementById('search-prompts');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
        }
    },

    /**
     * Render categories grid
     */
    _renderCategoriesGrid() {
        const categories = PromptsData.categories;
        const isMobile = window.innerWidth < 768;
        
        const containerClass = isMobile ? '' : 'category-grid';
        
        const cardsHtml = categories.map(cat => {
            const prompts = PromptsData.getPromptsByCategory(cat.id);
            return `
                <div class="card fade-in" data-category="${cat.id}">
                    <div class="card-header">
                        <div class="card-icon" style="background: ${cat.color}20;">${cat.icon}</div>
                        <h3 class="card-title">${cat.name}</h3>
                        <span class="card-count">${prompts.length}</span>
                    </div>
                    <p class="card-description">${cat.description}</p>
                </div>
            `;
        }).join('');

        return `<div class="${containerClass}">${cardsHtml}</div>`;
    },

    /**
     * Render category view with prompts list
     */
    renderCategory(categoryId) {
        const category = PromptsData.getCategoryById(categoryId);
        const prompts = PromptsData.getPromptsByCategory(categoryId);
        
        if (!category) {
            this.renderHome();
            return;
        }

        const content = document.getElementById('app-content');
        
        const html = `
            <div class="fade-in">
                <div class="card" style="margin-bottom: var(--spacing-lg);">
                    <div class="card-header">
                        <div class="card-icon" style="background: ${category.color}20;">${category.icon}</div>
                        <h3 class="card-title">${category.name}</h3>
                        <span class="card-count">${prompts.length}</span>
                    </div>
                    <p class="card-description">${category.description}</p>
                </div>

                <ul class="list">
                    ${prompts.map(prompt => `
                        <li class="list-item fade-in" data-prompt-id="${prompt.id}">
                            <span class="list-item-icon">${prompt.icon}</span>
                            <div class="list-item-content">
                                <div class="list-item-title">${prompt.title}</div>
                                <div class="list-item-subtitle">${prompt.description}</div>
                            </div>
                            ${Storage.isFavorite(prompt.id) ? 
                                '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" style="color: var(--primary);"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' 
                                : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        content.innerHTML = html;
    },

    /**
     * Render prompt form
     */
    renderPromptForm(promptId) {
        const prompt = PromptsData.getPromptById(promptId);
        if (!prompt) {
            this.renderHome();
            return;
        }

        const content = document.getElementById('app-content');
        const isFavorite = Storage.isFavorite(promptId);

        let formHtml = `
            <div class="fade-in">
                <div class="card">
                    <div class="card-header">
                        <span class="card-icon" style="background: var(--primary-light);">${prompt.icon}</span>
                        <h3 class="card-title">${prompt.title}</h3>
                        <button class="btn-icon" id="favorite-btn" data-prompt-id="${promptId}">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" style="color: ${isFavorite ? 'var(--primary)' : 'currentColor'};">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </button>
                    </div>
                    <p class="card-description">${prompt.description}</p>
                </div>

                <form id="prompt-form" class="mt-lg">
        `;

        // Render form inputs
        prompt.inputs.forEach(input => {
            formHtml += this._renderFormInput(input);
        });

        // For hybrid prompts with refine options
        if (prompt.type === 'hybrid' && prompt.aiRefineOptions) {
            formHtml += `
                <div class="form-group">
                    <label class="form-label">Refine Option (Optional)</label>
                    <div class="form-radio-group">
                        <div class="form-radio-item">
                            <input type="radio" id="refine-none" name="refineOption" value="" checked>
                            <label for="refine-none">No refine (use template only)</label>
                        </div>
                        ${prompt.aiRefineOptions.map(opt => `
                            <div class="form-radio-item">
                                <input type="radio" id="refine-${opt.id}" name="refineOption" value="${opt.id}">
                                <label for="refine-${opt.id}">${opt.icon} ${opt.name}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        formHtml += `
                    <button type="submit" class="btn btn-primary btn-block">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M19 12l-7 7-7-7"/>
                        </svg>
                        Generate Prompt
                    </button>
                </form>
            </div>
        `;

        content.innerHTML = formHtml;
    },

    /**
     * Render form input based on type
     */
    _renderFormInput(input) {
        const required = input.required ? ' form-label-required' : '';
        let inputHtml = '';

        switch (input.type) {
            case 'text':
                inputHtml = `
                    <div class="form-group">
                        <label class="form-label${required}">${input.label}</label>
                        <input type="text" class="form-input" name="${input.name}" 
                               placeholder="${input.placeholder || ''}" 
                               ${input.required ? 'required' : ''}>
                    </div>
                `;
                break;

            case 'textarea':
                inputHtml = `
                    <div class="form-group">
                        <label class="form-label${required}">${input.label}</label>
                        <textarea class="form-textarea" name="${input.name}" 
                                  rows="${input.rows || 4}"
                                  placeholder="${input.placeholder || ''}" 
                                  ${input.required ? 'required' : ''}></textarea>
                    </div>
                `;
                break;

            case 'select':
                inputHtml = `
                    <div class="form-group">
                        <label class="form-label${required}">${input.label}</label>
                        <select class="form-select" name="${input.name}" ${input.required ? 'required' : ''}>
                            ${input.options.map(opt => `
                                <option value="${opt}">${opt}</option>
                            `).join('')}
                        </select>
                    </div>
                `;
                break;

            case 'datetime-local':
                const now = new Date();
                const datetime = now.toISOString().slice(0, 16);
                inputHtml = `
                    <div class="form-group">
                        <label class="form-label${required}">${input.label}</label>
                        <input type="datetime-local" class="form-input" name="${input.name}" 
                               value="${datetime}" ${input.required ? 'required' : ''}>
                    </div>
                `;
                break;

            case 'radio':
                inputHtml = `
                    <div class="form-group">
                        <label class="form-label${required}">${input.label}</label>
                        <div class="form-radio-group">
                            ${input.options.map((opt, idx) => `
                                <div class="form-radio-item">
                                    <input type="radio" id="${input.name}-${idx}" name="${input.name}" 
                                           value="${opt.value}" ${opt.default ? 'checked' : ''} 
                                           ${input.required ? 'required' : ''}>
                                    <label for="${input.name}-${idx}">${opt.label}</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;

            case 'checkbox':
                inputHtml = `
                    <div class="form-group">
                        <label class="form-label${required}">${input.label}</label>
                        <div class="form-checkbox-group">
                            ${input.options.map((opt, idx) => `
                                <div class="form-checkbox-item">
                                    <input type="checkbox" id="${input.name}-${idx}" name="${input.name}" 
                                           value="${opt.value}" ${opt.default ? 'checked' : ''}>
                                    <label for="${input.name}-${idx}">${opt.label}</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
        }

        return inputHtml;
    },

    /**
     * Render generated prompt result
     */
    renderGeneratedPrompt(promptId, generatedText, inputs) {
        const prompt = PromptsData.getPromptById(promptId);
        if (!prompt) return;

        const content = document.getElementById('app-content');

        const html = `
            <div class="fade-in">
                <div class="card">
                    <div class="card-header">
                        <span class="card-icon" style="background: var(--success-light);">✅</span>
                        <h3 class="card-title">Prompt Generated!</h3>
                    </div>
                    <p class="card-description">Copy the prompt below and paste it into Claude or ChatGPT</p>
                </div>

                <div class="result-box mt-lg fade-in">
                    <div class="result-header">
                        <span class="result-title">Generated Prompt</span>
                        <span class="badge badge-success">Ready to copy</span>
                    </div>
                    <div class="result-content">${Utils.escapeHtml(generatedText)}</div>
                </div>

                <div class="action-bar">
                    <button class="btn btn-primary" id="copy-prompt-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy Prompt
                    </button>
                    <button class="btn btn-secondary" id="share-prompt-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        Share
                    </button>
                    <button class="btn btn-outline" id="new-prompt-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        New Prompt
                    </button>
                </div>
            </div>
        `;

        content.innerHTML = html;

        // Store data for button handlers
        document.getElementById('copy-prompt-btn').dataset.text = generatedText;
        document.getElementById('share-prompt-btn').dataset.text = generatedText;
        document.getElementById('share-prompt-btn').dataset.title = prompt.title;
    },

    /**
     * Render favorites page
     */
    renderFavorites() {
        const content = document.getElementById('app-content');
        const favoriteIds = Storage.getFavorites();

        if (favoriteIds.length === 0) {
            content.innerHTML = `
                <div class="empty-state fade-in">
                    <div class="empty-state-icon">⭐</div>
                    <h3 class="empty-state-title">No Favorites Yet</h3>
                    <p class="empty-state-text">Star your frequently used prompts for quick access</p>
                    <button class="btn btn-primary" onclick="App.navigate('home')">Browse Prompts</button>
                </div>
            `;
            return;
        }

        const favoritePrompts = favoriteIds
            .map(id => PromptsData.getPromptById(id))
            .filter(p => p !== undefined);

        const html = `
            <div class="fade-in">
                <div class="card">
                    <h3 class="card-title">⭐ Your Favorites</h3>
                    <p class="card-description">${favoritePrompts.length} favorite prompt${favoritePrompts.length > 1 ? 's' : ''}</p>
                </div>

                <ul class="list mt-lg">
                    ${favoritePrompts.map(prompt => `
                        <li class="list-item fade-in" data-prompt-id="${prompt.id}">
                            <span class="list-item-icon">${prompt.icon}</span>
                            <div class="list-item-content">
                                <div class="list-item-title">${prompt.title}</div>
                                <div class="list-item-subtitle">${prompt.description}</div>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        content.innerHTML = html;
    },

    /**
     * Render history page
     */
    renderHistory() {
        const content = document.getElementById('app-content');
        const history = Storage.getHistory();
        const count = Storage.getHistoryCount();
        const limit = Storage.HISTORY_LIMIT;

        if (history.length === 0) {
            content.innerHTML = `
                <div class="empty-state fade-in">
                    <div class="empty-state-icon">📚</div>
                    <h3 class="empty-state-title">No History Yet</h3>
                    <p class="empty-state-text">Your generated prompts will appear here</p>
                    <button class="btn btn-primary" onclick="App.navigate('home')">Generate Your First Prompt</button>
                </div>
            `;
            return;
        }

        // Group history by date
        const grouped = this._groupHistoryByDate(history);

        let html = `
            <div class="fade-in">
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 class="card-title">📚 History</h3>
                            <p class="card-description">${count} of ${limit} prompts</p>
                        </div>
                        <div style="display: flex; gap: var(--spacing-sm);">
                            <button class="btn btn-secondary btn-icon" id="export-history-btn" title="Export as JSON">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                            <button class="btn btn-secondary btn-icon" id="clear-history-btn" title="Clear All">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-lg">
        `;

        Object.keys(grouped).forEach(dateLabel => {
            html += `
                <div class="mb-lg">
                    <h4 style="margin-bottom: var(--spacing-md); color: var(--text-secondary); font-size: 0.875rem; font-weight: 600;">${dateLabel}</h4>
                    <ul class="list">
                        ${grouped[dateLabel].map(item => `
                            <li class="list-item fade-in" data-history-id="${item.id}">
                                <span class="list-item-icon">${this._getPromptIcon(item.promptId)}</span>
                                <div class="list-item-content">
                                    <div class="list-item-title">${item.promptTitle}</div>
                                    <div class="list-item-subtitle">${Utils.formatTime(item.timestamp)}</div>
                                </div>
                                <button class="btn-icon" onclick="App.deleteHistoryItem('${item.id}'); event.stopPropagation();">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        });

        html += `</div></div>`;

        content.innerHTML = html;
    },

    /**
     * Group history by date
     */
    _groupHistoryByDate(history) {
        const grouped = {};
        
        history.forEach(item => {
            const dateLabel = Utils.formatDate(item.timestamp);
            if (!grouped[dateLabel]) {
                grouped[dateLabel] = [];
            }
            grouped[dateLabel].push(item);
        });

        return grouped;
    },

    /**
     * Get prompt icon by ID
     */
    _getPromptIcon(promptId) {
        const prompt = PromptsData.getPromptById(promptId);
        return prompt ? prompt.icon : '📝';
    },

    /**
     * Render history detail modal
     */
    renderHistoryDetail(historyId) {
        const item = Storage.getHistoryItem(historyId);
        if (!item) return;

        this.showModal(
            `📚 ${item.promptTitle}`,
            `
                <div class="mb-md">
                    <strong>Generated:</strong> ${Utils.formatDateTime(item.timestamp)}
                </div>
                <div class="result-box">
                    <div class="result-content">${Utils.escapeHtml(item.generatedPrompt)}</div>
                </div>
                <div class="action-bar mt-lg">
                    <button class="btn btn-primary" onclick="Utils.copyToClipboard(\`${item.generatedPrompt.replace(/`/g, '\\`')}\`).then(() => { UI.showToast('Copied!'); UI.hideModal(); })">
                        Copy Prompt
                    </button>
                    <button class="btn btn-secondary" onclick="App.reuseHistoryItem('${historyId}')">
                        Reuse Prompt
                    </button>
                </div>
            `
        );
    },

    /**
     * MODAL MANAGEMENT
     */

    /**
     * Show modal
     */
    showModal(title, content) {
        const modal = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');

        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modal.style.display = 'flex';
    },

    /**
     * Hide modal
     */
    hideModal() {
        const modal = document.getElementById('modal-overlay');
        modal.style.display = 'none';
    },

    /**
     * Show share options modal
     */
    showShareModal(text, title) {
        this.showModal(
            'Share Prompt',
            `
                <div class="action-bar" style="flex-direction: column;">
                    <button class="btn btn-primary btn-block" onclick="Utils.copyToClipboard(\`${text.replace(/`/g, '\\`')}\`).then(() => { UI.showToast('Copied to clipboard!'); UI.hideModal(); })">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy to Clipboard
                    </button>
                    <button class="btn btn-secondary btn-block" onclick="Utils.shareEmail(\`${text.replace(/`/g, '\\`')}\`, '${title}'); UI.hideModal();">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Share via Email
                    </button>
                    <button class="btn btn-secondary btn-block" onclick="Utils.shareWhatsApp(\`${text.replace(/`/g, '\\`')}\`); UI.hideModal();">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        Share via WhatsApp
                    </button>
                </div>
            `
        );
    },

    /**
     * Show history limit modal
     */
    showHistoryLimitModal() {
        this.showModal(
            '⚠️ History Full (50)',
            `
                <p style="margin-bottom: var(--spacing-lg);">
                    Your history has reached 50 items. Please save your history as JSON before we clear old entries.
                </p>
                <div class="action-bar" style="flex-direction: column;">
                    <button class="btn btn-primary btn-block" onclick="App.exportHistory(); UI.hideModal();">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Save JSON First (Recommended)
                    </button>
                    <button class="btn btn-secondary btn-block" onclick="Storage.deleteOldestHistory(10); UI.showToast('Deleted 10 oldest items'); UI.hideModal();">
                        Skip & Delete Oldest
                    </button>
                </div>
            `
        );
    },

    /**
     * NOTIFICATIONS
     */

    /**
     * Show toast notification
     */
    showToast(message, type = 'default') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    },

    /**
     * Show loading indicator
     */
    showLoading() {
        document.getElementById('loading').style.display = 'flex';
    },

    /**
     * Hide loading indicator
     */
    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    },

    /**
     * SEARCH
     */

    /**
     * Handle search
     */
    handleSearch(query) {
        if (!query || query.trim() === '') {
            this.renderHome();
            return;
        }

        const searchTerm = query.toLowerCase().trim();
        const allPrompts = PromptsData.prompts.filter(prompt => {
            return prompt.title.toLowerCase().includes(searchTerm) ||
                   prompt.description.toLowerCase().includes(searchTerm);
        });

        const content = document.getElementById('app-content');

        if (allPrompts.length === 0) {
            content.innerHTML = `
                <div class="empty-state fade-in">
                    <div class="empty-state-icon">🔍</div>
                    <h3 class="empty-state-title">No Results Found</h3>
                    <p class="empty-state-text">Try a different search term</p>
                </div>
            `;
            return;
        }

        const html = `
            <div class="fade-in">
                <div class="search-container">
                    <div class="search-box">
                        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input type="text" class="search-input" id="search-prompts" value="${Utils.escapeHtml(query)}" placeholder="Search prompts...">
                    </div>
                </div>

                <div class="card">
                    <h3 class="card-title">Search Results</h3>
                    <p class="card-description">${allPrompts.length} prompt${allPrompts.length > 1 ? 's' : ''} found</p>
                </div>

                <ul class="list mt-lg">
                    ${allPrompts.map(prompt => `
                        <li class="list-item fade-in" data-prompt-id="${prompt.id}">
                            <span class="list-item-icon">${prompt.icon}</span>
                            <div class="list-item-content">
                                <div class="list-item-title">${prompt.title}</div>
                                <div class="list-item-subtitle">${prompt.description}</div>
                            </div>
                            ${Storage.isFavorite(prompt.id) ? 
                                '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" style="color: var(--primary);"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' 
                                : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        content.innerHTML = html;

        // Re-attach search listener
        const searchInput = document.getElementById('search-prompts');
        if (searchInput) {
            searchInput.focus();
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
        }
    },

    /**
     * Update header
     */
    updateHeader(title, showBack = false) {
        document.getElementById('header-title').textContent = title;
        document.getElementById('back-btn').style.display = showBack ? 'flex' : 'none';
    },

    /**
     * Update navigation
     */
    updateNav(activeView) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.view === activeView) {
                item.classList.add('active');
            }
        });
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
}
