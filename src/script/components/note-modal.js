class NoteModal extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
          }
  
          .modal-content {
            background-color: white;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            border-radius: 8px;
          }
  
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
  
          .modal-title {
            margin: 0;
            font-size: 1.5em;
          }
  
          .close {
            color: #aaa;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            border: none;
            background: none;
            padding: 0;
          }
  
          .close:hover {
            color: black;
          }
  
          .form-group {
            margin-bottom: 15px;
          }
  
          .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
  
          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }
  
          .form-group textarea {
            height: 100px;
            resize: vertical;
          }
  
          .submit-btn {
            background-color: cornflowerblue;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
          }
  
          .submit-btn:hover {
            background-color: #4169e1;
          }
        </style>
        <div class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Add New Note</h2>
              <button class="close">&times;</button>
            </div>
            <form id="addNoteForm">
              <div class="form-group">
                <label for="noteTitle">Title</label>
                <input type="text" id="noteTitle" required>
              </div>
              <div class="form-group">
                <label for="noteBody">Content</label>
                <textarea id="noteBody" required></textarea>
              </div>
              <button type="submit" class="submit-btn">Add Note</button>
            </form>
          </div>
        </div>
      `;
    }
  
    connectedCallback() {
      this.render();
      this.initializeEventListeners();
    }
  
    initializeEventListeners() {
      const modal = this.shadowRoot.querySelector('.modal');
      const closeBtn = this.shadowRoot.querySelector('.close');
      const form = this.shadowRoot.querySelector('#addNoteForm');
  
      closeBtn.onclick = () => {
        this.close();
      };
  
      form.onsubmit = (e) => {
        e.preventDefault();
        const titleInput = this.shadowRoot.querySelector('#noteTitle');
        const bodyInput = this.shadowRoot.querySelector('#noteBody');
        
        const detail = {
          title: titleInput.value,
          body: bodyInput.value
        };
        
        this.dispatchEvent(new CustomEvent('note-submitted', { detail }));
        this.close();
        form.reset();
      };
    }
  
    open() {
      const modal = this.shadowRoot.querySelector('.modal');
      modal.style.display = 'flex';
    }
  
    close() {
      const modal = this.shadowRoot.querySelector('.modal');
      modal.style.display = 'none';
    }
  }
  
  customElements.define('note-modal', NoteModal);