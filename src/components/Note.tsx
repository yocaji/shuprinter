import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import React from 'react';
import { deleteNote } from '../hooks/api.ts';

interface NoteCardProps {
  id: string;
  subject: string;
  content: string;
  updatedAt: string;
  onDelete: (id: string) => void;
}

function NoteCard({
  id,
  subject,
  content,
  updatedAt,
  onDelete,
}: NoteCardProps) {
  const [subjectIsEditing, setSubjectIsEditing] =
    React.useState<boolean>(false);

  const handleSubjectEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSubjectIsEditing(true);
    e.preventDefault();
  };

  const handleSubjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    setSubjectIsEditing(false);
    e.preventDefault();
  };

  const handleDeleteClick = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
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
      key={id}
      to={'/go'}
      state={{ id: id, subject: subject, content: content }}
      className="flex justify-between mb-3 w-full bg-stone-50 border rounded-xl 
      hover:shadow-sm focus:outline-none focus:shadow-lg transition"
    >
      <div className="p-4">
        {subjectIsEditing ? (
          <form name="subject" className="flex mx-auto max-w-screen-md">
            <button
              type={'button'}
              onClick={() => handleSubjectSubmit}
              className="px-2 py-1 rounded-lg
              hover:bg-stone-100 focus:bg-stone-200"
            >
              <span className="i-ph-check-light" />
            </button>
            <input
              type={'text'}
              name={'subject'}
              value={subject}
              className="px-2 py-1 block w-full
              border-b border-stone-200 bg-transparent
              focus:outline-none"
              required={true}
            />
          </form>
        ) : (
          <div className="flex items-center gap-1">
            <button
              type={'button'}
              onClick={(e) => handleSubjectEditClick(e)}
              className="px-2 py-1 rounded-lg
              hover:bg-stone-100 focus:bg-stone-200"
            >
              <span className="i-ph-pencil-simple-line-light" />
            </button>
            <h3 className="mb-2 text-lg">{subject}</h3>
          </div>
        )}
        <p className="text-sm">{dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <div className="">
        <button
          type={'button'}
          onClick={(e) => handleDeleteClick(id, e)}
          className="m-2 px-2 py-1 rounded-lg
          hover:bg-stone-100 focus:bg-stone-200"
        >
          <span className="i-ph-trash-light" />
        </button>
      </div>
    </Link>
  );
}

export default NoteCard;
