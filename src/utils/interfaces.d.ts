interface Subject {
  code: string;
  name: string;
  times: {
    chair: number;
    laboratory: number;
    workshop: number;
  };
}

interface Teacher {
  code: string;
  name: string;
  career: {
    code: string;
    name: string;
    subjectCode: string;
  };
}

interface Laboratory {
  code: string;
  name: string;
}
interface ScheduleBlock {
  blockNumber: number;
  subject: Subject;
  teacher: Omit<Teacher, 'career'>;
  laboratory: Laboratory;
}

interface ScheduleDay {
  dayName: string;
  blocks: ScheduleBlock[];
}

interface BlockHours {
  blockNumber: number;
  start: string;
  end: string;
}
