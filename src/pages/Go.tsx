import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import { saveNoteLocal } from '../hooks/localStorage.ts';
import { updateNote } from '../hooks/api.ts';

function Go() {
  const location = useLocation();
  const noteIdRef = useRef<string>(location.state.id);
  const subjectRef = useRef<string>(location.state.subject);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    setContent(location.state.content);
  }, [location.state.content]);

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
            rows={24}
            className="p-4 block w-full text-lg border border-gray-200 rounded-lg focus:outline-none"
          ></textarea>
        </div>
        <div className="flex justify-center mb-8">
          <button
            onClick={handleSaveClick}
            disabled={!content}
            className="py-3 px-4 mr-2 inline-flex items-center text-lg text-white font-medium rounded-lg border border-transparent bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            保存
          </button>
          <button
            onClick={handleCopyClick}
            className="py-3 px-4 inline-flex items-center text-lg text-gray-500 font-medium rounded-lg border border-gray-200 hover:border-gray-800 hover:text-gray-800 focus:outline-none focus:border-gray-800 focus:text-gray-800"
          >
            コピー
          </button>
        </div>
      </div>
    </>
  );
}

export default Go;
