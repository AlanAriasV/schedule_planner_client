interface Props {
  blockNumber: number;
  place: string;
  teacher: string;
  subject: Subject;
}
export default function ScheduleInfo({
  blockNumber,
  subject,
  teacher,
  place,
}: Props) {
  return (
    <div className="schedule-info__container">
      <span className="schedule-info__number">{blockNumber}</span>
      <span className="schedule-info__code">{subject.code}</span>
      <span className="schedule-info__name">{subject.name}</span>
      <span className="schedule-info__teacher">{teacher}</span>
      <span className="schedule-info__place">{place}</span>
    </div>
  );
}
