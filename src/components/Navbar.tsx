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
      className="fixed top-0 z-50 px-4 w-full h-16 md:h-20 flex items-center
      text-sky-800 dark:text-stone-300 font-solid
      bg-stone-100 dark:bg-slate-950 border-amber-300 border-t-4"
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
            className={'h-10 w-10 rounded-full text-xl btn-secondary'}
          >
            <span className="i-ph-arrow-left-light" />
            <span className="sr-only">Back</span>
          </button>
          <div className={'flex gap-3'}>
            <button
              type={'button'}
              onClick={handleSaveClick}
              disabled={
                isGuest || saveStatus === 'saved' || saveStatus === 'saving'
              }
              className="h-10 w-32 text-sm gap-2 btn-secondary"
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
              className="h-10 w-10 btn-secondary"
            >
              {isCopied ? (
                <>
                  <span className="i-ph-check-light" />
                  <span className="sr-only">Copied</span>
                </>
              ) : (
                <>
                  <span className="i-ph-clipboard-light" />
                  <span className="sr-only">Copy</span>
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
