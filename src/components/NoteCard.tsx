import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { FormEvent, MouseEvent, useState } from 'react';
import { deleteNote, upsertNote } from '../hooks/api.ts';
import SubjectEditorDialogButton from './SubjectEditorDialogButton.tsx';

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
  const [cardSubject, setCardSubject] = useState<string>(subject);

  const handleSubjectSubmit = async (
    e: FormEvent<HTMLFormElement>,
    editableSubject: string,
  ) => {
    e.preventDefault();
    // 0文字の場合の処理を入れる
    await upsertNote(id, editableSubject, content, userId);
    e.stopPropagation();
  };

  const handleDeleteClick = async (
    e: MouseEvent<HTMLButtonElement>,
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

  return (
    <Link
      to={'/page'}
      state={{ id: id, subject: cardSubject, content: content }}
      className="p-4 w-full
      outline-2 outline-offset-2 outline-amber-300 dark:outline-sky-800
      transition duration-300
      hover:outline
      focus:outline
      active:scale-[.99] card"
    >
      <div className="mb-2">
        <h3 className={'text-lg font-hand truncate'}>{cardSubject}</h3>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-sm">{dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</p>
        <div className="-mb-2 -me-1">
          <SubjectEditorDialogButton
            cardSubject={cardSubject}
            setCardSubject={setCardSubject}
            handleSubjectSubmit={handleSubjectSubmit}
          />
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
