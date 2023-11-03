type ScheduleGridProps = {
  children: React.ReactNode;
};

export default function ScheduleGrid({ children }: ScheduleGridProps) {
  return <div className="schedule-grid">{children}</div>;
}
