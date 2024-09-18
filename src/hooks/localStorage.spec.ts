import { saveNoteLocal } from './localStorage.ts';

describe('setNote()', () => {
  describe('Happy path', () => {
    afterAll(() => {
      localStorage.clear();
    });

    // prettier-ignore
    test.concurrent('CurrentNoteとして保存されていること', () => {
      saveNoteLocal(
        '47fa58e4-6692-449c-b091-074f246d6ae8',
        '白雪姫',
        '昔々あるところに...',
      );
      expect(localStorage.getItem('CurrentNote')).toBe(
        '{"id":"47fa58e4-6692-449c-b091-074f246d6ae8","subject":"白雪姫","content":"昔々あるところに..."}',
      );
    });
  });
});
