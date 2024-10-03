import {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ComponentProps,
  FC,
} from 'react';
import { SaveStatus } from '../types';

type TextareaProps = ComponentProps<'textarea'> & {
  content: string;
  setContent: (content: string) => void;
  setSaveStatus: (status: SaveStatus) => void;
  handleReturn: () => void;
  handleUpsertNote: () => void;
};
const InterruptedTextarea: FC<TextareaProps> = (props) => {
  const {
    content,
    setContent,
    setSaveStatus,
    handleReturn,
    handleUpsertNote,
    ...rest
  } = props;

  const [cursor, setCursor] = useState<number>(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const isComposingRef = useRef<boolean>(false);

  useEffect(() => {
    if (isComposingRef.current) return;
    textAreaRef.current?.setSelectionRange(cursor, cursor);
  }, [textAreaRef, cursor]);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaveStatus('unsaved');
    setCursor(e.target.selectionEnd);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposingRef.current) return;
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      (e.key === 'z' && (e.metaKey || e.ctrlKey))
    ) {
      e.preventDefault();
      const caretPosition = e.currentTarget.selectionEnd || 0;
      const before = content?.slice(0, caretPosition);
      const after = content?.slice(caretPosition);
      const newValue = `${before}🐾${after}`;
      setContent(newValue);
      setCursor(caretPosition + 2);
      setSaveStatus('unsaved');
    } else if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleReturn();
    } else if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setSaveStatus('saving');
      handleUpsertNote();
      setSaveStatus('saved');
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      value={content}
      onChange={(e) => handleContentChange(e)}
      onKeyDown={(e) => handleKeyDown(e)}
      onCompositionStart={() => (isComposingRef.current = true)}
      onCompositionEnd={() => (isComposingRef.current = false)}
      onFocus={() => setCursor(-1)}
      autoFocus={true}
      {...rest}
    />
  );
};

export default InterruptedTextarea;
