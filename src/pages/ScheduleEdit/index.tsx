import {
  ScheduleGrid,
  ScheduleColumn,
  ScheduleBlock,
  ScheduleInfo,
} from 'src/components';
import { Card, CardContainer } from './components';
import { blockHours } from '../Schedule';
import { useEffect, useState } from 'react';
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

export default function ScheduleEdit() {
  const [schedule, setSchedule] = useState<DnDItem<ScheduleDay>>(
    initialData.schedule as DnDItem<ScheduleDay>,
  );

  const [subjects] = useState<DnDItem<Subject>>(
    initialData.subjects as DnDItem<Subject>,
  );

  // TODO: Update Block times from subjects on set schedule

  const teachers = initialData.teachers as DnDItem<Teacher>;

  const laboratories = initialData.laboratories as DnDItem<Laboratory>;

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
    console.log(item);

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
    // setSchedule();

    // A -> B
  };

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

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
                  key={day}
                  title={day}
                  dataColor={'white'}
                >
                  {blocks.map(
                    ({ blockNumber, subject, teacher, laboratory }) => (
                      <Droppable
                        key={`${blockNumber}-${day}`}
                        droppableId={`${blockNumber}-${day}`}
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
                                switch (key) {
                                  case 'name':
                                    className = 'name';
                                    text = subject.name;
                                    break;
                                  case 'teacher':
                                    className = 'teacher';
                                    text = teacher.name;
                                    break;
                                  case 'laboratory':
                                    className = 'laboratory';
                                    text = laboratory.name;
                                    break;
                                }
                                return (
                                  <Draggable
                                    key={`${day}-${blockNumber}-${className}`}
                                    draggableId={`${day}-${blockNumber}-${className}`}
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
