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

  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.blur();
    setIsOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, newSubject: string) => {
    handleSubjectSubmit(e, newSubject);
    setCardSubject(newSubject);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={'btn btn-on-card'}
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
        <DialogBackdrop
          className={'fixed inset-0 bg-black/30 dark:bg-white/20'}
        />
        <div
          className={
            'fixed inset-0 flex w-screen items-center justify-center p-4'
          }
        >
          <DialogPanel className={'px-6 py-8 text-sm w-full max-w-lg dialog'}>
            <form
              name={'subject'}
              onSubmit={(e) => handleSubmit(e, e.currentTarget.subject.value)}
            >
              <div className={'flex flex-col gap-6 w-full'}>
                <input
                  type={'text'}
                  name={'subject'}
                  defaultValue={cardSubject}
                  className={'px-4 py-2 text-base input'}
                  required={true}
                  autoFocus={true}
                  data-autoFocus={true}
                />
                <div className={'flex justify-center gap-3'}>
                  <button
                    type={'button'}
                    className={'btn btn-secondary btn-sm'}
                    onClick={() => setIsOpen(false)}
                  >
                    閉じる
                  </button>
                  <button type={'submit'} className={'btn btn-primary btn-sm'}>
                    保存
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
