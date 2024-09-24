import { upsertNote } from './api.ts';
import { expect } from '@playwright/test';

describe('createNote()', () => {
  test.concurrent('Happy path', async () => {
    const note = await upsertNote(
      '47fa58e4-6692-449c-b091-074f246d6ae8',
      '白雪姫',
      '昔々あるところに...',
      'S0RAA7Fk1TzcK2qPtET6b1oW4JjQ',
    );

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
