import { ReactNode } from 'react';

interface ScheduleBlockProps {
  blockNumber: number;
  children: ReactNode;
}

export default function ScheduleBlock({
  blockNumber,
  children,
}: ScheduleBlockProps) {
  return (
    <div className="schedule-grid__block">
      <span className="schedule-grid__block-number">{blockNumber}</span>
      {children}
    </div>
  );
}
