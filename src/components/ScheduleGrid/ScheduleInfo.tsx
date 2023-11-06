import { DraggableProps } from 'src/utils/const';

interface ScheduleInfoProps {
  // subject: Subject;
  className: string;
  reference?: React.Ref<HTMLSpanElement>;
  text: string;
  onClick?: () => void;
}

export default function ScheduleInfo({
  className,
  draggableProps,
  dragHandleProps,
  reference,
  text,
  onClick,
}: ScheduleInfoProps & DraggableProps) {
  return (
    <span
      ref={reference}
      className={`schedule-grid__block__info-${className}`}
      {...draggableProps}
      {...dragHandleProps}
      onClick={onClick}
    >
      {text}
    </span>
  );
}
