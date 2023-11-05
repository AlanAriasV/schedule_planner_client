import { ScheduleGrid, ScheduleColumn, ScheduleBlock } from 'src/components';
import ScheduleInfo from 'src/components/ScheduleGrid/ScheduleInfo';

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

export const scheduleExample: ScheduleDay[] = days.map(day => ({
  dayName: day,
  blocks: Array.from({ length: 14 }, (_, i) => {
    const subject: Subject = {
      code: '',
      name: '',
      times: {
        chair: 8,
        laboratory: 4,
        workshop: 0,
      },
    };
    const teacher: Omit<Teacher, 'career'> = {
      code: '',
      name: '',
    };
    const laboratory: Laboratory = {
      code: '',
      name: '',
    };

    if (Math.random() > 0.5) {
      const rn = Math.floor(Math.random() * 5);
      Object.assign(subject, {
        code: subjects[rn].code,
        name: subjects[rn].name,
      });
      Object.assign(teacher, { code: rn, name: subjects[rn].teacher });
      Object.assign(laboratory, { code: rn, name: subjects[rn].place });
    }

    return {
      blockNumber: i + 1,
      subject,
      teacher,
      laboratory,
    };
  }),
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
