import { ScheduleGrid, ScheduleColumn, ScheduleBlock } from 'src/components';
import { Card, CardContainer } from './components';
import { schedule } from '../Schedule';

interface Teacher {
  id: number;
  name: string;
  career: {
    code: string;
    name: string;
    subjectCode: string;
  };
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: 'John Doe',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    career: {
      code: 'IE',
      name: 'Ingeniería Electrónica',
      subjectCode: 'EE',
    },
  },
  {
    id: 3,
    name: 'Robert Johnson',
    career: {
      code: 'IM',
      name: 'Ingeniería Mecánica',
      subjectCode: 'ME',
    },
  },
  {
    id: 4,
    name: 'Michael Brown',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    id: 5,
    name: 'Sarah Davis',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    id: 6,
    name: 'David Miller',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    id: 7,
    name: 'Jessica Wilson',
    career: {
      code: 'II',
      name: 'Ingeniería Industrial',
      subjectCode: 'IN',
    },
  },
  {
    id: 8,
    name: 'Daniel Moore',
    career: {
      code: 'ICCI',
      name: 'Ingeniería Civil en Computación e Informática',
      subjectCode: 'CC',
    },
  },
  {
    id: 9,
    name: 'Emily Taylor',
    career: {
      code: 'IEE',
      name: 'Ingeniería en Energía',
      subjectCode: 'EN',
    },
  },
  {
    id: 10,
    name: 'James Anderson',
    career: {
      code: 'IMT',
      name: 'Ingeniería en Mecatrónica',
      subjectCode: 'MT',
    },
  },
];

interface Subject {
  code: string;
  name: string;
}

const subjects: Subject[] = [
  { code: 'CS101', name: 'Computer Science 101' },
  { code: 'MA101', name: 'Mathematics 101' },
  { code: 'EN101', name: 'English 101' },
  { code: 'PH101', name: 'Physics 101' },
];

interface Laboratory {
  code: string;
  name: string;
}

const laboratories: Laboratory[] = [
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

export default function ScheduleEdit() {
  return (
    <main className="schedule-edit-container">
      <CardContainer
        title="Horario"
        dataType="schedule"
      >
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
      </CardContainer>
      <CardContainer
        title="Asignaturas"
        dataType="subjects"
      >
        {subjects.map(subject => (
          <Card
            key={subject.code}
            name={subject.name}
            code={subject.code}
          />
        ))}
      </CardContainer>
      <CardContainer
        title="Docentes"
        dataType="teachers"
      >
        {teachers.map(teacher => (
          <Card
            key={teacher.id}
            name={teacher.name}
            code={teacher.career.code}
          />
        ))}
      </CardContainer>
      <CardContainer
        title="Laboratorios"
        dataType="laboratories"
      >
        {laboratories.map(laboratory => (
          <Card
            key={laboratory.code}
            name={laboratory.name}
            code={laboratory.code}
          />
        ))}
      </CardContainer>
    </main>
  );
}
