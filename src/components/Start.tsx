import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveNoteLocal } from '../hooks/localStorage.ts';

function Start() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>('');

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    saveNoteLocal(id, subject, '');
    navigate('/page', { state: { id, subject } });
  };

  return (
    <>
      <h2 className="mb-8 flex justify-center items-end gap-3 text-2xl md:text-3xl">
        <span className="i-ph-feather-thin text-3xl md:text-4xl" />
        何について書きますか？
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 mx-auto max-w-screen-md flex items-center text-lg">
          <input
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="Shuprinterの名前の由来について"
            className="px-3 py-3 md:px-4 w-full rounded-s-lg
            border-s border-y border-stone-200 dark:border-slate-700
            bg-white dark:bg-slate-950 placeholder-stone-300 dark:placeholder-slate-700
            ring-inset ring-amber-200 dark:ring-sky-900 transition duration-300
            hover:ring-4
            focus:ring-4 focus:outline-none focus:placeholder-transparent dark:focus:placeholder-transparent"
            required={true}
          />
          <button
            type={'submit'}
            disabled={!subject}
            className="py-3 px-4 rounded-e-lg
            border border-amber-300 dark:border-amber-400 bg-amber-300 dark:bg-amber-400
            text-xl dark:text-sky-800
            outline-2 outline-offset-2 outline-amber-300 dark:outline-amber-400
            transition duration-300
            hover:outline hover:border-transparent hover:bg-amber-200
            focus:outline focus:border-transparent focus:bg-amber-300 dark:focus:bg-amber-300
            disabled:opacity-25 disabled:pointer-events-none"
          >
            <span className="i-ph-arrow-right" />
            <span className="sr-only">Start</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default Start;
