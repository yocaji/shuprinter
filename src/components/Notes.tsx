import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Note } from '../types';
import { deleteNote, readNotes } from '../hooks/api.ts';
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

  const handleDeleteClick = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const selectedNote = notes.find((note) => note.id === id);
    if (!selectedNote) return;
    const selectedNoteUpdatedAt = dayjs(selectedNote.updatedAt).format(
      'YYYY-MM-DD HH:mm',
    );
    const isConfirmed = confirm(
      `このメモを削除しますか？\n\n${selectedNote.subject}\n\n${selectedNoteUpdatedAt}`,
    );
    if (!isConfirmed) return;
    const deletedNote = await deleteNote(id);
    if (!deletedNote) return;
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    e.currentTarget.blur();
  };

  return (
    <div className="px-4 py-12 bg-stone-100 text-sky-800">
      <h2 className="mb-8 mx-auto max-w-screen-md flex items-end gap-3 text-2xl">
        <span className="i-ph-notepad-thin text-3xl" />
        保存したメモ
      </h2>
      {isLoaded ? (
        <div className="mb-6 mx-auto max-w-screen-md">
          {notes.map((note) => (
            <Link
              key={note.id}
              to={'/go'}
              state={{
                id: note.id,
                subject: note.subject,
                content: note.content,
              }}
              className="flex justify-between mb-3 w-full bg-stone-50 border rounded-xl hover:shadow-sm focus:outline-none focus:shadow-lg transition"
            >
              <div className="p-4">
                <h3 className="mb-2 text-lg">{note.subject}</h3>
                <p className="text-sm">
                  {dayjs(note.updatedAt).format('YYYY-MM-DD HH:mm')}
                </p>
              </div>
              <div className="">
                <button
                  type={'button'}
                  onClick={(e) => handleDeleteClick(note.id, e)}
                  className="m-2 px-2 py-1 rounded-lg
                hover:bg-stone-200 focus:bg-stone-200"
                >
                  <span className="i-ph-trash-light" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <LoadingNotes />
      )}
    </div>
  );
}

export default Notes;
