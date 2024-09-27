import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { saveNoteLocal } from '../hooks/localStorage.ts';
import { upsertNote } from '../hooks/api.ts';

function Page() {
  const location = useLocation();
  const navigate = useNavigate();
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
    } else if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleReturn();
    } else if (e.key === 'z' && (e.metaKey || e.ctrlKey)) {
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

  const handleReturn = () => {
    if (saveStatus === 'saved') return navigate('/');
    const isConfirmed = window.confirm('変更を保存せずに戻りますか？');
    if (isConfirmed) return navigate('/');
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
        handleReturn={handleReturn}
      />
      <div className="relative top-16 md:top-20 flex flex-col justify-between min-h-screen">
        <div
          className="px-4 pb-12 grow
          bg-stone-100 dark:bg-slate-950 text-sky-800 dark:text-stone-300"
        >
          <div className="mx-auto max-w-screen-md">
            <h2 className="pb-6 text-lg md:text-xl leading-relaxed">
              {subjectRef.current}
            </h2>
            <textarea
              value={content}
              rows={3}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              onFocus={moveCaretAtEnd}
              autoFocus={true}
              placeholder="昔々あるところにおじいさんとおばあさんが住んでいました"
              className="w-full bg-transparent border-amber-200 overflow-hidden
              placeholder-stone-300 dark:placeholder-slate-700
              text-middle leading-loose md:text-lg md:leading-loose
              hover:border-b transition duration-300
              focus:outline-none focus:border-b focus:placeholder-transparent"
            ></textarea>
          </div>
        </div>
        <Footer />;
      </div>
    </>
  );
}

export default Page;
