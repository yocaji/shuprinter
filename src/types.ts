export type Note = {
  id: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Count = {
  count: number;
};

export type Theme = 'system' | 'light' | 'dark';

export type SaveStatus = 'unsaved' | 'saving' | 'saved';
