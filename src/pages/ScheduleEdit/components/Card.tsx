import { DraggableProps } from 'src/utils/const';

interface CardProps {
  name: string;
  code: string;
  reference?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function Card({
  name,
  code,
  reference,
  dragHandleProps,
  draggableProps,
  className,
}: CardProps & DraggableProps) {
  return (
    <div
      ref={reference}
      className={`card ${className} `}
      {...draggableProps}
      {...dragHandleProps}
    >
      <span className="card-label-name">Nombre:</span>
      <span className="card-name">{name}</span>
      <hr />
      <span className="card-label-code">Código:</span>
      <span className="card-code">{code}</span>
    </div>
  );
}
