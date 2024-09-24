import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import NavbarGo from '../components/NavbarGo.tsx';
import Footer from '../components/Footer.tsx';
import { saveNoteLocal } from '../hooks/localStorage.ts';
import { upsertNote } from '../hooks/api.ts';

function Page() {
  const location = useLocation();
  const authContext = AuthContextConsumer();
  const noteIdRef = useRef<string>(location.state.id);
  const subjectRef = useRef<string>(location.state.subject);
  const [content, setContent] = useState<string>(location.state.content || '');
  const [isSaved, setIsSaved] = useState<boolean>(
    location.state.content !== undefined,
  );

  useEffect(() => {
    saveNoteLocal(noteIdRef.current, subjectRef.current, content);
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
    } else if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
      if (!authContext?.currentUser) return;
      e.preventDefault();
      const userId = authContext.currentUser.uid;
      await upsertNote(noteIdRef.current, subjectRef.current, content, userId);
      setIsSaved(true);
    }
  };

  const moveCaretAtEnd = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    e.target.value = '';
    e.target.value = value;
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
            className="w-full bg-transparent text-lg focus:outline-none"
          ></textarea>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
