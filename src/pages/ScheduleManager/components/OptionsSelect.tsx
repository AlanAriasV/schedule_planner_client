import Select from 'react-select';
import { Dispatch, useEffect, useState } from 'react';

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

const ScheduleOptions = [
  {
    code: 'ISC',
    name: 'Ingeniería en Sistemas Computacionales',
    plan: [
      { version: 2019, semesters: 12 },
      { version: 2013, semesters: 12 },
    ],
  },
];

export default function ScheduleSelect({
  setSchedule,
}: {
  setSchedule: Dispatch<ScheduleDay[]>;
}) {
  const [{ career, plan, semester }, setSelectedOption] = useState({
    career: '',
    plan: '',
    semester: '',
  });

  const careerOptions = ScheduleOptions.map(({ name, code }) => ({
    label: name,
    value: code,
  }));

  const planOptions =
    ScheduleOptions.find(option => option.code === career)?.plan.map(
      ({ version, semesters }) => ({
        label: `Plan ${version}`,
        value: version,
        semesters,
      }),
    ) ?? [];

  const semestersOptions = Array.from(
    {
      length:
        planOptions.find(option => option.value === +plan)?.semesters ?? 0,
    },
    (_, i) => ({
      label: `Semestre ${i + 1}`,
      value: i + 1,
    }),
  );

  useEffect(() => {
    if (career && plan && semester) {
      setSchedule(scheduleExample);
    }
  }, [career, plan, semester, setSchedule]);

  return (
    <>
      <div className="select-container">
        <Select
          className="react-select"
          classNamePrefix={'react-select'}
          placeholder={'Seleccione una carrera'}
          options={careerOptions}
          onChange={option =>
            setSelectedOption({
              career: option?.value ?? '',
              plan: '',
              semester: '',
            })
          }
        />
      </div>
      <div className="select-container">
        <Select
          className="react-select"
          classNamePrefix={'react-select'}
          placeholder={'Seleccione un semestre'}
          options={planOptions}
          isDisabled={!career}
          onChange={option =>
            setSelectedOption({
              career,
              plan: option?.value.toString() ?? '',
              semester: '',
            })
          }
        />
      </div>
      <div className="select-container">
        <Select
          className="react-select"
          classNamePrefix={'react-select'}
          placeholder={'Seleccione un semestre'}
          options={semestersOptions}
          isDisabled={!career || !plan}
          onChange={option =>
            setSelectedOption({
              career,
              plan,
              semester: option?.value.toString() ?? '',
            })
          }
        />
      </div>
    </>
  );
}
