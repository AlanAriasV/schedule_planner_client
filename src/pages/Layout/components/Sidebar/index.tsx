import { NavLink } from 'react-router-dom';
import { sideBarOptions } from '../../../../utils/const';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Sidebar() {
  const [expanded, setExpanded] = useState<boolean>(false);

  const sideBarClass = `sidebar ${expanded ? 'expanded' : ''}`;
  return (
    <aside className={sideBarClass}>
      <button
        className={'sidebar-option'}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="icons-container">
          <AiOutlineMenu className="icon" />
          <AiOutlineMenu className="icon" />
        </div>
        <p>Menu</p>
      </button>
      {sideBarOptions.map(({ name, path, iconFill, iconOutline }, index) => {
        return (
          <NavLink
            className={'sidebar-option'}
            key={index}
            to={path}
          >
            <div className="icons-container">
              {iconOutline}
              {iconFill}
            </div>
            <p>{name}</p>
          </NavLink>
        );
      })}
    </aside>
  );
}
