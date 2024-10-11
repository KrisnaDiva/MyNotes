import { getNotes, createNote, deleteNote, archiveNote, unarchiveNote, getArchivedNotes } from '../services/api.js';

const home = async () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('.note-list');
  const listElement = noteListElement.querySelector('.list');
  const addNoteButton = document.getElementById('addNoteButton');
  const noteModal = document.querySelector('note-modal');
  const noteFilter = document.getElementById('noteFilter');

  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingIndicator);

  const showLoading = () => loadingIndicator.classList.add('show');
  const hideLoading = () => loadingIndicator.classList.remove('show');

  const showErrorMessage = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#798645'
    });
  };

  const showSuccessMessage = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: message,
      confirmButtonColor: '#798645'
    });
  };

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
      const archiveButton = note.archived
        ? `<button class="unarchive-note-btn" data-id="${note.id}">Pulihkan</button>`
        : `<button class="archive-note-btn" data-id="${note.id}">Arsipkan</button>`;
      
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
            ${archiveButton}
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

    const archiveButtons = listElement.querySelectorAll('.archive-note-btn');
    archiveButtons.forEach(button => {
      button.addEventListener('click', handleArchiveNote);
    });

    const unarchiveButtons = listElement.querySelectorAll('.unarchive-note-btn');
    unarchiveButtons.forEach(button => {
      button.addEventListener('click', handleUnarchiveNote);
    });
  };

  const showNoteList = async () => {
    showLoading();
    try {
      const notes = noteFilter.value === 'active' ? await getNotes() : await getArchivedNotes();
      displayResult(notes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      listElement.innerHTML = `<div class="error">Gagal memuat catatan. Silakan coba lagi nanti.</div>`;
      showErrorMessage('Gagal memuat catatan. Silakan coba lagi nanti.');
    } finally {
      hideLoading();
    }
  };

  const handleDeleteNote = async (event) => {
    const noteId = event.target.dataset.id;
    showLoading();
    try {
      await deleteNote(noteId);
      await showNoteList();
      showSuccessMessage('Catatan berhasil dihapus.');
    } catch (error) {
      console.error('Failed to delete note:', error);
      showErrorMessage('Gagal menghapus catatan. Silakan coba lagi.');
    } finally {
      hideLoading();
    }
  };

  const handleArchiveNote = async (event) => {
    const noteId = event.target.dataset.id;
    showLoading();
    try {
      await archiveNote(noteId);
      await showNoteList();
      showSuccessMessage('Catatan berhasil diarsipkan.');
    } catch (error) {
      console.error('Failed to archive note:', error);
      showErrorMessage('Gagal mengarsipkan catatan. Silakan coba lagi.');
    } finally {
      hideLoading();
    }
  };

  const handleUnarchiveNote = async (event) => {
    const noteId = event.target.dataset.id;
    showLoading();
    try {
      await unarchiveNote(noteId);
      await showNoteList();
      showSuccessMessage('Catatan berhasil dipulihkan dari arsip.');
    } catch (error) {
      console.error('Failed to unarchive note:', error);
      showErrorMessage('Gagal memulihkan catatan. Silakan coba lagi.');
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
      showSuccessMessage('Catatan baru berhasil ditambahkan.');
    } catch (error) {
      console.error('Failed to create note:', error);
      showErrorMessage('Gagal membuat catatan. Silakan coba lagi.');
    } finally {
      hideLoading();
    }
  });

  noteFilter.addEventListener('change', showNoteList);

  await showNoteList();
};

export default home;