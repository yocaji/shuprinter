import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarGo from '../components/NavbarGo.tsx';
import Footer from '../components/Footer.tsx';
import { saveNoteLocal } from '../hooks/localStorage.ts';

function Go() {
  const location = useLocation();
  const noteIdRef = useRef<string>(location.state.id);
  const subjectRef = useRef<string>(location.state.subject);
  const [content, setContent] = useState<string>(location.state.content || '');
  const [isSaved, setIsSaved] = useState<boolean>(
    location.state.content !== undefined,
  );

  useEffect(() => {
    saveNoteLocal(noteIdRef.current, subjectRef.current, content);
  }, [subjectRef.current, content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };
  useEffect(() => {
    saveNoteLocal(noteIdRef.current, subjectRef.current, content);
  }, [subjectRef.current, content]);

  // ヘッダとの協調方法を検討中
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //   if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
    //     e.preventDefault();
    //     await upsertNote(noteIdRef.current, subjectRef.current, content);
    //   } else if (e.key === 'Backspace') {
    if (e.key === 'Backspace') {
      e.preventDefault();
    }
  };

  return (
    <>
      <NavbarGo
        isSaved={isSaved}
        setIsSaved={setIsSaved}
        noteId={noteIdRef.current}
        subject={subjectRef.current}
        content={content}
      />
      <div className="px-4 pb-6 bg-stone-50">
        <div className="mx-auto max-w-screen-md flex gap-x-1">
          <h2 className="pb-1 text-xl truncate">{subjectRef.current}</h2>
        </div>
      </div>
      <div className="px-4 pb-12 bg-stone-50">
        <div className="pb-6 flex justify-center mx-auto max-w-screen-md">
          <textarea
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder="内容"
            rows={18}
            className="p-4 block w-full text-lg border border-gray-200 rounded-lg focus:outline-none"
          ></textarea>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Go;
