import { NavLink } from 'react-router-dom';

interface CustomNavLinkProps {
  iconFill?: JSX.Element;
  iconOutline?: JSX.Element;
  name: string;
  path: string;
  onClick?: () => void;
}

export default function CustomNavLink({
  iconFill,
  iconOutline,
  name,
  path,
  onClick,
}: CustomNavLinkProps) {
  return (
    <NavLink
      className={'sidebar-option'}
      to={path}
      onClick={onClick}
    >
      {(iconOutline || iconFill) && (
        <div className="icons-container">
          {iconOutline && iconOutline}
          {iconFill && iconFill}
        </div>
      )}
      <p>{name}</p>
    </NavLink>
  );
}
