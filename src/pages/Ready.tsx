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
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <h2 className="text-2xl text-center mb-8">何について書きますか？</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-8">
            <input
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="主題"
              className="py-3 px-4 block w-full text-lg text-gray-800 border border-gray-200 rounded-lg focus:outline-none"
              required={true}
            />
          </div>
          <div className="flex justify-center mb-8">
            <button
              type={'submit'}
              disabled={!subject}
              className="py-3 px-4 mr-2 inline-flex items-center gap-x-2 text-lg font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              スタート
            </button>
          </div>
        </form>
      </div>
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <h2 className="text-2xl text-center mb-8">最近のメモ</h2>
        {notes.map((note) => (
          <button
            type="button"
            key={note.id}
            className="inline-flex items-center w-full py-3 px-4 text-start border border-gray-200 -mt-px first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
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
    </>
  );
}

export default Ready;
