interface ScheduleInfoProps {
  subject: Subject;
}

export default function ScheduleInfo({ subject }: ScheduleInfoProps) {
  const { code, name, teacher, place } = subject;
  return (
    <>
      <span className="schedule-grid__block__info-code">{code}</span>
      <span className="schedule-grid__block__info-name">{name}</span>
      <span className="schedule-grid__block__info-teacher">{teacher}</span>
      <span className="schedule-grid__block__info-place">{place}</span>
    </>
  );
}
