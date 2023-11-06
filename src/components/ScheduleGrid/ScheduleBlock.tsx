import { ReactNode } from 'react';
import { DroppableProps } from 'src/utils/const';

interface ScheduleBlockProps {
  blockNumber: number;
  children: ReactNode;
  reference?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function ScheduleBlock({
  blockNumber,
  className,
  children,
  droppableProps,
  reference,
}: ScheduleBlockProps & DroppableProps) {
  return (
    <div
      ref={reference}
      className={`schedule-grid__block` + (className ? ` ${className}` : '')}
      {...droppableProps}
    >
      <span className="schedule-grid__block-number">{blockNumber}</span>
      {children}
    </div>
  );
}
