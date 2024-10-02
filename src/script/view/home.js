import Utils from '../utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('.note-list');
  const listElement = noteListElement.querySelector('.list');
  const modal = document.getElementById('addNoteModal');
  const addNoteButton = document.getElementById('addNoteButton');
  const closeButton = modal.querySelector('.close');
  const addNoteForm = document.getElementById('addNoteForm');

  const showNote = () => {
    const result = Notes.getAll();
    displayResult(result);
    showNoteList();
  };

  const displayResult = (notes) => {
    const noteItems = notes.map((note) => {
      return `
        <div class="card">
          <div class="note-info">
            <div class="note-info__title">
              <h2>${note.title}</h2>
            </div>
            <div class="note-info__description">
              <p>${note.body}</p>
            </div>
          </div>
        </div>
      `;
    });

    listElement.innerHTML = noteItems.join('');
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  // Modal functionality
  addNoteButton.onclick = () => {
    modal.style.display = 'block';
  };

  closeButton.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  addNoteForm.onsubmit = (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('noteTitle');
    const bodyInput = document.getElementById('noteBody');

    const newNote = {
      id: `notes-${Date.now()}`,
      title: titleInput.value,
      body: bodyInput.value,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    Notes.add(newNote);
    modal.style.display = 'none';
    addNoteForm.reset();
    showNote();
  };

  showNote();
};

export default home;