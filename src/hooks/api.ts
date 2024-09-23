import type { Note } from '../types';

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
      headers: {
        'Content-Type': 'application/json',
      },
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

export const readNotes = async (): Promise<Note[] | undefined> => {
  let response;
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
