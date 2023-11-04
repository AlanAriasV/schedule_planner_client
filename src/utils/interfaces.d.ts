import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
  DroppableProvidedProps,
} from 'react-beautiful-dnd';

interface Subject {
  code: string;
  name: string;
  teacher: string;
  place: string;
}
interface ScheduleBlock {
  blockNumber: number;
  subject: Subject;
}

interface ScheduleDay {
  dayName: string;
  blocks: ScheduleBlock[];
}

interface BlockHours {
  blockNumber: number;
  start: string;
  end: string;
}
interface DraggableProps {
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  draggableProps?: DraggableProvidedDraggableProps;
}

interface DroppableProps {
  droppableProps?: DroppableProvidedProps;
}
