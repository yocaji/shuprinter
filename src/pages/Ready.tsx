import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Note } from '../types';
import Navbar from '../components/Navbar.tsx';
import { createNote, readNotes, deleteNote } from '../hooks/api.ts';
import { saveNoteLocal } from '../hooks/localStorage.ts';
import Footer from '../components/Footer.tsx';

function Ready() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      const notes = await readNotes();
      if (!notes) return;
      setNotes(notes);
    })();
  }, []);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const note = await createNote(subject, '');
    if (!note) return;
    saveNoteLocal(note.id, note.subject, note.content);
    navigate('/go', { state: { id: note.id, subject: note.subject } });
  };

  const handleHistoryClick = async (note: Note) => {
    navigate('/go', {
      state: { id: note.id, subject: note.subject, content: note.content },
    });
  };

  const handleDeleteClick = async (id: string) => {
    const note = await deleteNote(id);
    if (!note) return;
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <>
      <Navbar />
      <div className="px-4 py-12 bg-stone-50">
        <h2 className="mb-8 flex justify-center items-end gap-3 text-3xl">
          <span className="i-ph-feather-thin text-4xl" />
          何について書きますか？
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 mx-auto max-w-screen-md flex items-center rounded-lg text-lg">
            <input
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="テーマ"
              className="py-3 px-4 block w-full
              border border-gray-200 rounded-s-lg
              text-gray-800 focus:outline-none"
              required={true}
            />
            <button
              type={'submit'}
              disabled={!subject}
              className="py-3 px-4 rounded-e-lg
              bg-slate-200 border border-transparent
              hover:bg-slate-300 focus:outline-none focus:bg-slate-300
              disabled:opacity-30 disabled:pointer-events-none"
            >
              <span className="i-ph-arrow-right-light" />
            </button>
          </div>
        </form>
      </div>
      <div className="px-4 py-12 bg-stone-100">
        <h2 className="text-3xl mb-8 flex justify-center items-end gap-3">
          <span className="i-ph-bookmarks-simple-thin text-4xl" />
          保存したメモ
        </h2>
        <div className="mb-6 mx-auto max-w-screen-md">
          {notes.map((note) => (
            <div key={note.id} className="flex mb-3 w-full">
              <button
                type={'button'}
                className="py-3 px-4 w-full flex items-center justify-between gap-2 truncate
                rounded-s-lg border border-gray-200
                hover:bg-stone-200 focus:bg-stone-200"
                onClick={() => handleHistoryClick(note)}
              >
                <span className="text-base text-gray-800 truncate">
                  {note.subject}
                </span>
                <span className="text-sm text-gray-400">{note.updatedAt}</span>
              </button>
              <button
                type={'button'}
                onClick={() => handleDeleteClick(note.id)}
                className="py-3 px-4 -ms-px rounded-e-lg
                border border-gray-200
                hover:bg-stone-200 focus:bg-stone-200"
              >
                <span className="i-ph-trash-light" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Ready;
