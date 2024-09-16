import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.tsx';
import { useLocation } from 'react-router-dom';

function Note() {
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subjectParam = params.get('subject');
    if (subjectParam) {
      setSubject(subjectParam);
    }
  }, []);

  useEffect(() => {
    if (location.state) {
      setSubject(location.state.subject);
    }
  }, [location]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSaveClick = () => {
    // Save content logic here
    alert(content);
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log('Content copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy content: ', err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <h2 className="text-2xl text-center mb-8">{subject}</h2>
        <div className="flex justify-center mb-8">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="内容"
            className="textarea textarea-bordered w-2/3"
          ></textarea>
        </div>
        <div className="flex justify-center mb-8">
          <button className="btn btn-primary px-4" onClick={handleSaveClick}>
            保存
          </button>
          <button className="btn btn-secondary px-4" onClick={handleCopyClick}>
            コピー
          </button>
        </div>
      </div>
    </>
  );
}

export default Note;
