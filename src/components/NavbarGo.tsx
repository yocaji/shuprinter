import React from 'react';
import { Link } from 'react-router-dom';
import { updateNote } from '../hooks/api.ts';

interface NavbarGoProps {
  isSaved: boolean;
  setIsSaved: (isSaved: boolean) => void;
  id: string;
  subject: string;
  content: string;
}

function NavbarGo({
  isSaved,
  setIsSaved,
  id,
  content,
  subject,
}: NavbarGoProps) {
  const handleReturnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isSaved) return;
    const isConfirmed = window.confirm('変更を保存せずに戻りますか？');
    if (isConfirmed) return;
    e.preventDefault();
  };

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSaved(true);
    e.preventDefault();
    await updateNote(id, subject, content);
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(`${subject}\n\n${content}`)
      .then(() => {
        console.log('Content copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy content: ', err);
      });
  };

  return (
    <header
      className="px-4 py-4 w-full
      flex flex-wrap sm:justify-start sm:flex-nowrap
      bg-stone-50 border-amber-200 border-t-4"
    >
      <div
        className="w-full max-w-screen-md mx-auto 
        sm:flex sm:items-center sm:justify-between"
      >
        <div className="flex items-center justify-between">
          <Link
            to="/ready"
            onClick={handleReturnClick}
            className="px-2 py-1 flex-none rounded-lg
            text-xl text-gray-700
            hover:bg-amber-100 focus:outline-none focus:bg-amber-200"
          >
            <span className="i-ph-arrow-left-light" />
          </Link>
        </div>
        <div className="inline-flex rounded-lg">
          <button
            type={'button'}
            onClick={handleSaveClick}
            disabled={isSaved}
            className="py-2 px-4 -ms-px inline-flex justify-center items-center gap-2
            rounded-s-lg border border-stone-200 shadow-sm
            text-sm text-stone-800
            hover:bg-stone-100 focus:outline-none focus:bg-stone-100
            disabled:text-stone-300 disabled:pointer-events-none"
          >
            <span className="i-ph-cloud-arrow-up-light" />
            保存する
          </button>
          <button
            type={'button'}
            onClick={handleCopyClick}
            className="py-2 px-4 -ms-px inline-flex justify-center items-center gap-1
            rounded-e-lg border border-stone-200 shadow-sm
            text-sm text-stone-800
            hover:bg-stone-100 focus:outline-none focus:bg-stone-100"
          >
            <span className="i-ph-clipboard-light" />
            コピーする
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavbarGo;
