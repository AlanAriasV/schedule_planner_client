interface ScheduleColumnProps {
  children: React.ReactNode;
  title: string;
  dataColor?: string;
}

export default function ScheduleColumn({
  children,
  title,
  dataColor = '',
}: ScheduleColumnProps) {
  return (
    <div className="schedule-grid__column">
      <div className="schedule-grid__column-name">
        <h4 data-color={dataColor}>{title}</h4>
      </div>
      <div className="schedule-grid__column-blocks">{children}</div>
    </div>
  );
}
