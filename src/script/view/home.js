import Utils from '../utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('.note-list');
  const listElement = noteListElement.querySelector('.list');
  const addNoteButton = document.getElementById('addNoteButton');
  const noteModal = document.querySelector('note-modal');

  const displayResult = (notes) => {
    if (notes.length === 0) {
      listElement.innerHTML = `
        <div class="placeholder">
          No notes available. Click "Add Note" to create one!
        </div>
      `;
      return;
    }

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
    Utils.showElement(noteListElement);
    
    const notes = Notes.getAll();
    displayResult(notes);
  };

  addNoteButton.addEventListener('click', () => {
    noteModal.open();
  });

  noteModal.addEventListener('note-submitted', (event) => {
    const { title, body } = event.detail;
    
    const newNote = {
      id: `notes-${Date.now()}`,
      title: title,
      body: body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    Notes.add(newNote);
    showNoteList(); 
  });

  showNoteList();
};

export default home;