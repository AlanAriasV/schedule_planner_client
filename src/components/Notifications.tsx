import { useState } from 'react';
import { IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleGoBtn = () => {
    setIsClosing(true);
    navigate('/trade-schedule/EN101');
  };

  return (
    <div className="notifications">
      <div
        className={
          'notifications__container' +
          (isOpening ? ' opening' : '') +
          (isClosing ? ' closing' : '') +
          (open ? ' open' : '')
        }
        onAnimationEnd={() => {
          if (isOpening) {
            setOpen(true);
            setIsOpening(false);
          } else if (isClosing) {
            setOpen(false);
            setIsClosing(false);
          }
        }}
      >
        <div
          className="notifications__icons-container"
          onClick={() => setIsOpening(true)}
        >
          <div className="notifications__icons-item hide-hover">
            <IoMdNotificationsOutline />
          </div>
          <div className="notifications__icons-item show-hover">
            <IoMdNotifications />
          </div>
        </div>
        <div className="notifications__content">
          <div className="notifications__header">
            <div className="notifications__title">
              <h3>Notificaciones de intercambio</h3>
            </div>
            <div>
              <button
                className="btn"
                onClick={() => setIsClosing(true)}
              >
                X
              </button>
            </div>
          </div>
          <div className="notifications__body">
            <div className="notifications__item">
              <h5 className="title">English 101</h5>
              <span className="description">Cambio grupo A a grupo B</span>
              <button
                className="btn"
                onClick={handleGoBtn}
              >
                Ir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
