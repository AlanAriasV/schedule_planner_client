import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  ScheduleGrid,
  ScheduleColumn,
  ScheduleBlock,
  ScheduleInfo,
} from 'src/components';
import { EditButton } from 'src/components/EditButton';

import { TeacherAvailability, blockHours } from 'src/utils/dataTemp';

export default function ScheduleAvailability() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [blocksAvailability, setBlocksAvailability] =
    useState<availableBlocks[]>(TeacherAvailability);

  const handleEditBtn = () => {
    if (editMode) {
      toast.success('Horario actualizado', { toastId: 'schedule-updated' });
    }
    setEditMode(!editMode);
  };

  const handleBlockClick = (day: string, blockNumber: number) => {
    if (!editMode) {
      toast.info(
        'Para editar el horario, presione el botón "Editar" a la esquina superior derecha',
        { toastId: 'edit-mode' },
      );
      return;
    }

    if (blockNumber === 7 || blockNumber === 8) {
      toast.error('No se puede editar este bloque', { toastId: 'block-error' });
      return;
    }

    setBlocksAvailability(prev => {
      const newBlocksAvailability = [...prev];
      const dayIndex = newBlocksAvailability.findIndex(
        dayAvailability => dayAvailability.dayName === day,
      );
      const blockIndex = newBlocksAvailability[dayIndex].blocks.findIndex(
        blockAvailability => blockAvailability.blockNumber === blockNumber,
      );
      newBlocksAvailability[dayIndex].blocks[blockIndex].availability =
        !newBlocksAvailability[dayIndex].blocks[blockIndex].availability;
      return newBlocksAvailability;
    });
  };

  return (
    <main className="schedule-availability">
      <div className="schedule-availability__header">
        <h1 className="schedule-availability__title">
          Horario de disponibilidad
        </h1>
        <EditButton
          text={editMode ? 'Editando' : 'Editar'}
          className={editMode ? 'edit--active' : ''}
          onClick={handleEditBtn}
        />
      </div>
      <div className="schedule-availability__container">
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
          {blocksAvailability.map(({ dayName, blocks }, dayIndex) => (
            <ScheduleColumn
              key={dayIndex}
              title={dayName}
            >
              {blocks.map(({ blockNumber, availability }, blockIndex) => (
                <ScheduleBlock
                  key={blockIndex}
                  blockNumber={blockNumber}
                  onClick={() => handleBlockClick(dayName, blockIndex + 1)}
                  className={availability ? 'available' : 'unavailable'}
                >
                  <ScheduleInfo
                    key={crypto.randomUUID()}
                    text={availability ? '' : 'Sin disponibilidad'}
                    className={`name`}
                  />
                </ScheduleBlock>
              ))}
            </ScheduleColumn>
          ))}
        </ScheduleGrid>
      </div>
    </main>
  );
}
