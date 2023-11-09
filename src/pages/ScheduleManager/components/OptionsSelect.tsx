import Select from 'react-select';
import { Dispatch, useEffect, useState } from 'react';
import { CareerApi, SemesterApi } from 'src/api';
import PlanApi from 'src/api/services/planApi';
import ScheduleApi from 'src/api/services/scheduleApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useScheduleStore } from 'src/store';

type Option = {
  value: string;
  label: string;
};

export default function ScheduleSelect({
  // setSchedule,
  setHandleGenerateBtn,
  setHandleEditBtn,
}: {
  // setSchedule: Dispatch<ScheduleDay[]>;
  setHandleGenerateBtn: Dispatch<() => void>;
  setHandleEditBtn: Dispatch<() => void>;
}) {
  const { setSchedule } = useScheduleStore(state => state);
  const [{ career, plan, semester }, setSelectedOption] = useState({
    career: '',
    plan: '',
    semester: '',
  });
  const [careerOptions, setCareerOptions] = useState<Option[]>([]);
  const [planOptions, setPlanOptions] = useState<Option[]>([]);
  const [semestersOptions, setSemestersOptions] = useState<Option[]>([]);

  const navigate = useNavigate();

  const addHelpIndicatorClass = (element: string) => {
    return element ? '' : 'help-indicator';
  };

  useEffect(() => {
    if (career && plan && semester) {
      ScheduleApi.getSchedule({ semester_id: semester }).then(res => {
        const { schedule } = res.data;
        console.log(schedule);
        setSchedule(schedule);
        if (schedule.length === 0) {
          setHandleGenerateBtn(() => () => {
            toast
              .promise(
                ScheduleApi.postSchedule({ semester_id: parseInt(semester) }),
                {
                  pending: {
                    render: 'Generando horario...',
                  },
                  success: {
                    render: 'Horario generado',
                  },
                  error: {
                    render: 'Error al generar horario',
                  },
                },
              )
              .then(res => {
                const { schedule } = res.data;
                console.log(schedule);
                setSchedule(schedule);
                navigate(
                  `/manage-schedule/edit-schedule/${career}/${plan}/${semester}`,
                );
              });
          });
        }
        setHandleEditBtn(() => () => {
          navigate(
            `/manage-schedule/edit-schedule/${career}/${plan}/${semester}`,
          );
        });
      });
    }
  }, [career, plan, semester]);

  useEffect(() => {
    CareerApi.getCareers().then(res => {
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
      PlanApi.getPlans({ career_code: career }).then(res => {
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
      SemesterApi.getSemesters({ plan_code: `${career}_${plan}` }).then(res => {
        setSemestersOptions(
          res.data.semesters.map(({ id, number }) => ({
            label: `Semestre ${number}`,
            value: `${id}`,
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
