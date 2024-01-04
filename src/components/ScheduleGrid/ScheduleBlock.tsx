import { ReactNode } from 'react';
import { DroppableProps } from 'src/utils/const';

interface ScheduleBlockProps {
  blockNumber: number;
  children: ReactNode;
  reference?: React.Ref<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function ScheduleBlock({
  blockNumber,
  className,
  children,
  droppableProps,
  reference,
  onClick,
  style
}: ScheduleBlockProps & DroppableProps) {
  return (
    <div
      ref={reference}
      className={`schedule-grid__block` + (className ? ` ${className}` : '')}
      {...droppableProps}
      onClick={onClick}
      style={style}
    >
      <span className="schedule-grid__block-number">{blockNumber}</span>
      {children}
    </div>
  );
}
