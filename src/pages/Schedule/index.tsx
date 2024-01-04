import { useEffect, useState } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import { toast } from 'react-toastify';
import { axiosInstance } from 'src/api';
import { ScheduleGrid, ScheduleColumn, ScheduleBlock } from 'src/components';
import ScheduleInfo from 'src/components/ScheduleGrid/ScheduleInfo';
import { useUserStore } from 'src/store';
import { blockHours } from 'src/utils/dataTemp';

export default function Schedule() {
  const run = useUserStore((state) => state.run);
  const [personalSchedule, setPersonalSchedule] = useState<ScheduleDay[]>();

  useEffect(() => {
    toast.loading('Cargando horario', { toastId: 'loading' })
    axiosInstance.get(`${import.meta.env.VITE_API_URL}/schedule/private?run=${run}`).then((res) => {
      if (res.data.schedule) {
        setPersonalSchedule(res.data.schedule);
        toast.update('loading', { render: 'Se cargo el horario correctamente', type: 'success', isLoading: false, autoClose: 3000 });
        return
      }
    }
    ).catch((err) => {
      toast.update('loading', { render: 'No se pudo cargar el horario', type: 'error', isLoading: false, autoClose: 3000 });
      console.log(err);
    }
    );
  }, []);

  return (
    <main className="schedule-visualizer">
      <h1 className="schedule-visualizer__title">Horario</h1>
      <div className="schedule-grid__container">
        {personalSchedule ?
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
            {personalSchedule.map(({ dayName: day, blocks }, dayIndex) => (
              <ScheduleColumn
                key={dayIndex}
                title={day}
              >
                {blocks.map(
                  ({ blockNumber, subject, laboratory, teacher }, blockIndex) => {
                    if (blocks.length > blockIndex + 1 && blocks[blockIndex + 1].blockNumber === blockNumber) return null
                    // const conflictArray = blocks.filter(
                    //   (block) => block.blockNumber === blockNumber,
                    // );
                    // const sizePerBlock = 100 / conflictArray.length;

                    return (
                      <ScheduleBlock
                        // style={{ height: `calc(150px * ${sizePerBlock}%)` }}
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
                    )
                  },
                )}
              </ScheduleColumn>
            ))}
          </ScheduleGrid> :
          <div className='loading-icon__container'>
            <FadeLoader />
          </div>}
      </div>
    </main>
  );
}
