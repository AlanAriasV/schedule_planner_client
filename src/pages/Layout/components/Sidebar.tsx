import { useState, useEffect } from 'react';
import { CustomButton, CustomNavLink } from 'src/components';
import { sideBarOptions } from 'src/utils/const';
import { AiOutlineMenu, AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useScheduleStore, useUserStore } from 'src/store';

export default function Sidebar() {
  const { role, resetUser } = useUserStore(state => state);
  const { days: schedule, resetSchedule } = useScheduleStore(state => state);
  const [expanded, setExpanded] = useState<boolean>(
    localStorage.getItem('expanded') === 'true' || false,
  );
  const navigate = useNavigate();

  const onclickLogout = () => {
    localStorage.removeItem('token');
    resetUser().then(() => {
      navigate('/login');
    });
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
        if (option.for.includes(role)) {
          return (
            <CustomNavLink
              key={option.path}
              {...option}
              onClick={
                option.path === '/manage-schedule'
                  ? () => {
                      if (schedule) {
                        resetSchedule();
                      }
                    }
                  : undefined
              }
            />
          );
        }
      })}
      <CustomButton
        onClick={onclickLogout}
        icon={<AiOutlineLogout className="icon" />}
        name="Logout"
      />
    </aside>
  );
}
