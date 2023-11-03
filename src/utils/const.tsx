import {
  AiFillHome,
  AiFillSchedule,
  AiOutlineHome,
  AiOutlineSchedule,
} from 'react-icons/ai';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Layout, Schedule, ScheduleEdit } from 'src/pages';

interface SideBarOption {
  name: string;
  path: string;
  iconOutline: JSX.Element;
  iconFill: JSX.Element;
}

export const sideBarOptions: SideBarOption[] = [
  {
    name: 'Home',
    path: '/home',
    iconOutline: <AiOutlineHome className="icon" />,
    iconFill: <AiFillHome className="icon" />,
  },
  {
    name: 'Edit Schedule',
    path: '/edit-schedule',
    iconOutline: <AiOutlineSchedule className="icon" />,
    iconFill: <AiFillSchedule className="icon" />,
  },
];
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to={'/home'} />,
        },
        {
          path: 'home',
          element: <Schedule />,
        },
        {
          path: 'edit-schedule',
          element: <ScheduleEdit />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={'/home'} />,
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    },
  },
);
