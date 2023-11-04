import {
  ScheduleGrid,
  ScheduleColumn,
  ScheduleBlock,
  ScheduleInfo,
} from 'src/components';
import { Card, CardContainer } from './components';
import { blockHours, schedule } from '../Schedule';
import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { ScheduleDay } from 'src/utils/interfaces';

interface Teacher {
  code: string;
  name: string;
  career: {
    code: string;
    name: string;
    subjectCode: string;
  };
}

const teachers: Teacher[] = [
  {
    code: '1',
    name: 'John Doe',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '2',
    name: 'Jane Smith',
    career: {
      code: 'IE',
      name: 'Ingeniería Electrónica',
      subjectCode: 'EE',
    },
  },
  {
    code: '3',
    name: 'Robert Johnson',
    career: {
      code: 'IM',
      name: 'Ingeniería Mecánica',
      subjectCode: 'ME',
    },
  },
  {
    code: '4',
    name: 'Michael Brown',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '5',
    name: 'Sarah Davis',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '6',
    name: 'Davcode M"i"ller',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '7',
    name: 'Jessica Wilson',
    career: {
      code: 'II',
      name: 'Ingeniería Industrial',
      subjectCode: 'IN',
    },
  },
  {
    code: '8',
    name: 'Daniel Moore',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '9',
    name: 'Emily Taylor',
    career: {
      code: 'IEE',
      name: 'Ingeniería en Energía',
      subjectCode: 'EN',
    },
  },
  {
    code: '10',
    name: 'James Anderson',
    career: {
      code: 'IMT',
      name: 'Ingeniería en Mecatrónica',
      subjectCode: 'MT',
    },
  },
];

interface Subject {
  code: string;
  name: string;
}

const subjects: Subject[] = [
  { code: 'CS101', name: 'Computer Science 101' },
  { code: 'MA101', name: 'Mathematics 101' },
  { code: 'EN101', name: 'English 101' },
  { code: 'PH101', name: 'Physics 101' },
];

interface Laboratory {
  code: string;
  name: string;
}

const laboratories: Laboratory[] = [
  { code: 'LAB1', name: 'Laboratorio 1' },
  { code: 'LAB2', name: 'Laboratorio 2' },
  { code: 'LAB3', name: 'Laboratorio 3' },
  { code: 'LAB4', name: 'Laboratorio 4' },
  { code: 'LAB5', name: 'Laboratorio 5' },
  { code: 'LAB6', name: 'Laboratorio 6' },
  { code: 'LAB7', name: 'Laboratorio 7' },
  { code: 'LAB8', name: 'Laboratorio 8' },
  { code: 'LAB9', name: 'Laboratorio 9' },
  { code: 'LAB10', name: 'Laboratorio 10' },
  { code: 'LAB11', name: 'Laboratorio 11' },
  { code: 'LAB12', name: 'Laboratorio 12' },
  { code: 'LAB13', name: 'Laboratorio 13' },
  { code: 'LAB14', name: 'Laboratorio 14' },
  { code: 'LAB15', name: 'Laboratorio 15' },
  { code: 'LAB16', name: 'Laboratorio 16' },
  { code: 'LAB17', name: 'Laboratorio 17' },
  { code: 'LAB18', name: 'Laboratorio 18' },
  { code: 'LAB19', name: 'Laboratorio 19' },
  { code: 'LAB20', name: 'Laboratorio 20' },
  { code: 'LAB21', name: 'Laboratorio 21' },
  { code: 'LAB22', name: 'Laboratorio 22' },
  { code: 'LAB23', name: 'Laboratorio 23' },
  { code: 'LAB24', name: 'Laboratorio 24' },
  { code: 'LAB25', name: 'Laboratorio 25' },
  { code: 'LAB26', name: 'Laboratorio 26' },
  { code: 'LAB27', name: 'Laboratorio 27' },
  { code: 'LAB28', name: 'Laboratorio 28' },
  { code: 'LAB29', name: 'Laboratorio 29' },
  { code: 'LAB30', name: 'Laboratorio 30' },
];

// interface ID {
//   uuid: `${string}-${string}-${string}-${string}-${string}`;
// }

interface DnDItem<T> {
  [key: string]: {
    type: string;
    name: string;
    items: T[];
  };
}

