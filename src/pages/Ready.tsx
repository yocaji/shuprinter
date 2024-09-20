import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Note } from '../types';
import Navbar from '../components/Navbar.tsx';
import { createNote, readNotes } from '../hooks/api.ts';
import { saveNoteLocal } from '../hooks/localStorage.ts';

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

  return (
    <>
      <Navbar />
      <div className="px-4 py-12 bg-stone-50">
        <h2 className="text-3xl mb-8 flex justify-center items-end gap-3">
          <span className="i-ph-feather-thin text-4xl" />
          何について書きますか？
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mx-auto max-w-screen-md mb-6 rounded-lg">
            <input
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="テーマ"
              className="py-3 px-4 block w-full text-lg text-gray-800 border border-gray-200 rounded-s-lg focus:outline-none"
              required={true}
            />
            <button
              type={'submit'}
              disabled={!subject}
              className="py-3 px-4 inline-flex text-xl font-medium rounded-e-lg border border-transparent bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Start
            </button>
          </div>
        </form>
      </div>
      <div className="px-4 py-12 bg-stone-100">
        <h2 className="text-3xl mb-8 flex justify-center items-end gap-3">
          <span className="i-ph-bookmarks-simple-thin text-4xl" />
          保存したメモ
        </h2>
        <div className="mx-auto max-w-screen-md mb-6">
          {notes.map((note) => (
            <button
              type="button"
              key={note.id}
              className="w-full py-3 px-4 mb-3 rounded-lg border border-gray-200 bg-stone-100 focus:outline-none focus:bg-stone-50 hover:bg-stone-50"
              onClick={() => handleHistoryClick(note)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-base font-normal text-gray-800">
                  {note.subject}
                </span>
                <span className="text-sm font-normal text-gray-500">
                  {note.updatedAt}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Ready;
