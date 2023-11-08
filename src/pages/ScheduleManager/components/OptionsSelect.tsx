import Select from 'react-select';
import { Dispatch, useEffect, useState } from 'react';
import { getCareers, getSemesters } from 'src/api';
import { getPlans } from 'src/api/';

interface IOption {
  value: string;
  label: string;
}

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

  const [careerOptions, setCareerOptions] = useState<IOption[]>([]);
  const [planOptions, setPlanOptions] = useState<IOption[]>([]);
  const [semestersOptions, setSemestersOptions] = useState<IOption[]>([]);

  const addHelpIndicatorClass = (element: string) => {
    return element ? '' : 'help-indicator';
  };

  useEffect(() => {
    if (career && plan && semester) {
      //TODO: get schedule from api
      setSchedule([]);
    }
  }, [career, plan, semester, setSchedule]);

  useEffect(() => {
    getCareers().then(res => {
      setCareerOptions(
        res.data.careers.map(({ name, code }) => ({
          label: name,
          value: code,
        })),
      );
    });
  }, []);

  useEffect(() => {
    if (career) {
      getPlans({ career_code: career }).then(res => {
        setPlanOptions(
          res.data.years.map(({ year }) => ({
            label: `Plan ${year}`,
            value: `${year}`,
          })),
        );
      });
    }
  }, [career]);

  useEffect(() => {
    if (plan) {
      getSemesters({ plan_code: `${career}_${plan}` }).then(res => {
        setSemestersOptions(
          res.data.semesters.map(({ number }) => ({
            label: `Semestre ${number}`,
            value: `${number}`,
          })),
        );
      });
    }
  }, [plan]);

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
