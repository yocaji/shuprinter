import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import Notes from '../components/Notes.tsx';
import { createNote } from '../hooks/api.ts';
import { saveNoteLocal } from '../hooks/localStorage.ts';

function Ready() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>('');

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
        <Notes />
      </div>
      <Footer />
    </>
  );
}

export default Ready;
