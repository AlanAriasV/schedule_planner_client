import {
  AiFillHome,
  AiFillSchedule,
  AiOutlineHome,
  AiOutlineSchedule,
} from 'react-icons/ai';
import { IoMdSwap } from 'react-icons/io';
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
    path: '/edit-schedule/ICCI/2019/5',
    iconOutline: <AiOutlineSchedule className="icon" />,
    iconFill: <AiFillSchedule className="icon" />,
  },
  {
    name: 'Editar disponibilidad',
    path: '/edit-availability',
    iconOutline: <AiOutlineSchedule className="icon" />,
    iconFill: <AiFillSchedule className="icon" />,
  },
  {
    name: 'Intercambiar horario',
    path: '/trade-schedule',
    iconOutline: <IoMdSwap className="icon" />,
    iconFill: <IoMdSwap className="icon" />,
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
        },
        {
          path: 'edit-schedule/:career/:plan/:semester',
          element: <ScheduleEdit />,
        },
        {
          path: 'edit-availability',
          element: <ScheduleAvailability />,
        },
        {
          path: 'trade-schedule',
          element: <ScheduleTrade />,
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
