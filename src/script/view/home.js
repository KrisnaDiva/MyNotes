import Utils from '../utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('.note-list');
  const listElement = noteListElement.querySelector('.list');

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

  showNote();
};

export default home;
