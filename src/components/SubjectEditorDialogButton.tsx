import { useState, MouseEvent, FormEvent } from 'react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';

interface SubjectEditorDialogButtonProps {
  cardSubject: string;
  setCardSubject: (subject: string) => void;
  handleSubjectSubmit: (e: FormEvent<HTMLFormElement>, subject: string) => void;
}

function SubjectEditorDialogButton({
  cardSubject,
  setCardSubject,
  handleSubjectSubmit,
}: SubjectEditorDialogButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState(cardSubject);

  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.blur();
    setIsOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSubjectSubmit(e, subject);
    setCardSubject(subject);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={'btn btn-secondary h-6 w-6 text-lg'}
        onClick={(e) => handleEditButtonClick(e)}
      >
        <span className={'i-ph-pencil-simple-line-light'} />
        <span className={'sr-only'}>Edit title</span>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={'relative z-50'}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div
          className={
            'fixed inset-0 flex w-screen items-center justify-center p-4'
          }
        >
          <DialogPanel className={'px-6 py-8 text-sm card w-full max-w-lg'}>
            <form name={'subject'} onSubmit={(e) => handleSubmit(e)}>
              <div className={'flex flex-col gap-6 w-full'}>
                <input
                  type={'text'}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={'input px-4 py-2 text-base'}
                  required={true}
                  data-autoFocus={true}
                />
                <div className={'flex justify-center gap-3'}>
                  <button
                    type={'button'}
                    className={'btn btn-secondary px-3 py-1'}
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type={'submit'}
                    className={'btn btn-secondary px-3 py-1'}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default SubjectEditorDialogButton;
