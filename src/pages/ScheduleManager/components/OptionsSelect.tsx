import Select from 'react-select';
import { Dispatch, useEffect, useState } from 'react';
import { scheduleExample, ScheduleOptions } from 'src/utils/dataTemp';

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

  const addHelpIndicatorClass = (element: string) => {
    return element ? '' : 'help-indicator';
  };

  return (
    <>
      <Select
        className={`select-container ${addHelpIndicatorClass(career)}`}
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
      <Select
        className={`select-container ${addHelpIndicatorClass(plan)}`}
        classNamePrefix={'react-select'}
        placeholder={'Seleccione un plan'}
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
      <Select
        className={`select-container ${addHelpIndicatorClass(semester)}`}
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
    </>
  );
}
