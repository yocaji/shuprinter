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

  const handleDelete = async (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // const handleSubjectEditClick = () => {
  //   setSubjectIsEditing(true);
  // };

  // const handleSubjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await upsertNote(noteIdRef.current, subject, content);
  //   setSubjectIsEditing(false);
  // };

  return (
    <div className="px-4 py-12 bg-stone-100 text-sky-800">
      <h2 className="mb-8 mx-auto max-w-screen-md flex items-end gap-3 text-2xl">
        <span className="i-ph-notepad-thin text-3xl" />
        保存したメモ
      </h2>
      {isLoaded ? (
        <div className="mb-6 mx-auto max-w-screen-md">
          {notes.map((note) => (
            <NoteCard
              id={note.id}
              subject={note.subject}
              content={note.content}
              updatedAt={note.updatedAt}
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
