import { ScheduleGrid, ScheduleColumn, ScheduleBlock } from 'src/components';
import ScheduleInfo from 'src/components/ScheduleGrid/ScheduleInfo';
import { useEffect, useRef, useState } from 'react';
import { ScheduleSelect } from './components';
import autoAnimate from '@formkit/auto-animate';
import { blockHours } from 'src/utils/dataTemp';
import { EditButton } from 'src/components/EditButton';
import { useNavigate } from 'react-router-dom';

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState<ScheduleDay[] | undefined>(
    undefined,
  );
  const parent = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    parent.current && autoAnimate(parent.current, { duration: 250 });
  }, [parent]);

  const handleEditBtn = () => {
    navigate('/edit-schedule');
  };

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
                    className="hour-block"
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
            <EditButton
              text={'Editar'}
              onClick={handleEditBtn}
            />
          </>
        )}
      </div>
    </main>
  );
}
