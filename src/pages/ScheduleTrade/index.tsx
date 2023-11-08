import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import {
  AiOutlineLeftCircle,
  AiFillLeftCircle,
  AiOutlineRightCircle,
  AiFillRightCircle,
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
  scheduleExample,
  enrolledSubjectsExample,
  generateRandomSchedule,
} from 'src/utils/dataTemp';

export default function ScheduleTrade() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState<
    ScheduleDay[] | undefined
  >();
  const [selectedPage, setSelectedPage] = useState(0);

  const schedules: ScheduleDay[][] = [];

  for (let index = 0; index < 5; index++) {
    const schedule = generateRandomSchedule();
    schedules.push(schedule);
  }

  const subjectOptions = enrolledSubjectsExample.map(subject => ({
    value: subject.code,
    label: subject.name,
  }));

  useEffect(() => {
    setSelectedSchedule(schedules[selectedPage]);
  }, [selectedPage]);

  const handleBlockClick = (subjectCode: string) => {
    if (selectedSubject === subjectCode) setSelectedSubject('');
    else {
      setSelectedSubject(subjectCode);
    }
    setSelectedPage(0);
  };

  const blockClasses = (subjectCode: string) => {
    if (!subjectCode) return;
    if (selectedSubject) {
      if (selectedSubject === subjectCode) return 'selected selectable';
    } else {
      return 'selectable';
    }
  };

  return (
    <main className="schedule-trade">
      <div className="schedule-trade__header">
        <h1 className="schedule-trade__title">Intercambio de horario</h1>
      </div>
      <div className="schedule-trade__select-container">
        <span>Filtrar por asignatura</span>
        <Select
          classNamePrefix={'react-select'}
          className="select-container"
          options={subjectOptions}
          value={
            subjectOptions.find(({ value }) => value === selectedSubject) ??
            null
          }
          placeholder={'Selecciona una asignatura'}
          onChange={option => setSelectedSubject(option?.value ?? '')}
        />
      </div>
      <div className="schedule-trade__container self">
        <CardContainer title="Horario Actual">
          <ScheduleGrid>
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
            {scheduleExample.map(({ dayName, blocks }, dayIndex) => (
              <ScheduleColumn
                key={dayIndex}
                title={dayName}
              >
                {blocks.map(({ blockNumber, subject }, blockIndex) => (
                  <ScheduleBlock
                    key={blockIndex}
                    blockNumber={blockNumber}
                    className={blockClasses(subject.code)}
                    onClick={() => handleBlockClick(subject.code)}
                  >
                    {subject.code === selectedSubject && selectedSubject && (
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
                  onClick={() => setSelectedPage(selectedPage - 1)}
                  disabled={selectedPage === 0}
                >
                  <AiOutlineLeftCircle className="hidden-hover" />
                  <AiFillLeftCircle className="visible-hover" />
                </button>
                <span>{selectedPage + 1}</span>
                <button
                  className="paginator__button"
                  onClick={() => setSelectedPage(selectedPage + 1)}
                  disabled={selectedPage === schedules.length - 1}
                >
                  <AiOutlineRightCircle className="hidden-hover" />
                  <AiFillRightCircle className="visible-hover" />
                </button>
              </div>
              <button className="btn">Solicitar</button>
            </div>
          )}
        </div>

        <CardContainer title="Propuestas">
          <ScheduleGrid>
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
                        className={blockClasses(subject.code)}
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
