import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  FocusEvent,
  ChangeEvent,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import Navbar from '../components/Navbar.tsx';
import { saveNoteLocal } from '../hooks/localStorage.ts';
import { upsertNote } from '../hooks/api.ts';
import { SaveStatus } from '../types.ts';

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

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      setContent(`${content}🐾`);
      setSaveStatus('unsaved');
    } else if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleReturn();
    } else if (e.key === 'z' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setContent(`${content}🐾`);
      setSaveStatus('unsaved');
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

  const moveCaretAtEnd = (e: FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    e.target.value = '';
    e.target.value = value;
  };

  return (
    <div className={'flex flex-col h-svh bg-stone-100 dark:bg-slate-900'}>
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
          'text px-4 pb-3 mx-auto w-full max-w-screen-md text-lg md:text-xl font-hand'
        }
      >
        {subjectRef.current}
      </h2>
      <textarea
        value={content}
        onChange={handleContentChange}
        onKeyDown={handleKeyDown}
        onFocus={moveCaretAtEnd}
        autoFocus={true}
        placeholder="昔々あるところにおじいさんとおばあさんが住んでいました"
        className={'textarea font-hand grow w-full mx-auto max-w-screen-md'}
      ></textarea>
    </div>
  );
}

export default Track;
