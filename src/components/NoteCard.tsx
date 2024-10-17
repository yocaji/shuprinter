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
    <li className={'card p-4 w-full active:scale-[.99] font-hand'}>
      <Link
        to={'/track'}
        state={{ id: id, subject: cardSubject, content: content }}
      >
        <h3 className={'mb-2 text-lg truncate'}>{cardSubject}</h3>
        <div className={'flex justify-between items-end'}>
          <p className={'text-sm'} data-testid={'updated-at'}>
            {dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}
          </p>
          <div className={'-mb-2 -me-1 space-x-2'}>
            <SubjectEditorDialogButton
              cardSubject={cardSubject}
              setCardSubject={setCardSubject}
              handleSubjectSubmit={handleSubjectSubmit}
            />
            <button
              type={'button'}
              onClick={(e) => handleDeleteClick(e, id)}
              className={'btn btn-on-card'}
            >
              <span className={'i-ph-trash-light'} />
              <span className={'sr-only'}>Delete this note</span>
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default NoteCard;
