import { fetchSubject } from './fetchSubject.ts';

test('fetchNote', async () => {
  const note = await fetchSubject('piyo');
  expect(note).toBe('ぴよぴよ');
});
