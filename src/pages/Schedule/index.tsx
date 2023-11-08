import { ScheduleGrid, ScheduleColumn, ScheduleBlock } from 'src/components';
import ScheduleInfo from 'src/components/ScheduleGrid/ScheduleInfo';
import { scheduleExample, blockHours } from 'src/utils/dataTemp';

export default function Schedule() {
  return (
    <main className="schedule-visualizer">
      <h1 className="schedule-visualizer__title">Horario</h1>
      <div className="schedule-grid__container">
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
          {scheduleExample.map(({ dayName: day, blocks }, dayIndex) => (
            <ScheduleColumn
              key={dayIndex}
              title={day}
            >
              {blocks.map(
                ({ blockNumber, subject, laboratory, teacher }, blockIndex) => (
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
      </div>
    </main>
  );
}
