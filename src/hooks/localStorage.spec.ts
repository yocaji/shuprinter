import { setHistory, setNote } from './localStorage.ts';

describe('setHistory()', () => {
  describe('1件目', () => {
    beforeAll(() => {
      setHistory(
        'this_is_64_characters_string_0123456789abcdefghijklmn_snow_white',
        '白雪姫',
      );
    });
    afterAll(() => {
      localStorage.clear();
    });

    test.concurrent('HistoryKeysに1番目のnoteKeyが保存されていること', () => {
      expect(localStorage.getItem('HistoryKeys')).toBe(
        '["this_is_64_characters_string_0123456789abcdefghijklmn_snow_white"]',
      );
    });

    // prettier-ignore
    test.concurrent('1番目に登録したNoteが保存されていること', () => {
      expect(
        localStorage.getItem(
          'this_is_64_characters_string_0123456789abcdefghijklmn_snow_white',
        ),
      ).toBe('{"subject":"白雪姫","content":""}');
    });
  });

  describe('上限数ちょうど', () => {
    beforeAll(() => {
      setHistory(
        'this_is_64_characters_string_0123456789abcdefghijklmn_snow_white',
        '白雪姫',
      );
      setHistory(
        'this_is_64_characters_string_0123456789abcdefghijklmn_cinderella',
        'シンデレラ',
      );
      setHistory(
        'this_is_64_characters_string_0123456789abcdefghijklmnopqr_aurora',
        'オーロラ姫',
      );
    });
    afterAll(() => {
      localStorage.clear();
    });

    test.concurrent('HistoryKeysの数が上限数ちょうどとなっていること', () => {
      const historyKeys = localStorage.getItem('HistoryKeys') ?? '';
      const historyKeysArray: string[] = JSON.parse(historyKeys);
      expect(historyKeysArray.length).toBe(3);
    });

    // prettier-ignore
    test.concurrent('HistoryKeysの先頭が最後に登録したnoteKeyとなっていること', () => {
      const historyKeys = localStorage.getItem('HistoryKeys') ?? '';
      const latestKey = JSON.parse(historyKeys).shift();
      expect(latestKey).toBe('this_is_64_characters_string_0123456789abcdefghijklmnopqr_aurora');
    });

    // prettier-ignore
    test.concurrent('最後に登録したNoteが保存されていること', () => {
      expect(
        localStorage.getItem(
          'this_is_64_characters_string_0123456789abcdefghijklmnopqr_aurora',
        ),
      ).toBe('{"subject":"オーロラ姫","content":""}');
    });
  });

  describe('4件目', () => {
    beforeAll(() => {
      setHistory(
        'this_is_64_characters_string_0123456789abcdefghijklmn_snow_white',
        '白雪姫',
      );
      setHistory(
        'this_is_64_characters_string_0123456789abcdefghijklmn_cinderella',
        'シンデレラ',
      );
      setHistory(
        'this_is_64_characters_string_0123456789abcdefghijklmnopqr_aurora',
        'オーロラ姫',
      );
      setHistory(
        'this_is_64_characters_string_0123456789abcdefghijklmnopqrs_ariel',
        'アリエル',
      );
    });
    afterAll(() => {
      localStorage.clear();
    });

    test.concurrent('HistoryKeysの数が上限数ちょうどとなっていること', () => {
      const historyKeys = localStorage.getItem('HistoryKeys') ?? '';
      const historyKeysArray: string[] = JSON.parse(historyKeys);
      expect(historyKeysArray.length).toBe(3);
    });

    // prettier-ignore
    test.concurrent('HistoryKeysの先頭が上限数+1番目に登録したnoteKeyとなっていること', () => {
      const historyKeys = localStorage.getItem('HistoryKeys') ?? '';
      const latestKey = JSON.parse(historyKeys).shift();
      expect(latestKey).toBe('this_is_64_characters_string_0123456789abcdefghijklmnopqrs_ariel');
    });

    test.concurrent('上限数+1番目に登録したNoteが保存されていること', () => {
      expect(
        localStorage.getItem(
          'this_is_64_characters_string_0123456789abcdefghijklmnopqrs_ariel',
        ),
      ).toBe('{"subject":"アリエル","content":""}');
    });

    test.concurrent('1番目に登録したNoteが削除済みであるること', () => {
      expect(
        localStorage.getItem(
          'this_is_64_characters_string_0123456789abcdefghijklmn_snow_white',
        ),
      ).toBeNull();
    });
  });
});

describe('setNote()', () => {
  describe('Noteを保存できること', () => {
    beforeAll(() => {
      setNote(
        'this_is_64_characters_string_0123456789abcdefghijklmn_snow_white',
        '白雪姫',
        'Once upon a time...',
      );
    });
    afterAll(() => {
      localStorage.clear();
    });

    // prettier-ignore
    test.concurrent('noteKeyに紐づくsubject及びcontentが保存した内容と合致すること', () => {
      expect(localStorage.getItem('this_is_64_characters_string_0123456789abcdefghijklmn_snow_white')).toBe(
        '{"subject":"白雪姫","content":"Once upon a time..."}',
      );
    });
  });
});
