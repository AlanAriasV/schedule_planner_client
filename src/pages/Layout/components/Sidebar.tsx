import { useState, useEffect } from 'react';
import { CustomButton, CustomNavLink } from 'src/components';
import { sideBarOptions } from 'src/utils/const';
import { AiOutlineMenu, AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'src/store/useUserStore';

export default function Sidebar() {
  const { resetUser } = useUserStore(state => state);
  const [expanded, setExpanded] = useState<boolean>(
    localStorage.getItem('expanded') === 'true' || false,
  );
  const navigate = useNavigate();

  const onclickLogout = () => {
    localStorage.removeItem('token');
    resetUser();
    navigate('/login');
  };

  useEffect(() => {
    localStorage.setItem('expanded', expanded.toString());
  }, [expanded]);

  return (
    <aside
      className={'sidebar'}
      style={{ maxWidth: expanded ? '225px' : '60px' }}
    >
      <CustomButton
        onClick={() => {
          setExpanded(!expanded);
        }}
        icon={<AiOutlineMenu className="icon" />}
        name="Menu"
      />
      {sideBarOptions.map(option => {
        return (
          <CustomNavLink
            key={option.path}
            {...option}
          />
        );
      })}
      <CustomButton
        onClick={onclickLogout}
        icon={<AiOutlineLogout className="icon" />}
        name="Logout"
      />
    </aside>
  );
}
