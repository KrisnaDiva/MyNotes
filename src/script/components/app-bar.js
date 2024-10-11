class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ["brand-name", "background-color"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    const backgroundColor = this.getAttribute("background-color") || "#333333";

    this._style.textContent = `
        :host {
          display: block;
          width: 100%;
          color: white;
          background-color: ${backgroundColor};
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1;
        }
        
        div {
          padding: 16px 20px;
        }
        
        .brand-name {
          margin: 0;
          font-size: 1.7em;
        }
      `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
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

    const brandName = this.getAttribute("brand-name") || "Note App";

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div>
          <h1 class="brand-name">${brandName}</h1>
        </div>
      `;
  }
}

customElements.define("app-bar", AppBar);
