interface CardContainerProps {
  title: string;
  dataType?: string;
  children?: React.ReactNode;
}

export default function CardContainer({
  title,
  dataType,
  children,
}: CardContainerProps) {
  return (
    <section
      className={'section-card-container'}
      data-type={dataType}
    >
      <div className="card-container">
        <h3>{title}</h3>
        {children}
      </div>
    </section>
  );
}

interface CardProps {
  name: string;
  code: string;
}

export function Card({ name, code }: CardProps) {
  return (
    <div className="card">
      <span className="card-label-name">Nombre:</span>
      <span className="card-name">{name}</span>
      <hr />
      <span className="card-label-code">Código:</span>
      <span className="card-code">{code}</span>
    </div>
  );
}
