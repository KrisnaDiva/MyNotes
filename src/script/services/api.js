const API_BASE_URL = "https://notes-api.dicoding.dev/v2";

export const getNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const getArchivedNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/archived`);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error fetching archived notes:", error);
    throw error;
  }
};

export const archiveNote = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}/archive`, {
      method: "POST",
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  } catch (error) {
    console.error("Error archiving note:", error);
    throw error;
  }
};

export const unarchiveNote = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}/unarchive`, {
      method: "POST",
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  } catch (error) {
    console.error("Error unarchiving note:", error);
    throw error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
