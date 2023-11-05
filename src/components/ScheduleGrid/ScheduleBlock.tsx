import { ReactNode } from 'react';
import { DroppableProps } from 'src/utils/const';

interface ScheduleBlockProps {
  blockNumber: number;
  children: ReactNode;
  reference?: React.Ref<HTMLDivElement>;
}

export default function ScheduleBlock({
  blockNumber,
  children,
  droppableProps,
  reference,
}: ScheduleBlockProps & DroppableProps) {
  return (
    <div
      ref={reference}
      className="schedule-grid__block"
      {...droppableProps}
    >
      <span className="schedule-grid__block-number">{blockNumber}</span>
      {children}
    </div>
  );
}
