import { ScheduleGrid, ScheduleColumn, ScheduleBlock } from 'src/components';
import ScheduleInfo from 'src/components/ScheduleGrid/ScheduleInfo';
import { useEffect, useRef, useState } from 'react';
import ScheduleSelect from './components/OptionsSelect';
import { AiFillEdit, AiOutlineEdit } from 'react-icons/ai';
import autoAnimate from '@formkit/auto-animate';

export const blockHours = ['8:00 - 8:45', '8:45 - 9:30', '9:40 - 10:25'];

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState<ScheduleDay[] | undefined>(
    undefined,
  );
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current, { duration: 250 });
  }, [parent]);

  return (
    <main className="schedule-manager">
      <h1 className="schedule-manager__title">Horario</h1>
      <div className="schedule-manager__select-schedule-container">
        <ScheduleSelect setSchedule={setSchedule} />
      </div>
      <div
        ref={parent}
        className="schedule-manager__container"
      >
        {schedule && (
          <>
            <ScheduleGrid>
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
              {schedule.map(({ dayName: day, blocks }, dayIndex) => (
                <ScheduleColumn
                  key={dayIndex}
                  title={day}
                >
                  {blocks.map(
                    (
                      { blockNumber, subject, laboratory, teacher },
                      blockIndex,
                    ) => (
                      <ScheduleBlock
                        key={blockIndex}
                        blockNumber={blockNumber}
                      >
                        {Object.entries(subject).map(([key, value]) => (
                          <ScheduleInfo
                            key={crypto.randomUUID()}
                            text={value}
                            className={key}
                          />
                        ))}
                        <ScheduleInfo
                          key={crypto.randomUUID()}
                          text={teacher.name}
                          className={'teacher'}
                        />
                        <ScheduleInfo
                          key={crypto.randomUUID()}
                          text={laboratory.name}
                          className={'laboratory'}
                        />
                      </ScheduleBlock>
                    ),
                  )}
                </ScheduleColumn>
              ))}
            </ScheduleGrid>
            <button>
              <div className="icon-container">
                <AiOutlineEdit className="icon" />
                <AiFillEdit className="icon" />
              </div>
              <span>Editar</span>
            </button>
          </>
        )}
      </div>
    </main>
  );
}
