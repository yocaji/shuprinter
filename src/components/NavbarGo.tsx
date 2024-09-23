import React from 'react';
import { Link } from 'react-router-dom';
import { upsertNote } from '../hooks/api.ts';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

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
  const authContext = AuthContextConsumer();

  // 未ログインの場合は何も表示しない
  if (!authContext?.currentUser) return;

  const login = authContext.login;
  const userId = authContext.currentUser.uid;

  const handleReturnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isSaved) return;
    const isConfirmed = window.confirm('変更を保存せずに戻りますか？');
    if (isConfirmed) return;
    e.preventDefault();
  };

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSaved(true);
    e.preventDefault();
    await upsertNote(id, subject, content, userId);
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
      className="px-4 py-4 w-full text-sky-800 font-solid
      bg-stone-50 border-amber-200 border-t-4"
    >
      <div
        className="w-full max-w-screen-md mx-auto
        flex items-start justify-between"
      >
        <Link
          to={'/ready'}
          onClick={handleReturnClick}
          className="px-2 py-1 rounded-lg text-xl
          hover:bg-yellow-100 focus:bg-yellow-200 focus:ring-2 ring-offset-2 ring-amber-300"
        >
          <span className="i-ph-arrow-left-light" />
        </Link>
        <div className="flex flex-col items-end">
          <div className="text-sm">
            <button
              type={'button'}
              onClick={handleSaveClick}
              disabled={isSaved}
              className="px-3 py-1 -me-px inline-flex justify-center items-center gap-2
              rounded-s-lg border border-stone-100 border-2
              hover:bg-stone-100 focus:outline-none focus:bg-stone-100
              disabled:opacity-40 disabled:pointer-events-none"
            >
              <span className="i-ph-cloud-arrow-up-light" />
              保存する
            </button>
            <button
              type={'button'}
              onClick={handleCopyClick}
              className="px-3 py-1 -ms-px inline-flex justify-center items-center gap-1
              rounded-e-lg border border-stone-100 border-2
              hover:bg-stone-100 focus:outline-none focus:bg-stone-100"
            >
              <span className="i-ph-clipboard-light" />
              コピーする
            </button>
          </div>
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
        </div>
      </div>
    </header>
  );
}

export default NavbarGo;
