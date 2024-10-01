import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ComponentProps,
  FC,
} from 'react';
import { SaveStatus } from '../types';

type TextareaProps = ComponentProps<'textarea'> & {
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
    onChange,
    handleReturn,
    handleUpsertNote,
    ...rest
  } = props;
  const [cursor, setCursor] = useState<number>(0);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.setSelectionRange(cursor, cursor);
  }, [ref, cursor, content]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCursor(e.target.selectionEnd);
    onChange?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      (e.key === 'z' && (e.metaKey || e.ctrlKey))
    ) {
      e.preventDefault();
      const caretPosition = ref.current?.selectionEnd || 0;
      const currentValue = e.currentTarget.value;
      const before = currentValue.slice(0, caretPosition);
      const after = currentValue.slice(caretPosition);
      const newValue = `${before}🐾${after}`;
      e.currentTarget.value = newValue;
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
      ref={ref}
      defaultValue={content}
      onChange={(e) => handleChange(e)}
      onKeyDown={(e) => handleKeyDown(e)}
      onFocus={() => setCursor(-1)}
      autoFocus={true}
      {...rest}
    />
  );
};

export default InterruptedTextarea;
