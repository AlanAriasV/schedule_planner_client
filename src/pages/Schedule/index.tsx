import { ScheduleGrid, ScheduleColumn, ScheduleBlock } from 'src/components';

export const schedule: ScheduleDay[] = [
  {
    dayName: 'Monday',
    blocks: [
      {
        blockNumber: 1,
        subject: {
          code: 'MATH1',
          name: 'Mathematics 101',
          teacher: 'Mr. Smith',
          place: 'Room 101',
        },
      },
      {
        blockNumber: 2,
        subject: {
          code: 'SCI1',
          name: 'Science 101',
          teacher: 'Mrs. Johnson',
          place: 'Room 202',
        },
      },
    ],
  },
  {
    dayName: 'Tuesday',
    blocks: [
      {
        blockNumber: 1,
        subject: {
          code: 'ENG1',
          name: 'English 101',
          teacher: 'Ms. Davis',
          place: 'Room 303',
        },
      },
    ],
  },
  {
    dayName: 'Wednesday',
    blocks: [
      {
        blockNumber: 1,
        subject: {
          code: 'HIS1',
          name: 'History 101',
          teacher: 'Dr. Brown',
          place: 'Room 404',
        },
      },
    ],
  },
  {
    dayName: 'Thursday',
    blocks: [
      {
        blockNumber: 1,
        subject: {
          code: 'ART1',
          name: 'Art 101',
          teacher: 'Professor Green',
          place: 'Room 505',
        },
      },
    ],
  },
  {
    dayName: 'Friday',
    blocks: [],
  },
];

const blockHours = [
  '7:30 - 8:30',
  '8:30 - 9:30',
  '9:30 - 10:30',
  '10:30 - 11:30',
  '11:30 - 12:30',
  '12:30 - 1:30',
  '1:30 - 2:30',
  '2:30 - 3:30',
];

export default function Schedule() {
  return (
    <main className="schedule-visualizer">
      <h1 className="schedule-visualizer__title">Schedule Visualizer</h1>
      <div className="schedule-visualizer__container">
        <ScheduleGrid>
          {schedule.map(({ dayName: day, blocks }, dayIndex) => (
            <ScheduleColumn
              key={dayIndex}
              title={day}
            >
              {blocks.map((block, blockIndex) => (
                <ScheduleBlock
                  key={blockIndex}
                  block={block}
                />
              ))}
            </ScheduleColumn>
          ))}
        </ScheduleGrid>
      </div>
    </main>
  );
}

/**
 * 
 * day.blocks.map((block, blockIndex) => (
              <ScheduleBlock
                key={blockIndex}
                block={block}
              />
            ))
 */
