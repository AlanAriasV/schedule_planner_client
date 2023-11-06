import {
  AiFillHome,
  AiFillSchedule,
  AiOutlineHome,
  AiOutlineSchedule,
} from 'react-icons/ai';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
  DroppableProvidedProps,
} from 'react-beautiful-dnd';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
  Layout,
  Login,
  Schedule,
  ScheduleAvailability,
  ScheduleEdit,
  ScheduleManager,
} from 'src/pages';

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
    name: 'Manage Schedule',
    path: '/manage-schedule',
    iconOutline: <AiOutlineSchedule className="icon" />,
    iconFill: <AiFillSchedule className="icon" />,
  },
  {
    name: 'Edit Schedule',
    path: '/edit-schedule',
    iconOutline: <AiOutlineSchedule className="icon" />,
    iconFill: <AiFillSchedule className="icon" />,
  },
  {
    name: 'Editar disponibilidad',
    path: '/edit-availability',
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
          path: 'manage-schedule',
          element: <ScheduleManager />,
        },
        {
          path: 'edit-schedule',
          element: <ScheduleEdit />,
        },
        {
          path: 'edit-availability',
          element: <ScheduleAvailability />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={'/home'} />,
    },
    {
      path: 'login',
      element: <Login />,
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    },
  },
);

export interface DraggableProps {
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  draggableProps?: DraggableProvidedDraggableProps;
}

export interface DroppableProps {
  droppableProps?: DroppableProvidedProps;
}
