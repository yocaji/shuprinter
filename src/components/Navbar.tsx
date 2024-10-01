import React, { useEffect } from 'react';
import { upsertNote } from '../hooks/api.ts';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import { SaveStatus } from '../types.ts';

interface NavbarProps {
  saveStatus: string;
  setSaveStatus: (saveStatus: SaveStatus) => void;
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
}: NavbarProps) {
  const authContext = AuthContextConsumer();
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [isGuest, setIsGuest] = React.useState<boolean>(false);

  useEffect(() => {
    setIsGuest(!authContext?.currentUser);
  }, [authContext?.currentUser]);

  const handleReturnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleReturn();
    e.currentTarget.blur();
  };

  const handleLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    await authContext?.login();
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
      className="w-full h-20 flex items-center
      text-sky-800 dark:text-stone-300
      bg-stone-100 dark:bg-slate-900 border-amber-300 border-t-4"
    >
      <div className={'px-4 w-full max-w-screen-md mx-auto'}>
        <div className={'flex items-center justify-between gap-3'}>
          <button
            type={'button'}
            onClick={handleReturnClick}
            className={'btn btn-secondary h-10 w-10 shrink-0'}
          >
            <span className={'i-ph-arrow-left text-lg'} />
            <span className={'sr-only'}>Back</span>
          </button>
          <div className={'flex items-center gap-3'}>
            {isGuest ? (
              <button
                type={'button'}
                onClick={handleLoginClick}
                className={'btn btn-secondary px-3 h-10 text-sm gap-2'}
              >
                <span className={'i-ph-user-plus text-base'} />
                ログインして保存する
              </button>
            ) : (
              <button
                type={'button'}
                onClick={handleSaveClick}
                disabled={saveStatus === 'saved' || saveStatus === 'saving'}
                className={'btn btn-secondary px-3 h-10 text-sm gap-2'}
              >
                {saveStatus === 'unsaved' && (
                  <>
                    <span className={'i-ph-cloud-arrow-up text-base'} />
                    保存する
                  </>
                )}
                {saveStatus === 'saving' && (
                  <div
                    className="animate-spin size-4
                  border-[2px] border-current border-t-transparent rounded-full text-stone-300"
                    role={'status'}
                    aria-label={'loading'}
                  >
                    <span className={'sr-only'}>Loading...</span>
                  </div>
                )}
                {saveStatus === 'saved' && (
                  <>
                    <span className={'i-ph-check text-base'} />
                    保存済み
                  </>
                )}
              </button>
            )}
            <button
              type={'button'}
              onClick={handleCopyClick}
              className={'btn btn-secondary h-10 w-10 shrink-0'}
            >
              {isCopied ? (
                <>
                  <span className={'i-ph-check text-lg'} />
                  <span className={'sr-only'}>Copied</span>
                </>
              ) : (
                <>
                  <span className={'i-ph-clipboard text-lg'} />
                  <span className={'sr-only'}>Copy</span>
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
