import { ScheduleGrid, ScheduleColumn, ScheduleBlock } from 'src/components';
import ScheduleInfo from 'src/components/ScheduleGrid/ScheduleInfo';
import { ScheduleDay, Subject } from 'src/utils/interfaces';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const subjects = [
  {
    code: 'MATH1',
    name: 'Mathematics 101',
    teacher: 'Mr. Smith',
    place: '101',
  },
  {
    code: 'SCI1',
    name: 'Science 101',
    teacher: 'Mrs. Johnson',
    place: '202',
  },
  {
    code: 'ENG1',
    name: 'English 101',
    teacher: 'Ms. Davis',
    place: '303',
  },
  {
    code: 'HIS1',
    name: 'History 101',
    teacher: 'Dr. Brown',
    place: '404',
  },
  {
    code: 'ART1',
    name: 'Art 101',
    teacher: 'Professor Green',
    place: 'Room 505',
  },
];

export const schedule: ScheduleDay[] = days.map(day => ({
  dayName: day,
  blocks: Array.from({ length: 14 }, (_, i) => ({
    blockNumber: i + 1,
    subject:
      Math.random() > 0.5
        ? subjects[Math.floor(Math.random() * subjects.length)]
        : {
            code: '',
            name: '',
            teacher: '',
            place: '',
          },
  })),
}));

export const blockHours = ['8:00 - 8:45', '8:45 - 9:30', '9:40 - 10:25'];

export default function Schedule() {
  return (
    <main className="schedule-visualizer">
      <h1 className="schedule-visualizer__title">Horario</h1>
      <div className="schedule-visualizer__container">
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
              {blocks.map((blockInfo, blockIndex) => (
                <ScheduleBlock
                  key={blockIndex}
                  blockNumber={blockInfo.blockNumber}
                >
                  {['code', 'name', 'teacher', 'place'].map(
                    (className, index) => (
                      <ScheduleInfo
                        key={index}
                        text={blockInfo.subject[className as keyof Subject]}
                        className={className}
                      />
                    ),
                  )}
                  {/* <ScheduleInfo subject={blockInfo.subject} /> */}
                </ScheduleBlock>
              ))}
            </ScheduleColumn>
          ))}
        </ScheduleGrid>
      </div>
    </main>
  );
}
