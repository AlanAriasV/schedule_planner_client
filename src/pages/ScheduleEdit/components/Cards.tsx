import { addScrolledClass } from 'src/utils/functions';
import { DraggableProps, DroppableProps } from 'src/utils/interfaces';

interface CardContainerProps {
  title: string;
  dataType?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  reference?: React.Ref<HTMLDivElement>;
}

export default function CardContainer({
  title,
  dataType,
  children,
  droppableProps,
  style,
  reference,
}: CardContainerProps & DroppableProps) {
  return (
    <section
      className={'section-card-container'}
      data-type={dataType}
    >
      <div
        ref={reference}
        className="card-container"
        onScroll={addScrolledClass}
        style={style}
        {...droppableProps}
      >
        <h3>{title}</h3>
        {children}
      </div>
    </section>
  );
}

interface CardProps {
  name: string;
  code: string;
  reference?: React.Ref<HTMLDivElement>;
}

export function Card({
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
