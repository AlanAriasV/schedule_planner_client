interface ExpandButtonProps {
  text: string;
  className?: string;
  onClick: () => void;
  fillIcon: React.ReactNode;
  outlineIcon: React.ReactNode;
}

export default function ExpandButton({
  text,
  className,
  onClick,
  fillIcon,
  outlineIcon,
}: ExpandButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`expand-btn ${className ?? ''}`}
    >
      <div className="icon-container">
        <div className="icon">{fillIcon}</div>
        <div className="icon">{outlineIcon}</div>
      </div>
      <span>{text}</span>
    </button>
  );
}
