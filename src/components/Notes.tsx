import { useState, useEffect } from 'react';
import type { Note } from '../types';
import { readNotes } from '../hooks/api.ts';
import NoteCard from './NoteCard.tsx';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

function Notes() {
  const authContext = AuthContextConsumer();
  const currentUser = authContext?.currentUser;

  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (!currentUser) return;
      const notes = await readNotes(currentUser.uid);
      // メモがない場合の処理を入れる
      if (!notes) return;
      setNotes(notes);
      setIsLoading(false);
    })();
  }, [currentUser]);

  const handleDelete = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <>
      {isLoading ? (
        <div
          className={'spinner size-8'}
          role={'status'}
          aria-label={'loading'}
        >
          <span className={'sr-only'}>Loading...</span>
        </div>
      ) : (
        <ul
          className={
            'mx-auto md:py-4 w-full max-w-screen-md flex flex-col gap-4'
          }
          data-testid={'notes'}
        >
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              subject={note.subject}
              content={note.content}
              updatedAt={note.updatedAt}
              userId={note.userId}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default Notes;
