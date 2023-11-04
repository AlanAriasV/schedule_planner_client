import { addScrolledClass } from 'src/utils/functions';

type ScheduleGridProps = {
  children: React.ReactNode;
};

export default function ScheduleGrid({ children }: ScheduleGridProps) {
  return (
    <div
      className={`schedule-grid`}
      onScroll={addScrolledClass}
    >
      {children}
    </div>
  );
}
