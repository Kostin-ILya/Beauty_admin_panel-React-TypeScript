import { useRef } from 'react'

import { CSSTransition } from 'react-transition-group'

import Portal from '../portal/Portal'

import './modal.scss'

interface IModalProps {
  handleClose: (state: boolean) => void
  isModalOpen: boolean
  selectedId: number | null
}

const CancelModal = ({ handleClose, isModalOpen, selectedId }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null)

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
              <button className="modal__ok">Ok</button>
              <button
                className="modal__close"
                onClick={() => handleClose(false)}
              >
                Close
              </button>
            </div>
            <div className="modal__status">Success</div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  )
}

export default CancelModal
