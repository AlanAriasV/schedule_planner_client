import { ScheduleGrid } from 'src/components';
import ScheduleInfo from 'src/components/ScheduleGrid/ScheduleInfo';
import ScheduleBlock from 'src/components/ScheduleGrid/ScheduleBlock';

const subjects: Subject[] = [
  { code: 'CS101', name: 'Computer Science 101' },
  { code: 'MA101', name: 'Mathematics 101' },
  { code: 'EN101', name: 'English 101' },
  { code: 'PH101', name: 'Physics 101' },
];

const daysOfWeek: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const classSchedule: BlockSchedulePerDay[] = [];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

for (let blockNumber = 1; blockNumber <= 14; blockNumber++) {
  const days: Day[] = [];

  for (let i = 0; i < daysOfWeek.length; i++) {
    days.push({
      day: daysOfWeek[i],
      subject: subjects[getRandomInt(0, subjects.length)],
    });
  }

  classSchedule.push({
    blockNumber,
    days,
  });
}

function getDays(row: BlockSchedulePerDay) {
  const days: string[] = [];
  row.days.map(day => days.push(day.day));
  return days;
}

function createRows(rows: BlockSchedulePerDay[]) {
  return (
    <>
      {rows.map(row => {
        return (
          <tr>
            {row.days.map(day => {
              return (
                <td>
                  <ScheduleBlock>
                    <ScheduleInfo
                      blockNumber={row.blockNumber}
                      place="a"
                      subject={day.subject}
                      teacher="a"
                    />
                  </ScheduleBlock>
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}

export default function Schedule() {
  const days = getDays(classSchedule[0]);
  const rows = createRows(classSchedule);

  return (
    <main className="schedule-visualizer">
      <ScheduleGrid
        days={days}
        rows={rows}
      />
    </main>
  );
}
