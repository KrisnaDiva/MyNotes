import Utils from "../utils.js";
class NoteModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          .modal {
            display: none;
            position: fixed;
            z-index: 2;
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
            background-color: #798645;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
          }
  
          .submit-btn:hover {
            background-color: #586132;
          }

          .validation-message {
            margin-top: 0.5rem;
            color: red;
            font-size: 0.9em;
          }

          input.invalid,
          textarea.invalid {
            border-color: red;
          }

          .submit-btn:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
        </style>
        <div class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Tambah Catatan</h2>
              <button class="close">&times;</button>
            </div>
            <form id="addNoteForm">
              <div class="form-group">
                <label for="noteTitle">Judul</label>
                <input type="text" id="noteTitle" required minlength="3" maxlength="50" 
                       pattern="^[a-zA-Z0-9 ]+$" aria-describedby="noteTitleValidation">
                <p id="noteTitleValidation" class="validation-message" aria-live="polite"></p>
              </div>
              <div class="form-group">
                <label for="noteBody">Isi</label>
                <textarea id="noteBody" required minlength="10" maxlength="500" 
                          aria-describedby="noteBodyValidation"></textarea>
                <p id="noteBodyValidation" class="validation-message" aria-live="polite"></p>
              </div>
              <button type="submit" class="submit-btn" disabled>Simpan</button>
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
    const closeBtn = this.shadowRoot.querySelector(".close");
    const form = this.shadowRoot.querySelector("#addNoteForm");
    const titleInput = this.shadowRoot.querySelector("#noteTitle");
    const bodyInput = this.shadowRoot.querySelector("#noteBody");

    closeBtn.onclick = () => this.close();

    form.onsubmit = (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        const detail = {
          title: titleInput.value,
          body: bodyInput.value,
        };
        this.dispatchEvent(new CustomEvent("note-submitted", { detail }));
        this.close();
        form.reset();
      }
    };

    titleInput.addEventListener("input", () => this.validateForm());
    titleInput.addEventListener("blur", () => this.validateForm());
    bodyInput.addEventListener("input", () => this.validateForm());
    bodyInput.addEventListener("blur", () => this.validateForm());
  }

  validateForm() {
    const titleInput = this.shadowRoot.querySelector("#noteTitle");
    const bodyInput = this.shadowRoot.querySelector("#noteBody");
    const submitBtn = this.shadowRoot.querySelector(".submit-btn");

    this.validateInput(titleInput);
    this.validateInput(bodyInput);

    submitBtn.disabled =
      !titleInput.validity.valid || !bodyInput.validity.valid;
  }

  validateInput(input) {
    const validationMessage = input.nextElementSibling;
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity("Field ini wajib diisi.");
    } else if (input.validity.tooShort) {
      input.setCustomValidity(
        `Panjang minimum adalah ${input.minLength} karakter.`,
      );
    } else if (input.validity.tooLong) {
      input.setCustomValidity(
        `Panjang maksimum adalah ${input.maxLength} karakter.`,
      );
    } else if (input.validity.patternMismatch && input.id === "noteTitle") {
      input.setCustomValidity(
        "Judul hanya boleh mengandung huruf, angka, dan spasi.",
      );
    }
    validationMessage.textContent = input.validationMessage;
    input.classList.toggle("invalid", !input.validity.valid);
  }

  open() {
    const modal = this.shadowRoot.querySelector(".modal");
    Utils.showElement(modal);
    modal.style.display = "flex";
  }

  close() {
    const modal = this.shadowRoot.querySelector(".modal");
    Utils.hideElement(modal);
    const form = this.shadowRoot.querySelector("#addNoteForm");
    form.reset();
    this.shadowRoot
      .querySelectorAll(".validation-message")
      .forEach((msg) => (msg.textContent = ""));
    this.shadowRoot
      .querySelectorAll("input, textarea")
      .forEach((input) => input.classList.remove("invalid"));
    this.shadowRoot.querySelector(".submit-btn").disabled = true;
  }
}

customElements.define("note-modal", NoteModal);
