import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import Navbar from '../components/Navbar.tsx';
import { saveNoteLocal } from '../hooks/localStorage.ts';
import { upsertNote } from '../hooks/api.ts';
import { SaveStatus } from '../types.ts';
import InterruptedTextarea from '../components/InterruptedTextarea.tsx';

function Track() {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = AuthContextConsumer();
  const noteIdRef = useRef<string>(location.state.id);
  const subjectRef = useRef<string>(location.state.subject);
  const [content, setContent] = useState<string>(location.state.content || '');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(
    location.state.content === undefined ? 'unsaved' : 'saved',
  );

  useEffect(() => {
    saveNoteLocal(noteIdRef.current, subjectRef.current, content);
  }, [content]);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaveStatus('unsaved');
  };

  const handleUpsertNote = async () => {
    if (!authContext?.currentUser) return;
    const userId = authContext.currentUser.uid;
    await upsertNote(noteIdRef.current, subjectRef.current, content, userId);
  };

  const handleReturn = () => {
    if (saveStatus === 'saved') return navigate('/');
    const isConfirmed = window.confirm('変更を保存せずに戻りますか？');
    if (isConfirmed) return navigate('/');
  };

  return (
    <div className={'flex flex-col h-svh gap-2 bg-stone-100 dark:bg-slate-900'}>
      <Navbar
        saveStatus={saveStatus}
        setSaveStatus={setSaveStatus}
        noteId={noteIdRef.current}
        subject={subjectRef.current}
        content={content}
        handleReturn={handleReturn}
      />
      <h2
        className={
          'text px-4 mx-auto w-full max-w-screen-md text-xl leading-relaxed font-hand'
        }
      >
        {subjectRef.current}
      </h2>
      <InterruptedTextarea
        content={content}
        setContent={setContent}
        setSaveStatus={setSaveStatus}
        onChange={handleContentChange}
        handleReturn={handleReturn}
        handleUpsertNote={handleUpsertNote}
        className={'textarea grow w-full mx-auto max-w-screen-md font-hand'}
        placeholder="昔々あるところにおじいさんとおばあさんが住んでいました"
      />
    </div>
  );
}

export default Track;
