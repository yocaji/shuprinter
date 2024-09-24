import React from 'react';
import { Link } from 'react-router-dom';
import { upsertNote } from '../hooks/api.ts';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

interface NavbarGoProps {
  saveStatus: string;
  setSaveStatus: (saveStatus: string) => void;
  noteId: string;
  subject: string;
  content: string;
}

function Navbar({
  saveStatus,
  setSaveStatus,
  noteId,
  content,
  subject,
}: NavbarGoProps) {
  const authContext = AuthContextConsumer();
  const login = authContext?.login;
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const handleReturnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (saveStatus === 'saved') return;
    const isConfirmed = window.confirm('変更を保存せずに戻りますか？');
    if (isConfirmed) return;
    e.preventDefault();
    e.currentTarget.blur();
  };

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!authContext?.currentUser) return;
    e.currentTarget.blur();
    setSaveStatus('saving');
    const userId = authContext.currentUser.uid;
    await upsertNote(noteId, subject, content, userId);
    setSaveStatus('saved');
  };

  const handleCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard
      .writeText(`${subject}\n\n${content}`)
      .then(() => {
        console.log('Content copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy content: ', err);
      });
    e.currentTarget.blur();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <header
      className="px-4 py-4 w-full text-sky-800 font-solid
      bg-stone-50 border-amber-300 border-t-4"
    >
      <div className="w-full max-w-screen-md mx-auto">
        {!authContext?.currentUser && (
          <div className="text-xs">
            Googleアカウントで
            <button
              onClick={login}
              className="border-b border-stone-200 hover:opacity-50 focus:opacity-50"
            >
              ログイン
            </button>
            すると、メモを保存することができます
          </div>
        )}
        <div className="flex items-center justify-between">
          <Link
            to={'/'}
            onClick={handleReturnClick}
            className="h-10 w-10 rounded-full inline-flex items-center justify-center
            border border-stone-200 text-xl
            hover:bg-amber-50 hover:border-none hover:ring-2 ring-offset-2 ring-amber-200
            focus:bg-amber-200 transition duration-300"
          >
            <span className="i-ph-arrow-left-light" />
          </Link>
          <div className="">
            <button
              type={'button'}
              onClick={handleSaveClick}
              disabled={
                !authContext?.currentUser ||
                saveStatus === 'saved' ||
                saveStatus === 'saving'
              }
              className="h-10 w-32 ps-1 inline-flex justify-center items-center gap-2
              rounded-s-full border border-stone-200
              text-sm
              hover:bg-amber-50 hover:border-none hover:ring-2 ring-offset-2 ring-amber-200
              focus:bg-amber-200
              disabled:opacity-40 disabled:pointer-events-none transition duration-300"
            >
              {saveStatus === 'unsaved' && (
                <>
                  <span className="i-ph-cloud-arrow-up-light text-base" />
                  保存する
                </>
              )}
              {saveStatus === 'saving' && (
                <div
                  className="animate-spin size-4
                  border-[2px] border-current border-t-transparent rounded-full text-stone-300"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              {saveStatus === 'saved' && (
                <>
                  <span className="i-ph-check-light text-base" />
                  保存済み
                </>
              )}
            </button>
            <button
              type={'button'}
              onClick={handleCopyClick}
              className="pe-1 h-10 w-10 inline-flex justify-center items-center
              rounded-e-full border-t border-r border-b border-stone-200 trantiion duration-300
              hover:bg-amber-50 hover:border-none hover:ring-2 ring-offset-2 ring-amber-200
              focus:bg-amber-200"
            >
              {isCopied ? (
                <>
                  <span className="i-ph-check-light" />
                </>
              ) : (
                <>
                  <span className="i-ph-clipboard-light" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
