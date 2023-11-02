interface Subject {
  code: string;
  name: string;
}

interface Day {
  day: string;
  subject: Subject;
}

interface BlockSchedulePerDay {
  blockNumber: number;
  days: Day[];
}
