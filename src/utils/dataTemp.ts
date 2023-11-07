export const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export const teachers: Teacher[] = [
  {
    code: '1',
    name: 'John Doe',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '2',
    name: 'Jane Smith',
    career: {
      code: 'IE',
      name: 'Ingeniería Electrónica',
      subjectCode: 'EE',
    },
  },
  {
    code: '3',
    name: 'Robert Johnson',
    career: {
      code: 'IM',
      name: 'Ingeniería Mecánica',
      subjectCode: 'ME',
    },
  },
  {
    code: '4',
    name: 'Michael Brown',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '5',
    name: 'Sarah Davis',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '6',
    name: 'David Miller',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '7',
    name: 'Jessica Wilson',
    career: {
      code: 'II',
      name: 'Ingeniería Industrial',
      subjectCode: 'IN',
    },
  },
  {
    code: '8',
    name: 'Daniel Moore',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    code: '9',
    name: 'Emily Taylor',
    career: {
      code: 'IEE',
      name: 'Ingeniería en Energía',
      subjectCode: 'EN',
    },
  },
  {
    code: '10',
    name: 'James Anderson',
    career: {
      code: 'IMT',
      name: 'Ingeniería en Mecatrónica',
      subjectCode: 'MT',
    },
  },
];

export const laboratories: Laboratory[] = [
  { code: 'LAB1', name: 'Laboratorio 1' },
  { code: 'LAB2', name: 'Laboratorio 2' },
  { code: 'LAB3', name: 'Laboratorio 3' },
  { code: 'LAB4', name: 'Laboratorio 4' },
  { code: 'LAB5', name: 'Laboratorio 5' },
  { code: 'LAB6', name: 'Laboratorio 6' },
  { code: 'LAB7', name: 'Laboratorio 7' },
  { code: 'LAB8', name: 'Laboratorio 8' },
  { code: 'LAB9', name: 'Laboratorio 9' },
  { code: 'LAB10', name: 'Laboratorio 10' },
  { code: 'LAB11', name: 'Laboratorio 11' },
  { code: 'LAB12', name: 'Laboratorio 12' },
  { code: 'LAB13', name: 'Laboratorio 13' },
  { code: 'LAB14', name: 'Laboratorio 14' },
  { code: 'LAB15', name: 'Laboratorio 15' },
  { code: 'LAB16', name: 'Laboratorio 16' },
  { code: 'LAB17', name: 'Laboratorio 17' },
  { code: 'LAB18', name: 'Laboratorio 18' },
  { code: 'LAB19', name: 'Laboratorio 19' },
  { code: 'LAB20', name: 'Laboratorio 20' },
  { code: 'LAB21', name: 'Laboratorio 21' },
  { code: 'LAB22', name: 'Laboratorio 22' },
  { code: 'LAB23', name: 'Laboratorio 23' },
  { code: 'LAB24', name: 'Laboratorio 24' },
  { code: 'LAB25', name: 'Laboratorio 25' },
  { code: 'LAB26', name: 'Laboratorio 26' },
  { code: 'LAB27', name: 'Laboratorio 27' },
  { code: 'LAB28', name: 'Laboratorio 28' },
  { code: 'LAB29', name: 'Laboratorio 29' },
  { code: 'LAB30', name: 'Laboratorio 30' },
];

export const subjects = [
  {
    code: 'CS101',
    name: 'Computer Science 101',
    maxBlocks: Math.floor(Math.random() * 8 + 1),
  },
  {
    code: 'MA101',
    name: 'Mathematics 101',
    maxBlocks: Math.floor(Math.random() * 8 + 1),
  },
  {
    code: 'EN101',
    name: 'English 101',
    maxBlocks: Math.floor(Math.random() * 8 + 1),
  },
  {
    code: 'PH101',
    name: 'Physics 101',
    maxBlocks: Math.floor(Math.random() * 8 + 1),
  },
];

export const scheduleExample: ScheduleDay[] = days.map(day => ({
  dayName: day,
  blocks: Array.from({ length: 16 }, (_, i) => {
    const subject: Omit<Subject, 'maxBlocks'> = {
      code: '',
      name: '',
    };
    const teacher: Omit<Teacher, 'career'> = {
      code: '',
      name: '',
    };
    const laboratory: Laboratory = {
      code: '',
      name: '',
    };

    if ((i < 6 || i > 7) && Math.random() > 0.5) {
      const rn = Math.floor(Math.random() * subjects.length);
      Object.assign(subject, {
        code: subjects[rn].code,
        name: subjects[rn].name,
      });
      Object.assign(teacher, { ...teachers[rn] });
      Object.assign(laboratory, { ...laboratories[rn] });
    }

    return {
      blockNumber: i + 1,
      subject,
      teacher,
      laboratory,
    };
  }),
}));

export const ScheduleOptions = [
  {
    code: 'ISC',
    name: 'Ingeniería en Sistemas Computacionales',
    plan: [
      { version: 2019, semesters: 12 },
      { version: 2013, semesters: 12 },
    ],
  },
];

export const TeacherAvailability = days.map(dayName => {
  const blocks = Array.from({ length: 16 }, (_, i) => ({
    blockNumber: i + 1,
    availability: Math.random() > 0.5 && (i < 6 || i > 7) ? false : true,
  }));
  return { dayName, blocks };
});

export const blockHours = [
  '8:00 - 8:45',
  '8:45 - 9:30',
  '9:40 - 10:25',
  '10:25 - 11:10',
  '11:20 - 12:05',
  '12:05 - 12:50',
  '13:00 - 13:45',
  '13:45 - 14:30',
  '14:45 - 15:25',
  '15:30 - 16:15',
  '16:20 - 17:05',
  '17:05 - 17:50',
  '17:55 - 18:40',
  '18:40 - 19:25',
  '19:30 - 20:15',
  '20:15 - 21:00',
];
