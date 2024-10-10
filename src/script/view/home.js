import { getNotes, createNote, deleteNote } from '../services/api.js';

const home = async () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('.note-list');
  const listElement = noteListElement.querySelector('.list');
  const addNoteButton = document.getElementById('addNoteButton');
  const noteModal = document.querySelector('note-modal');

  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingIndicator);

  const showLoading = () => loadingIndicator.classList.add('show');
  const hideLoading = () => loadingIndicator.classList.remove('show');

  const displayResult = (notes) => {
    if (notes.length === 0) {
      listElement.innerHTML = `
        <div class="placeholder">
          Tidak ada catatan tersedia. Klik "Tambah Catatan" untuk membuat baru!
        </div>
      `;
      return;
    }
  
    const noteItems = notes.map((note) => {
      return `
        <div class="card" id="note-${note.id}">
          <div class="note-info">
            <div class="note-info__title">
              <h2>${note.title}</h2>
            </div>
            <div class="note-info__description">
              <p>${note.body}</p>
            </div>
          </div>
          <div class="note-actions">
            <button class="delete-note-btn" data-id="${note.id}">Hapus</button>
          </div>
        </div>
      `;
    });
  
    listElement.innerHTML = noteItems.join('');
  
    const deleteButtons = listElement.querySelectorAll('.delete-note-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', handleDeleteNote);
    });
  };

  const showNoteList = async () => {
    showLoading();
    try {
      const notes = await getNotes();
      displayResult(notes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      listElement.innerHTML = `<div class="error">Gagal memuat catatan. Silakan coba lagi nanti.</div>`;
    } finally {
      hideLoading();
    }
  };

  const handleDeleteNote = async (event) => {
    const noteId = event.target.dataset.id;
    showLoading();
    try {
      await deleteNote(noteId);
      await showNoteList(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Gagal menghapus catatan. Silakan coba lagi.');
    } finally {
      hideLoading();
    }
  };

  addNoteButton.addEventListener('click', () => {
    noteModal.open();
  });

  noteModal.addEventListener('note-submitted', async (event) => {
    const { title, body } = event.detail;

    const newNote = {
      title: title,
      body: body,
    };

    showLoading();
    try {
      await createNote(newNote);
      await showNoteList();
    } catch (error) {
      console.error('Failed to create note:', error);
      alert('Gagal membuat catatan. Silakan coba lagi.');
    } finally {
      hideLoading();
    }
  });

  await showNoteList();
};

export default home;