import { DraggableProps } from 'src/utils/const';

interface ScheduleInfoProps {
  // subject: Subject;
  className: string;
  reference?: React.Ref<HTMLSpanElement>;
  text: string;
}

export default function ScheduleInfo({
  className,
  draggableProps,
  dragHandleProps,
  reference,
  text,
}: ScheduleInfoProps & DraggableProps) {
  return (
    <span
      ref={reference}
      className={`schedule-grid__block__info-${className}`}
      {...draggableProps}
      {...dragHandleProps}
    >
      {text}
    </span>
  );
}
