import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarGo from '../components/NavbarGo.tsx';
import Footer from '../components/Footer.tsx';
import { saveNoteLocal } from '../hooks/localStorage.ts';
import { updateNote } from '../hooks/api.ts';

function Go() {
  const location = useLocation();
  const noteIdRef = useRef<string>(location.state.id);
  const [subject, setSubject] = useState<string>(location.state.subject);
  const [content, setContent] = useState<string>('');
  const [subjectIsEditing, setSubjectIsEditing] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  useEffect(() => {
    setContent(location.state.content);
  }, [location.state.content]);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };
  useEffect(() => {
    saveNoteLocal(noteIdRef.current, subject, content);
  }, [subject, content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };
  useEffect(() => {
    saveNoteLocal(noteIdRef.current, subject, content);
  }, [subject, content]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      await updateNote(noteIdRef.current, subject, content);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
    }
  };

  const handleEditClick = () => {
    setSubjectIsEditing(true);
  };

  const handleSubjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // subjectのみ更新できるようにする
    await updateNote(noteIdRef.current, subject, content);
    setSubjectIsEditing(false);
  };

  return (
    <>
      <NavbarGo
        isSaved={isSaved}
        setIsSaved={setIsSaved}
        id={noteIdRef.current}
        subject={subject}
        content={content}
      />
      <div className="px-4 py-6 bg-stone-50">
        {subjectIsEditing ? (
          <form
            name="subject"
            onSubmit={handleSubjectSubmit}
            className="flex mx-auto max-w-screen-md"
          >
            <input
              type={'text'}
              name={'subject'}
              value={subject}
              onChange={handleSubjectChange}
              className="py-3 px-4 block w-full text-lg text-gray-800 border border-gray-200 shadow-sm rounded-s-lg focus:outline-none"
              required={true}
            />
            <button
              type={'button'}
              name={'cancel'}
              onClick={() => setSubjectIsEditing(false)}
              className="py-3 px-4 -ms-px inline-flex text-xl font-medium border border-gray-200 bg-white shadow-sm text-gray-500 hover:bg-stone-100 focus:outline-none focus:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="i-ph-check-light" />
            </button>
            <button
              type={'submit'}
              className="py-3 px-4 -ms-px inline-flex text-xl font-medium rounded-e-lg border border-gray-200 bg-white shadow-sm text-gray-500 hover:bg-stone-100 focus:outline-none focus:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="i-ph-arrow-arc-left-light" />
            </button>
          </form>
        ) : (
          <div className="mx-auto max-w-screen-md flex gap-x-1">
            <h2 className="pb-1 text-xl truncate">{subject}</h2>
            <button
              type={'button'}
              onClick={handleEditClick}
              className="px-2 rounded-lg
              text-xl font-medium text-slate-600
              hover:bg-yellow-300 focus:outline-none focus:bg-yellow-300"
            >
              <span className="i-ph-pencil-simple-line-light" />
            </button>
          </div>
        )}
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
