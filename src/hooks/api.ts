import type { Count, Note } from '../types';

export const upsertNote = async (
  id: string,
  subject: string,
  content: string,
  userId: string,
): Promise<Note | undefined> => {
  let response;
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, subject, content, userId }),
    });
    if (response?.ok) {
      return await response.json();
    } else {
      console.log(`HTTP Response Code: ${response?.status}`);
    }
  } catch (error) {
    console.log('There was an error', error);
  }
};

export const deleteNote = async (id: string): Promise<Note[] | undefined> => {
  let response;
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    if (response?.ok) {
      return await response.json();
    } else {
      console.log(`HTTP Response Code: ${response?.status}`);
    }
  } catch (error) {
    console.log('There was an error', error);
  }
};

export const readNotes = async (
  userId: string,
): Promise<Note[] | undefined> => {
  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${userId}/notes`,
      {
        method: 'GET',
      },
    );
    if (response?.ok) {
      return await response.json();
    } else {
      console.log(`HTTP Response Code: ${response?.status}`);
    }
  } catch (error) {
    console.log('There was an error', error);
  }
};

export const deleteNotes = async (
  userId: string,
): Promise<Count | undefined> => {
  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${userId}/notes`,
      {
        method: 'DELETE',
      },
    );
    if (response?.ok) {
      return await response.json();
    } else {
      console.log(`HTTP Response Code: ${response?.status}`);
    }
  } catch (error) {
    console.log('There was an error', error);
  }
};
