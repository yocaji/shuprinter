export const fetchSubject = async (key: string): Promise<string> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${key}`);
  const data = await response.json();
  return data.subject;
};
