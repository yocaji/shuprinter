import { useState, useEffect } from 'react';
import type { Note } from '../types';
import { readNotes } from '../hooks/api.ts';
import NoteCard from './Note.tsx';
import LoadingNotes from './LoadingNotes.tsx';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

function Notes() {
  const authContext = AuthContextConsumer();
  const currentUser = authContext?.currentUser;

  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // ログインしていない場合の処理を入れる
      if (!currentUser) return;
      const notes = await readNotes(currentUser.uid);
      // メモがない場合の処理を入れる
      if (!notes) return;
      setNotes(notes);
      setIsLoaded(true);
    })();
  }, [currentUser]);

  const handleDelete = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className="px-4 py-12 bg-stone-100 text-sky-800">
      {isLoaded ? (
        <div className="my-6 mx-auto max-w-screen-md flex flex-col gap-3">
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
      ) : (
        <LoadingNotes />
      )}
    </div>
  );
}

export default Notes;
