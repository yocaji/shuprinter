import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import { fetchSubject } from '../hooks/fetchSubject.ts';
import { generateKey } from '../hooks/generateKey.ts';
import { createNote } from '../hooks/createNote.ts';

function Ready() {
  const [subject, setSubject] = useState<string>('');
  const [recordNoteKeys] = useState<string[]>([
    'b975ceeb58c2bb1d9bdf6162c64c5e2dde2b3493397ceb85841ab50714653a38',
    'puka',
    'paya',
  ]);
  const [recordSubjects, setRecordSubjects] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const noteKey = await generateKey(subject);
    const response = await createNote(subject, noteKey, '');
    if (response.ok) {
      navigate('/note', { state: { subject, noteKey } });
    } else {
      console.error('Failed to create a note');
    }
  };

  useEffect(() => {
    (async () => {
      const subjects = await Promise.all(recordNoteKeys.map(fetchSubject));
      setRecordSubjects(subjects);
    })();
  }, [recordNoteKeys]);

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
              <h2>{recordSubjects[0]}</h2>
              <p>2021/04/01 12:34</p>
            </div>
            <div className="record">
              <h2>{recordSubjects[1]}</h2>
              <p>2021/04/01 12:34</p>
            </div>
            <div className="record">
              <h2>{recordSubjects[2]}</h2>
              <p>2021/04/01 12:34</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ready;
