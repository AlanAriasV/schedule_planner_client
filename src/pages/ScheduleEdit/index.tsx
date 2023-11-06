import {
  ScheduleGrid,
  ScheduleColumn,
  ScheduleBlock,
  ScheduleInfo,
} from 'src/components';
import { Card, CardContainer } from './components';
import { blockHours } from '../Schedule';
import {
  // useEffect,
  useState,
} from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import {
  DnDItem,
  getBlockIndexKey,
  getItem,
  getNewSchedule,
  initialData,
  isFilled,
} from './functions';

interface OccupiedBlocks {
  day: string;
  block: number;
}

export default function ScheduleEdit() {
  const [schedule, setSchedule] = useState<DnDItem<ScheduleDay>>(
    initialData.schedule as DnDItem<ScheduleDay>,
  );
  const [subjects, setSubjects] = useState<DnDItem<Subject>>(
    initialData.subjects as DnDItem<Subject>,
  );
  const teachers = initialData.teachers as DnDItem<Teacher>;
  const laboratories = initialData.laboratories as DnDItem<Laboratory>;
  const [occupiedBlocks, _] = useState<OccupiedBlocks[]>([]);

  //TODO: implement axios query to get all data

  const deleteAssignment = ({
    day,
    block,
    code,
    type,
  }: {
    day: string;
    block: number;
    code: string;
    type: string;
  }) => {
    const [{ key, item }] = Object.entries(schedule)
      .map(([key, { items }]) => {
        return {
          key,
          item: (items as ScheduleDay[]).find(({ dayName }) => dayName === day),
        };
      })
      .flat();
    if (!item) return;
    switch (type) {
      case 'subject':
        item.blocks[block - 1].subject = {
          code: '',
          name: '',
        };
        // (Object.values(subjects) as Subject[]);
        const [{ key, subject }] = Object.entries(subjects).map(
          ([key, { items }]) => ({
            key,
            subject: (items as Subject[]).find(({ code: subjectCode }) => {
              return subjectCode === code;
            }),
          }),
        );
        if (!subject) return;
        subject.maxBlocks++;
        setSubjects(prev => ({
          ...prev,
          [key]: {
            ...prev[key as keyof typeof prev],
            items: [...prev[key as keyof typeof prev].items],
          },
        }));
        break;
      case 'teacher':
        item.blocks[block - 1].teacher = {
          code: '',
          name: '',
        };
        break;
      case 'laboratory':
        item.blocks[block - 1].laboratory = {
          code: '',
          name: '',
        };
        break;
    }
    setSchedule(prev => ({
      ...schedule,
      [key]: {
        ...prev[key as keyof typeof prev],
        items: [...prev[key as keyof typeof prev].items],
      },
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, draggableId } = result;

    const dropSource: string = [subjects, teachers, laboratories]
      .map(drop =>
        Object.entries(drop).map(([uuid, { type }]) =>
          uuid === source.droppableId ? type : null,
        ),
      )
      .flat()
      .reduce((acc, curr) => (curr ? curr : acc))!;

    const { block, index, key } = getBlockIndexKey({
      result,
      schedule: schedule,
    });

    if (
      isFilled({
        schedule: [...schedule[key].items][index].blocks[Number(block) - 1],
        type: dropSource,
      })
    )
      return;

    const drop: {
      [key: string]: DnDItem<ScheduleDay | Subject | Teacher | Laboratory>;
    } = {
      schedule,
      subjects,
      teachers,
      laboratories,
    };

    const [item] = getItem({
      draggableId: draggableId,
      drop: drop,
      type: dropSource,
    });

    if (dropSource === 'subjects') (item as Subject).maxBlocks--;

    const newSchedule = getNewSchedule({
      prev: [...schedule[key].items],
      block,
      index,
      item,
      type: dropSource,
    });

    setSchedule({
      ...schedule,
      [key]: {
        ...schedule[key],
        items: newSchedule,
      },
    });
  };

  // useEffect(() => {
  //   console.log(schedule);
  // }, [schedule]);

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
              <ScheduleColumn
                title="Hora"
                dataColor={'white'}
              >
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
                  key={crypto.randomUUID()}
                  title={day}
                  dataColor={'white'}
                >
                  {blocks.map(
                    ({ blockNumber, subject, teacher, laboratory }) => (
                      <Droppable
                        key={`${blockNumber}-${day}`}
                        droppableId={`${blockNumber}-${day}`}
                        isDropDisabled={occupiedBlocks.some(
                          ({ day: occupiedDay, block: occupiedBlock }) =>
                            occupiedDay === day &&
                            occupiedBlock === blockNumber,
                        )}
                      >
                        {(provided, _) => (
                          <ScheduleBlock
                            blockNumber={blockNumber}
                            droppableProps={provided.droppableProps}
                            reference={provided.innerRef}
                          >
                            <ScheduleInfo
                              text={subject['code']}
                              className={'code'}
                            />

                            {['name', 'teacher', 'laboratory'].map(
                              (key, index) => {
                                let className = '';
                                let text = '';
                                let code = '';
                                switch (key) {
                                  case 'name':
                                    className = 'name';
                                    text = subject.name;
                                    code = subject.code;
                                    break;
                                  case 'teacher':
                                    className = 'teacher';
                                    text = teacher.name;
                                    code = teacher.code;
                                    break;
                                  case 'laboratory':
                                    className = 'laboratory';
                                    text = laboratory.name;
                                    code = laboratory.code;
                                    break;
                                }
                                return (
                                  <Draggable
                                    key={`${day}-${blockNumber}-${className}-${code}`}
                                    draggableId={`${day}-${blockNumber}-${className}-${code}`}
                                    index={index}
                                    isDragDisabled={true}
                                  >
                                    {(provided, _) => (
                                      <ScheduleInfo
                                        text={text}
                                        className={className}
                                        reference={provided.innerRef}
                                        draggableProps={provided.draggableProps}
                                        dragHandleProps={
                                          provided.dragHandleProps
                                        }
                                        onClick={() =>
                                          deleteAssignment({
                                            block: blockNumber,
                                            code: code,
                                            day: day,
                                            type: key.replace(
                                              'name',
                                              'subject',
                                            ),
                                          })
                                        }
                                      />
                                    )}
                                  </Draggable>
                                );
                              },
                            )}

                            {provided.placeholder}
                          </ScheduleBlock>
                        )}
                      </Droppable>
                    ),
                  )}
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
                        (item, index) => {
                          const { code, name } = item;
                          let isDragDisabled = false;
                          if ((item as Subject).maxBlocks !== undefined) {
                            isDragDisabled = (item as Subject).maxBlocks === 0;
                          }
                          return (
                            <Draggable
                              draggableId={code}
                              index={index}
                              key={code}
                              isDragDisabled={isDragDisabled}
                            >
                              {(provided, _) => (
                                <Card
                                  code={code}
                                  name={name}
                                  reference={provided.innerRef}
                                  draggableProps={provided.draggableProps}
                                  dragHandleProps={provided.dragHandleProps}
                                  className={
                                    isDragDisabled ? 'isDragDisabled' : ''
                                  }
                                />
                              )}
                            </Draggable>
                          );
                        },
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
