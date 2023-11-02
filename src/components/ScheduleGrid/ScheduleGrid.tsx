interface Props {
  days: string[];
  rows: React.ReactNode;
}

export default function ScheduleGrid({ days, rows }: Props) {
  return (
    <table className="schedule-grid">
      <thead>
        <tr>
          {days.map(day => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
