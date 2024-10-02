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
    navigate('/track', { state: { id, subject } });
  };

  return (
    <>
      <h2
        className={
          'mb-8 flex justify-center items-end gap-3 text-2xl md:text-3xl'
        }
      >
        <span className={'i-ph-feather-thin text-3xl md:text-4xl'} />
        何について書きますか？
      </h2>
      <form onSubmit={handleSubmit}>
        <div
          className={
            'mb-6 mx-auto max-w-screen-md flex items-center gap-2 text-lg'
          }
        >
          <input
            type={'text'}
            value={subject}
            onChange={handleSubjectChange}
            placeholder={'Shuprinterの名前の由来について'}
            className={'input px-5 h-12'}
            required={true}
          />
          <button
            type={'submit'}
            disabled={!subject}
            className={'btn btn-primary btn-lg h-12 w-12 shrink-0'}
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
