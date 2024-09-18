export const saveNoteLocal = (id: string, subject: string, content: string) => {
  localStorage.setItem('CurrentNote', JSON.stringify({ id, subject, content }));
};
