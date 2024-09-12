import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import { fetchSubject } from '../hooks/fetchSubject.ts';

function OnYourMark() {
  const [subject, setSubject] = useState<string>('');
  const [recordKeys] = useState<string[]>(['piyo', 'fuwa', 'paya']);
  const [recordSubjects, setRecordSubjects] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleStartClick = () => {
    console.log(`Create ${subject}`);
    navigate('/notes');
  };

  useEffect(() => {
    (async () => {
      const subjects = await Promise.all(recordKeys.map(fetchSubject));
      setRecordSubjects(subjects);
    })();
  }, [recordKeys]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <h2 className="text-2xl text-center mb-8">何について書きますか？</h2>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="主題"
            className="input input-bordered w-2/3"
          />
        </div>
        <div className="flex justify-center mb-8">
          <button className="btn btn-primary px-24" onClick={handleStartClick}>
            スタート
          </button>
        </div>
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

export default OnYourMark;
