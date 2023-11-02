interface CustomButtonProps {
  icon?: JSX.Element;
  name: string;
  onClick: () => void;
}

export default function CustomButton({
  icon,
  name,
  onClick,
}: CustomButtonProps) {
  return (
    <button className={"sidebar-option"} onClick={onClick}>
      {icon && <div className="icons-container">{icon}</div>}
      <p>{name}</p>
    </button>
  );
}
