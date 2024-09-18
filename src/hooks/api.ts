export const createNote = async (
  subject: string,
  content: string,
): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_URL}/notes/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subject, content }),
  });
};
