interface ScheduleColumnProps {
  title: string;
  children: React.ReactNode;
}

export default function ScheduleColumn({
  title,
  children,
}: ScheduleColumnProps) {
  return (
    <div className="schedule-grid__column">
      <h4 className="schedule-grid__column-name">{title}</h4>
      <div className="schedule-grid__column-blocks">{children}</div>
    </div>
  );
}
