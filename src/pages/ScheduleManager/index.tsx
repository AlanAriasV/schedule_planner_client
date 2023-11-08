import { ScheduleGrid, ScheduleColumn, ScheduleBlock } from 'src/components';
import ScheduleInfo from 'src/components/ScheduleGrid/ScheduleInfo';
import { useEffect, useRef, useState } from 'react';
import { ScheduleSelect } from './components';
import autoAnimate from '@formkit/auto-animate';
import { blockHours } from 'src/utils/dataTemp';
import { EditButton } from 'src/components/';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState<ScheduleDay[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const parent = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    parent.current && autoAnimate(parent.current, { duration: 250 });
  }, [parent]);

  const handleEditBtn = () => {
    navigate('/edit-schedule');
  };

  const handleGenerateBtn = () => {
    setLoading(true);
    const fetchingToast = toast.loading('Generando horario...', {
      toastId: 'fetching',
    });

    //     .then(res => {
    //       toast.update(id, {render: "Horario generado", type: "success", isLoading: false});
    //  }).catch(err => {
    //         toast.update(id, {render: "Error al generar horario", type: "error", isLoading: false });
    //    });
  };

  return (
    <main className="schedule-manager">
      <h1 className="schedule-manager__title">Horario</h1>
      <div className="schedule-manager__select-schedule-container">
        <ScheduleSelect setSchedule={setSchedule} />
      </div>
      <div
        ref={parent}
        className="schedule-grid__container manager"
      >
        {schedule && (
          <>
            <ScheduleGrid>
              {schedule.length <= 0 && (
                <div className="generate-schedule__container">
                  <h3>No hay horario</h3>
                  <button
                    className="btn"
                    onClick={handleGenerateBtn}
                    disabled={loading}
                  >
                    Generar
                  </button>
                </div>
              )}
              {schedule.length > 0 && (
                <>
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
                  <EditButton
                    text={'Editar'}
                    onClick={handleEditBtn}
                  />
                </>
              )}
            </ScheduleGrid>
          </>
        )}
      </div>
    </main>
  );
}
