import {
  AiFillHome,
  AiFillSchedule,
  AiOutlineHome,
  AiOutlineSchedule,
  AiOutlineSwap,
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
import ScheduleTrade from 'src/pages/ScheduleTrade';
import { ProtectedRoute } from 'src/components';

interface SideBarOption {
  name: string;
  path: string;
  iconOutline: JSX.Element;
  iconFill: JSX.Element;
  for: string[];
}

export const sideBarOptions: SideBarOption[] = [
  {
    name: 'Home',
    path: '/home',
    iconOutline: <AiOutlineHome className="icon" />,
    iconFill: <AiFillHome className="icon" />,
    for: ['admin', 'student', 'teacher', 'departmentChief'],
  },
  {
    name: 'Manage Schedule',
    path: '/manage-schedule',
    iconOutline: <AiOutlineSchedule className="icon" />,
    iconFill: <AiFillSchedule className="icon" />,
    for: ['admin'],
  },
  {
    name: 'Editar disponibilidad',
    path: '/edit-availability',
    iconOutline: <AiOutlineSchedule className="icon" />,
    iconFill: <AiFillSchedule className="icon" />,
    for: ['admin', 'teacher', 'departmentChief'],
  },
  {
    name: 'Intercambiar horario',
    path: '/trade-schedule',
    iconOutline: <AiOutlineSwap className="icon" />,
    iconFill: <AiOutlineSwap className="icon" />,
    for: ['student'],
  },
];
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
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
          children: [],
        },
        {
          path: 'manage-schedule/edit-schedule/:career/:plan/:semester',
          element: <ScheduleEdit />,
        },
        {
          path: 'edit-availability',
          element: <ScheduleAvailability />,
        },
        {
          path: 'trade-schedule/:subject',
          element: <ScheduleTrade />,
        },
        {
          path: 'trade-schedule',
          element: <ScheduleTrade />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
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

export interface DraggableProps {
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  draggableProps?: DraggableProvidedDraggableProps;
}

export interface DroppableProps {
  droppableProps?: DroppableProvidedProps;
}
