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
          className="animate-spin size-6 m-auto
            text-stone-300 dark:text-slate-700
            border-4 border-current border-t-transparent rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="my-6 mx-auto w-full max-w-screen-md flex flex-col gap-3">
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
        </div>
      )}
    </>
  );
}

export default Notes;
