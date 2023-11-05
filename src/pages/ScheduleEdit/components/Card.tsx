import { DraggableProps } from 'src/utils/const';

interface CardProps {
  name: string;
  code: string;
  reference?: React.Ref<HTMLDivElement>;
}

export default function Card({
  name,
  code,
  reference,
  dragHandleProps,
  draggableProps,
}: CardProps & DraggableProps) {
  return (
    <div
      ref={reference}
      className="card"
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
