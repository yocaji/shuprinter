export const createNote = async (
  subject: string,
  noteKey: string,
  content: string,
): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_URL}/notes/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subject, noteKey, content }),
  });
};
