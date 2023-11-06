import { DropResult } from 'react-beautiful-dnd';
import {
  laboratories,
  scheduleExample,
  subjects,
  teachers,
} from 'src/utils/dataTemp';

type ID = `${string}-${string}-${string}-${string}-${string}`;

export interface DnDItem<T> {
  [key: ID]: {
    type: string;
    name: string;
    items: T[];
  };
}

export const initialData: {
  [key: string]: DnDItem<ScheduleDay | Subject | Teacher | Laboratory>;
} = {
  schedule: {
    [crypto.randomUUID()]: {
      items: scheduleExample,
      name: 'Horario',
      type: 'schedule',
    },
  },
  subjects: {
    [crypto.randomUUID()]: {
      items: subjects,
      name: 'Asignaturas',
      type: 'subjects',
    },
  },
  teachers: {
    [crypto.randomUUID()]: {
      items: teachers,
      name: 'Profesores',
      type: 'teachers',
    },
  },
  laboratories: {
    [crypto.randomUUID()]: {
      items: laboratories,
      name: 'Laboratorios',
      type: 'laboratories',
    },
  },
};

export function getBlockIndexKey({
  result: { destination },
  schedule,
}: {
  result: DropResult;
  schedule: DnDItem<ScheduleDay>;
}) {
  const [key, { items }] = Object.entries(schedule).flat();

  const [block, day] = destination!.droppableId.split('-');

  const index = (items as ScheduleDay[]).findIndex(({ dayName, blocks }) => {
    if (dayName === day) {
      return blocks.find(({ blockNumber }) => {
        if (blockNumber === Number(block)) {
          return true;
        }
      });
    }
  });

  return { block, index, key };
}

export interface GetItemProps {
  draggableId: DropResult['draggableId'];
  drop: {
    [key: string]: DnDItem<ScheduleDay | Subject | Teacher | Laboratory>;
  };
  type: string;
}

export function getItem({
  draggableId,
  drop,
  type,
}: GetItemProps): (Subject | Teacher | Laboratory | undefined)[] {
  console.log(type);
  if (type === 'subjects') {
    const subjects = drop.subjects as DnDItem<Subject>;
    return Object.values(subjects).map(({ items }) =>
      (items as Subject[]).find(({ code }) => code === draggableId),
    );
  } else if (type === 'teachers') {
    console.log(draggableId);
    const teachers = drop.teachers as DnDItem<Teacher>;
    return Object.values(teachers).map(({ items }) =>
      (items as Teacher[]).find(({ code }) => {
        console.log(code);
        return code === draggableId;
      }),
    );
  } else {
    const laboratories = drop.laboratories as DnDItem<Laboratory>;
    return Object.values(laboratories).map(({ items }) =>
      (items as Laboratory[]).find(({ code }) => code === draggableId),
    );
  }
}

export interface GetNewScheduleProps {
  prev: ScheduleDay[];
  block: string;
  index: number;
  item: { code: string; name: string } | undefined;
  type: string;
}

export function getNewSchedule({
  prev,
  block,
  index,
  item,
  type,
}: GetNewScheduleProps): ScheduleDay[] {
  if (type === 'subjects') {
    prev[index].blocks[Number(block) - 1].subject = item as Subject;
  } else if (type === 'teachers') {
    prev[index].blocks[Number(block) - 1].teacher = {
      code: item?.code ?? '',
      name: item?.name ?? '',
    };
  } else {
    prev[index].blocks[Number(block) - 1].laboratory = item as Laboratory;
  }
  return prev;
}

export function isFilled({
  schedule,
  type,
}: {
  schedule: ScheduleBlock;
  type: string;
}) {
  if (type === 'subjects') {
    console.log(schedule.subject);
    if (schedule.subject.code === '' && schedule.subject.name === '')
      return false;
  } else if (type === 'teachers') {
    if (schedule.teacher.code === '' && schedule.teacher.name === '')
      return false;
  } else {
    if (schedule.laboratory.code === '' && schedule.laboratory.name === '')
      return false;
  }
  return true;
}
