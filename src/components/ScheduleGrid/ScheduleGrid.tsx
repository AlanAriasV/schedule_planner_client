import { addScrolledClass } from 'src/utils/functions';

type ScheduleGridProps = {
  children: React.ReactNode;
  scrollRef?: React.RefObject<HTMLDivElement>;
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

export default function ScheduleGrid({
  children,
  scrollRef,
  onScroll,
}: ScheduleGridProps) {
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    addScrolledClass(e);
    if (onScroll) {
      onScroll(e);
    }
  };

  return (
    <div
      className={`schedule-grid`}
      onScroll={handleScroll}
      ref={scrollRef}
    >
      {children}
    </div>
  );
}
