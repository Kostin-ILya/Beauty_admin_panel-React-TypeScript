import { useState, useRef, useEffect, useContext } from 'react'

import { CSSTransition } from 'react-transition-group'

import { useAppointmentService } from '../../services/appointmentService'
import { AppointmentContext } from '../../context/appointments/AppointmentContext'

import Portal from '../portal/Portal'

import './modal.scss'

interface IModalProps {
  handleClose: (state: boolean) => void
  isModalOpen: boolean
  selectedId: number | null
}

const CancelModal = ({ handleClose, isModalOpen, selectedId }: IModalProps) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false)

  const isCanceledAppointmentRef = useRef<boolean | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const { getActiveAppointments } = useContext(AppointmentContext)

  const { cancelAppointment } = useAppointmentService()

  const onCancelHandler = () => {
    setIsBtnDisabled(true)
    if (selectedId) {
      cancelAppointment(selectedId)
        .then(() => {
          isCanceledAppointmentRef.current = true
        })
        .catch((e) => {
          setIsBtnDisabled(false)
          isCanceledAppointmentRef.current = false
          console.error(e)
        })
    }
  }

  const closeModal = () => {
    handleClose(false)

    if (isCanceledAppointmentRef.current) {
      getActiveAppointments()
    }
    isCanceledAppointmentRef.current = null
  }

  const onClickEscapeClose = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', onClickEscapeClose)

    return () => {
      document.body.removeEventListener('keydown', onClickEscapeClose)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Portal>
      <CSSTransition
        in={isModalOpen}
        timeout={500}
        classNames="modal"
        nodeRef={modalRef}
        unmountOnExit
      >
        <div className="modal" ref={modalRef}>
          <div className="modal__body">
            <span className="modal__title">
              Are you sure you want to delete the appointment? #{selectedId}
            </span>
            <div className="modal__btns">
              <button
                className="modal__ok"
                onClick={onCancelHandler}
                disabled={isBtnDisabled}
              >
                Ok
              </button>
              <button className="modal__close" onClick={closeModal}>
                Close
              </button>
            </div>
            <div className="modal__status">
              {isCanceledAppointmentRef.current === null
                ? null
                : isCanceledAppointmentRef.current
                ? 'Success'
                : 'Error, try again!'}
            </div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  )
}

export default CancelModal
