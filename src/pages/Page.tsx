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
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar
        saveStatus={saveStatus}
        setSaveStatus={setSaveStatus}
        noteId={noteIdRef.current}
        subject={subjectRef.current}
        content={content}
        handleReturn={handleReturn}
      />
      <div className="px-4 pb-12 grow bg-stone-50 text-sky-800">
        <div className="mx-auto max-w-screen-md">
          <h2 className="pb-6 text-xl">{subjectRef.current}</h2>
          <textarea
            value={content}
            rows={6}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={moveCaretAtEnd}
            autoFocus={true}
            placeholder="昔々あるところにおじいさんとおばあさんが住んでいました。"
            className="w-full bg-transparent placeholder-stone-300 min-h-full
            text-middle leading-loose md:text-lg md:leading-loose
            focus:outline-none focus:placeholder-stone-50"
          ></textarea>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
