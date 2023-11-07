import { ReactNode } from 'react';
import { DroppableProps } from 'src/utils/const';

interface ScheduleBlockProps {
  blockNumber: number;
  children: ReactNode;
  reference?: React.Ref<HTMLDivElement>;
  className?: string;
  onClick?: () => void;
}

export default function ScheduleBlock({
  blockNumber,
  className,
  children,
  droppableProps,
  reference,
  onClick,
}: ScheduleBlockProps & DroppableProps) {
  return (
    <div
      ref={reference}
      className={`schedule-grid__block` + (className ? ` ${className}` : '')}
      {...droppableProps}
      onClick={onClick}
    >
      <span className="schedule-grid__block-number">{blockNumber}</span>
      {children}
    </div>
  );
}
