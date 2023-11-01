import {
  AiFillCalendar,
  AiFillCheckCircle,
  AiFillHome,
  AiFillSetting,
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineHome,
  AiOutlineSetting,
} from 'react-icons/ai';
import { Layout } from '../pages';
import { Navigate, createBrowserRouter } from 'react-router-dom';

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
    name: 'Calendar',
    path: '/calendar',
    iconOutline: <AiOutlineCalendar className="icon" />,
    iconFill: <AiFillCalendar className="icon" />,
  },
  {
    name: 'Tasks',
    path: '/tasks',
    iconOutline: <AiOutlineCheckCircle className="icon" />,
    iconFill: <AiFillCheckCircle className="icon" />,
  },
  {
    name: 'Settings',
    path: '/settings',
    iconOutline: <AiOutlineSetting className="icon" />,
    iconFill: <AiFillSetting className="icon" />,
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
          element: <h1>Home</h1>,
        },
        {
          path: 'calendar',
          element: <h1>Calendar</h1>,
        },
        {
          path: 'tasks',
          element: <h1>Tasks</h1>,
        },
        {
          path: 'settings',
          element: <h1>Settings</h1>,
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
