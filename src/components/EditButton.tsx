import { AiFillEdit, AiOutlineEdit } from 'react-icons/ai';

interface editButtonProps {
  text: string;
  className?: string;
  onClick: () => void;
}

export function EditButton({ text, className, onClick }: editButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`edit-btn ${className}`}
    >
      <div className="icon-container">
        <AiOutlineEdit className="icon" />
        <AiFillEdit className="icon" />
      </div>
      <span>{text}</span>
    </button>
  );
}
