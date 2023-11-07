interface Subject {
  code: string;
  name: string;
  maxBlocks: number;
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
  subject: Omit<Subject, 'maxBlocks'>;
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

interface availableBlocks {
  dayName: string;
  blocks: {
    blockNumber: number;
    availability: boolean;
  }[];
}
