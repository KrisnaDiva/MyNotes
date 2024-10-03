class FooterBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    
    static get observedAttributes() {
      return ['copyright-text', 'background-color'];
    }
    
    constructor() {
      super();
      
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._style = document.createElement('style');
    }
    
    _updateStyle() {
      const backgroundColor = this.getAttribute('background-color') || '#333333';
      
      this._style.textContent = `
        :host {
          display: block;
           background-color: ${backgroundColor};
        }
        
        div {
          padding: 24px 20px;
          text-align: center;
        }
      `;
    }
    
    _emptyContent() {
      this._shadowRoot.innerHTML = '';
    }
    
    connectedCallback() {
      this.render();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }
    
    render() {
      this._emptyContent();
      this._updateStyle();
      
      const copyrightText = this.getAttribute('copyright-text') || 'Note App © 2024';
      
      this._shadowRoot.appendChild(this._style);
      this._shadowRoot.innerHTML += `
        <div>
          ${copyrightText}
        </div>
      `;
    }
  }
  
  customElements.define('footer-bar', FooterBar);