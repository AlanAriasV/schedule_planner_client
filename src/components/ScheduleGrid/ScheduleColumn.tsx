interface ScheduleColumnProps {
  children: React.ReactNode;
  title: string;
}

export default function ScheduleColumn({
  children,
  title,
}: ScheduleColumnProps) {
  return (
    <div className="schedule-grid__column">
      <h4 className="schedule-grid__column-name">{title}</h4>
      <div className="schedule-grid__column-blocks">{children}</div>
    </div>
  );
}
