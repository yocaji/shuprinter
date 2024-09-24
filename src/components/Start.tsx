import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveNoteLocal } from '../hooks/localStorage.ts';

function Start() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>('');

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    saveNoteLocal(id, subject, '');
    navigate('/page', { state: { id, subject } });
  };

  return (
    <>
      <div className="px-4 py-12 bg-stone-50 border-t-4 border-amber-200 text-sky-800">
        <h2 className="mb-8 flex justify-center items-end gap-3 text-3xl">
          <span className="i-ph-feather-thin text-4xl" />
          何について書きますか？
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 mx-auto max-w-screen-md flex items-center text-lg">
            <input
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="テーマ"
              className="py-3 px-4 block w-full rounded-s-lg
              border border-stone-200 bg-white
              focus:outline-none"
              required={true}
            />
            <button
              type={'submit'}
              disabled={!subject}
              className="py-3 px-4 rounded-e-lg -mx-px
              border border-stone-200 bg-stone-200
              hover:bg-amber-100 hover:border-amber-100 focus:outline-none focus:border-amber-200 focus:bg-amber-200 focus:ring-2 ring-offset-2 focus:ring-amber-200
              disabled:opacity-25 disabled:pointer-events-none"
            >
              <span className="i-ph-arrow-right-light" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Start;
