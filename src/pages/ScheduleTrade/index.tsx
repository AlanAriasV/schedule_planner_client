import { useEffect, useRef, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import {
  AiOutlineLeftCircle,
  AiFillLeftCircle,
  AiOutlineRightCircle,
  AiFillRightCircle,
  AiFillWarning,
} from 'react-icons/ai';

import {
  ScheduleGrid,
  ScheduleColumn,
  ScheduleBlock,
  ScheduleInfo,
} from 'src/components';
import CardContainer from 'src/components/CardContainer';
import Select from 'react-select';
import {
  blockHours,
  schedulesAlternatives,
} from 'src/utils/dataTemp';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from 'src/store/useUserStore';
import { axiosInstance } from 'src/api';
import FadeLoader from 'react-spinners/FadeLoader';

export default function ScheduleTrade() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState<
    ScheduleDay[] | undefined
  >();
  const [selectedPage, setSelectedPage] = useState(0);
  const { subject } = useParams();
  const navigate = useNavigate();
  const [enrolledSubjects, setEnrolledSubjects] = useState<EnrolledSubject[]>([]);
  const run = useUserStore((state) => state.run);
  const [personalSchedule, setPersonalSchedule] = useState<ScheduleDay[]>();
  const [alternativeSchedules, setAlternativeSchedules] = useState<Omit<ScheduleDay, 'teacher' | 'laboratory'>[][]>([]);

  let blockConflicts = 0;

  const schedule1Ref = useRef<HTMLDivElement>(null);
  const schedule2Ref = useRef<HTMLDivElement>(null);

  const subjectOptions = enrolledSubjects.map(subject => ({
    value: subject.code,
    label: subject.name,
  }))


  //Recuperacion de horario
  useEffect(() => {
    toast.loading('Cargando horario', { toastId: 'loading' })
    axiosInstance.get(`${import.meta.env.VITE_API_URL}/schedule/private?run=${run}`).then((res) => {
      if (res.data.schedule) {
        setPersonalSchedule(res.data.schedule);
        toast.update('loading', { render: 'Se cargo el horario correctamente', type: 'success', isLoading: false, autoClose: 3000 });
        return
      }
    }
    ).catch((err) => {
      toast.update('loading', { render: 'No se pudo cargar el horario', type: 'error', isLoading: false, autoClose: 3000 });
      console.log(err);
    }
    );
  }, []);

  //Recuperacion de asignaturas inscritas
  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_API_URL}/study/subjects?run=${run}`).then((res) => {
      if (res.data.subjects) {
        setEnrolledSubjects(res.data.subjects);
        return
      }
    }
    ).catch((err) => {
      console.log(err);
    }
    );
  }, []);

  //Recuperacion de horarios alternativos
  useEffect(() => {
    if (selectedSubject) {
      axiosInstance.get(`${import.meta.env.VITE_API_URL}/schedule/subjects?subject_code=${selectedSubject}&letter=${enrolledSubjects.find((enrolledSubject) => selectedSubject == enrolledSubject.code)?.letter}`).then((res) => {
        if (res.data.schedule) {
          console.log(res.data.schedule);

          setAlternativeSchedules(res.data.schedule);
          setSelectedSchedule(res.data.schedule[0]);
          setSelectedPage(0);
          return
        }
      }
      ).catch((err) => {
        console.log(err);
      }
      );
    }
  }, [selectedSubject]);

  const handleBlockClick = (subjectCode: string) => {
    if (!selectedSubject) {
      navigate(`/trade-schedule/${subjectCode}`);
    } else if (selectedSubject === subjectCode) {
      navigate(`/trade-schedule`);
      schedule1Ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setSelectedPage(0);
  };

  const blockClasses = (subjectCode: string) => {
    if (!subjectCode) return '';
    if (selectedSubject) {
      if (selectedSubject === subjectCode) return 'selected selectable';
    } else {
      return 'selectable';
    }
    return '';
  };

  const handleSendRequest = () => {
    if (blockConflicts > 0) {
      toast.error('No se puede enviar la solicitud, hay choques horarios', {
        toastId: 'request-error',
      });
    } else {
      toast.success('Solicitud enviada', { toastId: 'request-success' });
    }
  };

  const blockConflict = (block: ScheduleBlock, dayName: string) => {
    let currentConflicts = 0;
    if (selectedSchedule && selectedSubject) {
      const equivalentBlock = selectedSchedule
        .find(({ dayName: day }) => day === dayName)
        ?.blocks.find(({ blockNumber, subject }) => {
          if (subject.code === '' || block.subject.code === '') return false;
          if (
            subject.code === selectedSubject &&
            blockNumber === block.blockNumber &&
            block.subject.code !== subject.code
          )
            return true;
        });

      if (equivalentBlock) {
        currentConflicts++;
        blockConflicts = currentConflicts;
        return (
          <div className="conflict">
            <span>{`Choque con ${block.subject.name}`}</span>
            <AiFillWarning />
          </div>
        );
      }
    }
    return <></>;
  };

  const onScroll1 = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    schedule2Ref.current?.scrollTo({ top: e.currentTarget.scrollTop });
  };
  const onScroll2 = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    schedule1Ref.current?.scrollTo({ top: e.currentTarget.scrollTop });
  };

  useEffect(() => {
    setSelectedSchedule(alternativeSchedules[selectedPage]);
  }, [selectedPage]);

  useEffect(() => {
    if (subject) {
      setSelectedSubject(subject);
    } else {
      setSelectedSubject('');
    }
  }, [subject]);

  return (
    <main className="schedule-trade">
      <div className="schedule-trade__header">
        <div className="schedule-trade__select-container">
          <span className="container-label">Filtrar por asignatura</span>
          <Select
            classNamePrefix={'react-select'}
            className="select-container"
            options={subjectOptions}
            value={
              subjectOptions.find(({ value }) => value === selectedSubject) ??
              null
            }
            isClearable={true}
            placeholder={'Selecciona una asignatura'}
            onChange={option =>
              navigate(`/trade-schedule/${option?.value ?? ''}`)
            }
          />
        </div>
        <div className="schedule-trade__legend">
          <span className="container-label">Leyenda</span>
          <div className="legend__container">
            <div className="legend__item">
              <span className="legend__item-icon selected"></span>
              <span>
                <i>Asignatura Seleccionada</i>
              </span>
            </div>
            <div className="legend__item">
              <span className="legend__item-icon conflict">
                <AiFillWarning />
              </span>
              <span>
                <i>Bloque con Choque horario</i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="schedule-trade__container">
        <CardContainer title="Horario Actual">
          <ScheduleGrid
            scrollRef={schedule1Ref}
            onScroll={onScroll1}
          >
            <ScheduleColumn title="Hora">
              {blockHours.map((blockHour, blockIndex) => (
                <ScheduleBlock
                  key={blockIndex}
                  blockNumber={blockIndex + 1}
                  className="hour-block"
                >
                  <ScheduleInfo
                    text={blockHour}
                    className="name"
                  />
                </ScheduleBlock>
              ))}
            </ScheduleColumn>
            {!personalSchedule ? <div className='loading-icon__container'>
              <FadeLoader />
            </div> : personalSchedule.map(({ dayName, blocks }, dayIndex) => (
              <ScheduleColumn
                key={dayIndex}
                title={dayName}
              >
                {blocks.map((block, blockIndex) => {
                  if (blocks.length > blockIndex + 1 && blocks[blockIndex + 1].blockNumber === block.blockNumber) return null
                  return (
                    <ScheduleBlock
                      key={blockIndex}
                      blockNumber={block.blockNumber}
                      className={blockClasses(block.subject.code)}
                      onClick={() => handleBlockClick(block.subject.code)}
                    >
                      {block.subject.code === selectedSubject &&
                        selectedSubject && (
                          <>
                            {Object.entries(block.subject).map(([key, value]) => (
                              <ScheduleInfo
                                key={crypto.randomUUID()}
                                text={value}
                                className={key} />
                            ))}
                          </>
                        )}
                      {!selectedSubject && (
                        <>
                          {Object.entries(block.subject).map(([key, value]) => (
                            <ScheduleInfo
                              key={crypto.randomUUID()}
                              text={value}
                              className={key} />
                          ))}
                        </>
                      )}
                      {blockConflict(block, dayName)}
                    </ScheduleBlock>
                  );
                })}
              </ScheduleColumn>
            ))}
          </ScheduleGrid>
        </CardContainer>
        <div className="middle-section__container">
          <div className="trade-icon__container">
            <BsArrowRight />
            <BsArrowRight />
          </div>
          {selectedSubject && (
            <div className="options__container">
              <span>Opciones</span>
              <div className="paginator__container">
                <button
                  className="paginator__button"
                  onClick={() => {
                    if (selectedPage > 0)
                      setSelectedPage(selectedPage - 1)
                  }}
                  disabled={selectedPage === 0}
                >
                  <AiOutlineLeftCircle className="hidden-hover" />
                  <AiFillLeftCircle className="visible-hover" />
                </button>
                <span>{selectedPage + 1}</span>
                <button
                  className="paginator__button"
                  onClick={() => setSelectedPage(selectedPage + 1)}
                  disabled={selectedPage === alternativeSchedules.length - 1}
                >
                  <AiOutlineRightCircle className="hidden-hover" />
                  <AiFillRightCircle className="visible-hover" />
                </button>
              </div>
              <button
                className="btn"
                onClick={handleSendRequest}
              >
                Solicitar
              </button>
            </div>
          )}
        </div>

        <CardContainer title="Alternativas">
          <ScheduleGrid
            scrollRef={schedule2Ref}
            onScroll={onScroll2}
          >
            {selectedSchedule && selectedSubject && (
              <>
                <ScheduleColumn title="Hora">
                  {blockHours.map((blockHour, blockIndex) => (
                    <ScheduleBlock
                      key={blockIndex}
                      blockNumber={blockIndex + 1}
                      className="hour-block"
                    >
                      <ScheduleInfo
                        text={blockHour}
                        className="name"
                      />
                    </ScheduleBlock>
                  ))}
                </ScheduleColumn>
                {selectedSchedule.map(({ dayName, blocks }, dayIndex) => (
                  <ScheduleColumn
                    key={dayIndex}
                    title={dayName}
                  >
                    {blocks.map(({ blockNumber, subject }, blockIndex) => (
                      <ScheduleBlock
                        key={blockIndex}
                        blockNumber={blockNumber}
                        className={
                          subject.code === selectedSubject ? 'selected' : ''
                        }
                      >
                        {subject.code === selectedSubject &&
                          selectedSubject && (
                            <>
                              {Object.entries(subject).map(([key, value]) => (
                                <ScheduleInfo
                                  key={crypto.randomUUID()}
                                  text={value}
                                  className={key}
                                />
                              ))}
                            </>
                          )}
                        {!selectedSubject && (
                          <>
                            {Object.entries(subject).map(([key, value]) => (
                              <ScheduleInfo
                                key={crypto.randomUUID()}
                                text={value}
                                className={key}
                              />
                            ))}
                          </>
                        )}
                      </ScheduleBlock>
                    ))}
                  </ScheduleColumn>
                ))}
              </>
            )}
          </ScheduleGrid>
        </CardContainer>
      </div>
    </main>
  );
}
