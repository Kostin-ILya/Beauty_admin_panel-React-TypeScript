import { useState, useEffect, useContext } from 'react'

import { AppointmentContext } from '../../context/appointments/AppointmentContext'

import AppointmentItem from '../appointmentItem.tsx/AppointmentItem'

import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import CancelModal from '../modal/CancelModal'

const AppointmentList = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const {
    getActiveAppointments,
    activeAppointments,
    appointmentLoadingStatus,
  } = useContext(AppointmentContext)

  useEffect(() => {
    getActiveAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (appointmentLoadingStatus === 'loading') {
    return <Spinner />
  } else if (appointmentLoadingStatus === 'error') {
    return (
      <>
        <Error />
        <button className="schedule__reload" onClick={getActiveAppointments}>
          Try reload!
        </button>
      </>
    )
  }

  return (
    <>
      {activeAppointments.length > 0 ? (
        activeAppointments.map((item) => (
          <AppointmentItem
            key={item.id}
            {...item}
            handleOpen={setIsModalOpen}
            handleSelectId={setSelectedId}
          />
        ))
      ) : (
        <h2>No appointments</h2>
      )}
      <CancelModal
        handleClose={setIsModalOpen}
        isModalOpen={isModalOpen}
        selectedId={selectedId}
      />
    </>
  )
}

export default AppointmentList
