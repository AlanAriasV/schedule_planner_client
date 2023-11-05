import { DroppableProps } from 'src/utils/const';
import { addScrolledClass } from 'src/utils/functions';

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
