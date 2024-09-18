import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import { saveNoteLocal } from '../hooks/localStorage.ts';
import { updateNote } from '../hooks/api.ts';

function Note() {
  const location = useLocation();
  const noteIdRef = useRef<string>(location.state.id);
  const subjectRef = useRef<string>(location.state.subject);
  const [content, setContent] = useState<string>('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  useEffect(() => {
    saveNoteLocal(noteIdRef.current, subjectRef.current, content);
  }, [content]);

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await updateNote(noteIdRef.current, subjectRef.current, content);
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
        <h2 className="text-2xl text-center mb-8">{subjectRef.current}</h2>
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
