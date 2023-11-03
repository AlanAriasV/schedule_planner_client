interface ScheduleBlockProps {
  block: ScheduleBlock;
}

export default function ScheduleBlock({ block }: ScheduleBlockProps) {
  const { blockNumber, subject } = block;
  const { code, name, teacher, place } = subject;
  return (
    <div className="schedule-grid__block">
      <span className="schedule-grid__block-number">{blockNumber}</span>
      <span className="schedule-grid__block-subject-code">{code}</span>
      <span className="schedule-grid__block-subject-name">{name}</span>
      <span className="schedule-grid__block-subject-teacher">{teacher}</span>
      <span className="schedule-grid__block-subject-place">{place}</span>
    </div>
  );
}
