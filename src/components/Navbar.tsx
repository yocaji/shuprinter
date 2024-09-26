import React, { useEffect } from 'react';
import { upsertNote } from '../hooks/api.ts';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

interface NavbarGoProps {
  saveStatus: string;
  setSaveStatus: (saveStatus: string) => void;
  noteId: string;
  subject: string;
  content: string;
  handleReturn: () => void;
}

function Navbar({
  saveStatus,
  setSaveStatus,
  noteId,
  subject,
  content,
  handleReturn,
}: NavbarGoProps) {
  const authContext = AuthContextConsumer();
  const login = authContext?.login;
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [isGuest, setIsGuest] = React.useState<boolean>(false);
  const [isDismissed, setIsDismissed] = React.useState<boolean>(false);

  useEffect(() => {
    setIsGuest(!authContext?.currentUser);
  }, [authContext?.currentUser]);

  const handleDismissClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDismissed(true);
    e.currentTarget.blur();
  };

  const handleReturnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleReturn();
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
      className="sticky top-0 px-4 py-4 w-full text-sky-800 font-solid
      bg-stone-50 border-amber-300 border-t-4"
    >
      <div className="w-full max-w-screen-md mx-auto">
        {isGuest && !isDismissed && (
          <div
            className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300
            p-3 md:p-4 mb-4 border border-stone-200 rounded-lg
            text-sky-800 bg-white"
            role="alert"
            tabIndex={-1}
          >
            <div className="flex gap-2">
              <div>
                <span className="i-ph-info-bold" />
              </div>
              <p className="w-full text-xs leading-relaxed">
                Googleアカウントで
                <button
                  onClick={login}
                  className="border-b border-stone-300 hover:opacity-50 focus:opacity-50"
                >
                  ログイン
                </button>
                すると、メモを保存することができます
              </p>
              <div>
                <button
                  type={'button'}
                  onClick={handleDismissClick}
                  className="p-1 inline-flex rounded-lg
                  hover:bg-stone-100
                  focus:bg-stone-200"
                >
                  <span className="sr-only">Dismiss</span>
                  <span className="i-ph-x" />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type={'button'}
            onClick={handleReturnClick}
            className="h-10 w-10 rounded-full inline-flex items-center justify-center
            border border-stone-200 ring-offset-2 ring-amber-200
            text-xl
            hover:bg-amber-100 hover:ring-2 hover:border-none
            focus:bg-amber-200 focus:ring-2 focus:border-none focus:outline-none transition duration-300"
          >
            <span className="i-ph-arrow-left-light" />
          </button>
          <div className="">
            <button
              type={'button'}
              onClick={handleSaveClick}
              disabled={
                isGuest || saveStatus === 'saved' || saveStatus === 'saving'
              }
              className="h-10 w-32 ps-1 inline-flex justify-center items-center gap-2
              rounded-s-full border-l border-t border-b border-stone-200 ring-offset-2 ring-amber-200
              text-sm
              hover:bg-amber-100 hover:ring-2 hover:border-none
              focus:bg-amber-200 focus:ring-2 focus:border-none focus:outline-none transition duration-300
              disabled:opacity-40 disabled:pointer-events-none"
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
              rounded-e-full border border-stone-200 ring-offset-2 ring-amber-200
              hover:bg-amber-100 hover:ring-2 hover:border-none
              focus:bg-amber-200 focus:ring-2 focus:border-none focus:outline-none transition duration-300"
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
