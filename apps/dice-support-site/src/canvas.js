/**
 * Canvas State Management
 *
 * Manages the three states of the canvas:
 * - base: Content only
 * - side-assist: Content + Fluid UI panel (split view)
 * - fullscreen: Fluid UI panel overlays content
 *
 * Also handles context awareness between content and fluid panel.
 */

class CanvasManager {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.contentArea = canvasElement.querySelector('.canvas__content');
    this.fluidPanel = canvasElement.querySelector('.canvas__fluid-panel');

    // State
    this.currentState = 'base';
    this.contentContext = null;

    // Bind methods
    this.setState = this.setState.bind(this);
    this.openSideAssist = this.openSideAssist.bind(this);
    this.openFullscreen = this.openFullscreen.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);

    // Initialize
    this.init();
  }

  init() {
    // Set initial state from data attribute or default to base
    const initialState = this.canvas.dataset.state || 'base';
    this.setState(initialState);

    // Set up event listeners
    this.bindEvents();

    // Initialize context awareness
    this.updateContext();

    // Listen for content changes
    this.observeContent();
  }

  bindEvents() {
    // Trigger button (opens side assist)
    const trigger = this.canvas.querySelector('[data-action="open-panel"]');
    if (trigger) {
      trigger.addEventListener('click', () => this.openSideAssist());
    }

    // Close button
    const closeBtn = this.canvas.querySelector('[data-action="close-panel"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Expand to fullscreen button
    const expandBtn = this.canvas.querySelector('[data-action="expand-panel"]');
    if (expandBtn) {
      expandBtn.addEventListener('click', () => this.openFullscreen());
    }

    // Collapse to side assist button
    const collapseBtn = this.canvas.querySelector('[data-action="collapse-panel"]');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => this.openSideAssist());
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape to close panel
      if (e.key === 'Escape' && this.currentState !== 'base') {
        this.close();
      }
    });
  }

  /**
   * Set canvas state
   * @param {string} state - 'base' | 'side-assist' | 'fullscreen'
   */
  setState(state) {
    const validStates = ['base', 'side-assist', 'fullscreen'];
    if (!validStates.includes(state)) {
      console.warn(`Invalid canvas state: ${state}`);
      return;
    }

    const previousState = this.currentState;
    this.currentState = state;

    // Update DOM
    this.canvas.dataset.state = state;

    // Update ARIA
    const isPanelVisible = state !== 'base';
    this.fluidPanel.setAttribute('aria-hidden', !isPanelVisible);

    // Update panel title based on state
    this.updatePanelTitle(state);

    // Update context when state changes
    if (isPanelVisible) {
      this.updateContext();
    }

    // Dispatch event
    this.canvas.dispatchEvent(new CustomEvent('canvas:statechange', {
      detail: { previousState, currentState: state }
    }));
  }

  openSideAssist() {
    this.setState('side-assist');
  }

  openFullscreen() {
    this.setState('fullscreen');
  }

  close() {
    this.setState('base');
  }

  toggle() {
    if (this.currentState === 'base') {
      this.openSideAssist();
    } else {
      this.close();
    }
  }

  /**
   * Update panel title based on state
   */
  updatePanelTitle(state) {
    const titleEl = this.fluidPanel.querySelector('.fluid-panel__title');
    if (!titleEl) return;

    const sideTitle = titleEl.dataset.titleSide || 'Ask away';
    const fullTitle = titleEl.dataset.titleFull || 'Support ∙ Ask away';

    titleEl.textContent = state === 'fullscreen' ? fullTitle : sideTitle;
  }

  /**
   * Context Awareness System
   *
   * Extracts context from the content area to share with the fluid panel.
   * This allows AI/agents to understand what the user is viewing.
   */
  updateContext() {
    const context = this.extractContentContext();
    this.contentContext = context;

    // Update context indicator in panel
    this.updateContextIndicator(context);

    // Dispatch context event for other components to use
    this.canvas.dispatchEvent(new CustomEvent('canvas:contextupdate', {
      detail: { context }
    }));
  }

  extractContentContext() {
    if (!this.contentArea) return null;

    // Find the content area wrapper
    const contentWrapper = this.contentArea.querySelector('.content-area');
    if (!contentWrapper) return null;

    // Extract key information
    const title = contentWrapper.querySelector('.content-area__title')?.textContent?.trim();
    const meta = contentWrapper.querySelector('.content-area__meta')?.textContent?.trim();
    const body = contentWrapper.querySelector('.content-area__body');

    // Get text content (first 500 chars for summary)
    const bodyText = body?.textContent?.trim().slice(0, 500);

    // Get article ID if present
    const articleId = contentWrapper.dataset.articleId;

    // Get any structured data
    const structuredData = contentWrapper.querySelector('script[type="application/ld+json"]');
    let structured = null;
    if (structuredData) {
      try {
        structured = JSON.parse(structuredData.textContent);
      } catch (e) {
        // Ignore parse errors
      }
    }

    return {
      type: 'article',
      title,
      meta,
      summary: bodyText,
      articleId,
      structured,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };
  }

  updateContextIndicator(context) {
    // Context is stored internally for AI/agent use
    // No visible indicator by default - context flows programmatically
    // To display context, add a .fluid-context element to the panel
    const indicator = this.fluidPanel.querySelector('.fluid-context');
    if (!indicator) return;

    const textEl = indicator.querySelector('.fluid-context__text');
    if (textEl && context?.title) {
      textEl.textContent = context.title;
    }
  }

  /**
   * Observe content area for changes
   */
  observeContent() {
    if (!this.contentArea) return;

    const observer = new MutationObserver(() => {
      // Debounce context updates
      clearTimeout(this._contextTimeout);
      this._contextTimeout = setTimeout(() => {
        this.updateContext();
      }, 100);
    });

    observer.observe(this.contentArea, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  /**
   * Get current context (for external use)
   */
  getContext() {
    return this.contentContext;
  }

  /**
   * Get current state
   */
  getState() {
    return this.currentState;
  }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.canvas');
  if (canvas) {
    window.canvasManager = new CanvasManager(canvas);
  }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CanvasManager;
}
