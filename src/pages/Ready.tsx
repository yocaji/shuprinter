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
    navigate('/note', { state: { id: note.id, subject: note.subject } });
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
              className="input input-bordered w-2/3"
              required={true}
            />
          </div>
          <div className="flex justify-center mb-8">
            <button
              className="btn btn-primary px-24"
              type={'submit'}
              disabled={!subject}
            >
              スタート
            </button>
          </div>
        </form>
      </div>
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <h2 className="text-2xl text-center mb-8">
          最近このブラウザで作成したメモ
        </h2>
        <div className="flex justify-center">
          <div className="w-2/3">
            <div className="record">
              {notes.map((note) => (
                <div key={note.id}>
                  <h2>{note.subject}</h2>
                  <p>{note.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ready;