const initialData: DnDItem<ScheduleDay | Subject | Teacher | Laboratory>[] = [
  {
    [crypto.randomUUID()]: {
      items: schedule,
      name: 'Horario',
      type: 'schedule',
    },
  },
  {
    [crypto.randomUUID()]: {
      items: subjects,
      name: 'Asignaturas',
      type: 'subjects',
    },
  },
  {
    [crypto.randomUUID()]: {
      items: teachers,
      name: 'Profesores',
      type: 'teachers',
    },
  },
  {
    [crypto.randomUUID()]: {
      items: laboratories,
      name: 'Laboratorios',
      type: 'laboratories',
    },
  },
];

export default function ScheduleEdit() {
  const [[schedule, subjects, teachers, laboratories], setItems] =
    useState(initialData);

  const onDragEnd = (result: DropResult) => {
    //TODO: move item from one list to another
  };

  return (
    <main className="schedule-edit-container">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(schedule).map(([uuid, { name, items }]) => (
          <CardContainer
            dataType="schedule"
            title={name}
            key={uuid}
            style={{ gridTemplateRows: '100%', overflow: 'hidden' }}
          >
            <ScheduleGrid key={uuid}>
              <ScheduleColumn title="Hora">
                {blockHours.map((blockHour, blockIndex) => (
                  <ScheduleBlock
                    key={blockIndex}
                    blockNumber={blockIndex + 1}
                  >
                    <ScheduleInfo
                      text={blockHour}
                      className="name"
                    />
                  </ScheduleBlock>
                ))}
              </ScheduleColumn>
              {(items as ScheduleDay[]).map(({ dayName: day, blocks }) => (
                <ScheduleColumn
                  key={day}
                  title={day}
                >
                  {blocks.map(blockInfo => (
                    <Droppable
                      key={`${blockInfo.blockNumber}-${day}`}
                      droppableId={`${blockInfo.blockNumber}-${day}`}
                    >
                      {(provided, _) => (
                        <ScheduleBlock
                          blockNumber={blockInfo.blockNumber}
                          droppableProps={provided.droppableProps}
                          reference={provided.innerRef}
                        >
                          <ScheduleInfo
                            text={blockInfo.subject['code']}
                            className={'code'}
                          />
                          {['name', 'teacher', 'place'].map(
                            (className, index) => (
                              <Draggable
                                key={`${day}-${blockInfo.blockNumber}-${className}`}
                                draggableId={`${day}-${blockInfo.blockNumber}-${className}`}
                                index={index}
                              >
                                {(provided, _) => (
                                  <ScheduleInfo
                                    text={
                                      blockInfo.subject[
                                        className as keyof Subject
                                      ]
                                    }
                                    className={className}
                                    reference={provided.innerRef}
                                    draggableProps={provided.draggableProps}
                                    dragHandleProps={provided.dragHandleProps}
                                  />
                                )}
                              </Draggable>
                            ),
                          )}
                          {provided.placeholder}
                        </ScheduleBlock>
                      )}
                    </Droppable>
                  ))}
                </ScheduleColumn>
              ))}
            </ScheduleGrid>
          </CardContainer>
        ))}
        {[subjects, teachers, laboratories].map(obj =>
          Object.entries(obj).map(([uuid, { items, name, type }]) => (
            <Droppable
              droppableId={uuid}
              key={uuid}
              isDropDisabled={true}
            >
              {(provided, _) => (
                <CardContainer
                  dataType={type}
                  title={name}
                  reference={provided.innerRef}
                  droppableProps={provided.droppableProps}
                >
                  {type !== 'teachers' && (
                    <>
                      {(items as (Subject | Laboratory)[]).map(
                        ({ code, name }, index) => (
                          <Draggable
                            draggableId={code}
                            index={index}
                            key={code}
                          >
                            {(provided, _) => (
                              <Card
                                code={code}
                                name={name}
                                reference={provided.innerRef}
                                draggableProps={provided.draggableProps}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            )}
                          </Draggable>
                        ),
                      )}
                    </>
                  )}
                  {type === 'teachers' && (
                    <>
                      {(items as Teacher[]).map(
                        ({ code, name, career }, index) => (
                          <Draggable
                            draggableId={code}
                            index={index}
                            key={code}
                          >
                            {(provided, _) => (
                              <Card
                                code={career.code}
                                name={name}
                                reference={provided.innerRef}
                                draggableProps={provided.draggableProps}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            )}
                          </Draggable>
                        ),
                      )}
                    </>
                  )}
                  {provided.placeholder}
                </CardContainer>
              )}
            </Droppable>
          )),
        )}
      </DragDropContext>
    </main>
  );
}
