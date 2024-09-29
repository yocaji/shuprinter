import { useState } from 'react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

function SignUpDialogButton() {
  const authContext = AuthContextConsumer();
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginClick = () => {
    setIsOpen(false);
    authContext?.login();
  };

  return (
    <>
      <button
        className={'btn-secondary h-6 w-6 text-lg'}
        onClick={() => setIsOpen(true)}
      >
        <span className={'i-ph-info-light'} />
        <span className={'sr-only'}>How to enable the save button</span>
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
          <DialogPanel className={'p-8 max-w-md space-y-4 text-sm card'}>
            <p className={'leading-loose'}>
              Googleアカウントで
              <button
                onClick={handleLoginClick}
                className={'underline hover:opacity-50 focus:opacity-50'}
              >
                ログイン
              </button>
              すると、メモを保存できるようになります
            </p>
            <div className={'flex justify-center'}>
              <button
                className={'btn btn-secondary px-3 py-1'}
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default SignUpDialogButton;
