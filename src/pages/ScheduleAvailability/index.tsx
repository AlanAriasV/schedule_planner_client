import {
  ScheduleGrid,
  ScheduleColumn,
  ScheduleBlock,
  ScheduleInfo,
} from 'src/components';

import {
  scheduleExample,
  // TeacherAvailability,
  blockHours,
} from 'src/utils/dataTemp';

export default function ScheduleAvailability() {
  console.log(blockHours);
  return (
    <main className="schedule-visualizer">
      <h1 className="schedule-visualizer__title">Horario de disponibilidad</h1>
      <div className="schedule-visualizer__container">
        <ScheduleGrid>
          {/* <ScheduleColumn title="Hora">
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
          </ScheduleColumn> */}
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
