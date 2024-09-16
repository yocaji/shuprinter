export const setHistory = (noteKey: string, subject: string) => {
  const historyKeys = localStorage.getItem('HistoryKeys') || JSON.stringify([]);
  const historyKeysArray = JSON.parse(historyKeys);

  historyKeysArray.unshift(noteKey);
  if (historyKeysArray.length > 3) {
    const oldestKey = historyKeysArray.pop();
    localStorage.removeItem(oldestKey);
  }

  localStorage.setItem('HistoryKeys', JSON.stringify(historyKeysArray));
  localStorage.setItem(noteKey, JSON.stringify({ subject, content: '' }));
};

export const setNote = (noteKey: string, subject: string, content: string) => {
  localStorage.setItem(noteKey, JSON.stringify({ subject, content }));
};
