interface Subject {
  code: string;
  name: string;
  teacher: string;
  place: string;
}
interface ScheduleBlock {
  blockNumber: number;
  subject: Subject;
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
