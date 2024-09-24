import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { saveNoteLocal } from '../hooks/localStorage.ts';
import { upsertNote } from '../hooks/api.ts';

function Page() {
  const location = useLocation();
  const authContext = AuthContextConsumer();
  const noteIdRef = useRef<string>(location.state.id);
  const subjectRef = useRef<string>(location.state.subject);
  const [content, setContent] = useState<string>(location.state.content || '');
  const [saveStatus, setSaveStatus] = useState<string>(
    location.state.content === undefined ? 'unsaved' : 'saved',
  ); // unsaved, saving, saved

  useEffect(() => {
    saveNoteLocal(noteIdRef.current, subjectRef.current, content);
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaveStatus('unsaved');
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
    } else if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
      if (!authContext?.currentUser) return;
      e.preventDefault();
      setSaveStatus('saving');
      const userId = authContext.currentUser.uid;
      await upsertNote(noteIdRef.current, subjectRef.current, content, userId);
      setSaveStatus('saved');
    }
  };

  const moveCaretAtEnd = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    e.target.value = '';
    e.target.value = value;
  };

  return (
    <>
      <Navbar
        saveStatus={saveStatus}
        setSaveStatus={setSaveStatus}
        noteId={noteIdRef.current}
        subject={subjectRef.current}
        content={content}
      />
      <div className="px-4 pb-12 bg-stone-50 text-sky-800">
        <div className="pb-6 mx-auto max-w-screen-md">
          <h2 className="pb-6 text-xl">{subjectRef.current}</h2>
          <textarea
            value={content}
            rows={18}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={moveCaretAtEnd}
            autoFocus={true}
            placeholder="昔々あるところにおじいさんとおばあさんが住んでいました。"
            className="w-full bg-transparent text-lg leading-8 placeholder-stone-300
            focus:outline-none focus:placeholder-white"
          ></textarea>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
