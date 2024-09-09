import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';

function OnYourMark() {
  const [subject, setSubject] = useState<string>('');
  const navigate = useNavigate();

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleStartClick = () => {
    console.log(`Create ${subject}`);
    navigate('/notes');
  };

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
    </>
  );
}

export default OnYourMark;
