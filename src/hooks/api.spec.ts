import { createNote } from './api.ts';
import { expect } from '@playwright/test';

describe('createNote()', () => {
  test.concurrent('Happy path', async () => {
    const note = await createNote('白雪姫', '昔々あるところに...');

    test.concurrent('戻り値のプロパティが一致すること', () => {
      expect(note).toHaveProperty('id');
      expect(note).toHaveProperty('subject');
      expect(note).toHaveProperty('content');
      expect(note).toHaveProperty('updatedAt');
      expect(note).toHaveProperty('createdAt');
    });

    test.concurrent('subjectとcontentが引数と一致すること', () => {
      expect(note?.subject).toBe('白雪姫');
      expect(note?.content).toBe('昔々あるところに...');
    });
  });
});
