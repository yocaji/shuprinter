import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import React from 'react';
import { deleteNote, upsertNote } from '../hooks/api.ts';

interface NoteCardProps {
  id: string;
  subject: string;
  content: string;
  updatedAt: string;
  userId: string;
  onDelete: (id: string) => void;
}

function NoteCard({
  id,
  subject,
  content,
  updatedAt,
  userId,
  onDelete,
}: NoteCardProps) {
  const [subjectIsEditing, setSubjectIsEditing] =
    React.useState<boolean>(false);
  const [editableSubject, setEditableSubject] = React.useState<string>(subject);
  const [isDraggable, setIsDraggable] = React.useState<boolean>(true);

  const handleSubjectEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setSubjectIsEditing(true);
    setIsDraggable(false);
    e.currentTarget.blur();
  };

  const handleSubjectFixClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    // 0文字の場合の処理を入れる
    e.currentTarget.blur();
    await upsertNote(id, editableSubject, content, userId);
    setSubjectIsEditing(false);
    setIsDraggable(true);
    e.stopPropagation();
  };

  const handleSubjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await upsertNote(id, editableSubject, content, userId);
    setSubjectIsEditing(false);
    setIsDraggable(true);
    e.stopPropagation();
  };

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.blur();
    const selectedNoteUpdatedAt = dayjs(updatedAt).format('YYYY-MM-DD HH:mm');
    const isConfirmed = confirm(
      `このメモを削除しますか？\n\n${subject}\n\n${selectedNoteUpdatedAt}`,
    );
    if (!isConfirmed) return;
    const deletedNote = await deleteNote(id);
    if (!deletedNote) return;
    onDelete(id);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!subjectIsEditing) return;
    e.preventDefault();
  };

  return (
    <Link
      to={'/page'}
      state={{ id: id, subject: editableSubject, content: content }}
      onClick={handleCardClick}
      className="p-4 w-full
      outline-2 outline-offset-2 outline-amber-300 dark:outline-sky-800
      transition duration-300
      hover:outline
      focus:outline
      active:scale-[.99] card"
      draggable={isDraggable}
    >
      <div className="mb-2">
        {subjectIsEditing ? (
          <form
            name={'subject'}
            className="flex mx-auto max-w-screen-md"
            onSubmit={(e) => handleSubjectSubmit(e)}
          >
            <input
              type={'text'}
              value={editableSubject}
              onChange={(e) => setEditableSubject(e.target.value)}
              className="px-2 py-1 w-full
              border-b border-stone-200 bg-transparent
              hover:border-amber-100
              focus:border-amber-200 focus:outline-none"
              required={true}
              autoFocus={true}
            />
          </form>
        ) : (
          <h3 className={'text-lg font-hand truncate'}>{editableSubject}</h3>
        )}
      </div>
      <div className="flex justify-between items-end">
        <p className="text-sm">{dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</p>
        <div className="-mb-2 -me-1">
          {subjectIsEditing ? (
            <button
              type={'button'}
              onClick={(e) => handleSubjectFixClick(e)}
              className="px-2 py-1 rounded-lg
              outline-2 outline-offset-2 outline-amber-200 dark:outline-sky-950
              transition duration-300
              hover:bg-stone-100 dark:hover:bg-slate-800
              focus:bg-stone-200 dark:focus:bg-sky-950 focus:outline"
            >
              <span className="i-ph-check-light" />
            </button>
          ) : (
            <button
              type={'button'}
              onClick={(e) => handleSubjectEditClick(e)}
              className="px-2 py-1 rounded-lg
              outline-2 outline-offset-2 outline-amber-200 dark:outline-sky-950
              transition duration-300
              hover:bg-stone-100 dark:hover:bg-slate-800
              focus:bg-stone-200 dark:focus:bg-sky-950 focus:outline"
            >
              <span className="i-ph-pencil-simple-line-light" />
            </button>
          )}
          <button
            type={'button'}
            onClick={(e) => handleDeleteClick(e, id)}
            className="px-2 py-1 rounded-lg
            outline-2 outline-offset-2 outline-amber-200 dark:outline-sky-950
            transition duration-300
            hover:bg-stone-100 dark:hover:bg-slate-800
            focus:bg-stone-200 dark:focus:bg-sky-950 focus:outline"
          >
            <span className="i-ph-trash-light" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
