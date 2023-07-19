import { useEffect, useContext } from 'react'

import { AppointmentContext } from '../../context/appointments/AppointmentContext'

import AppointmentItem from '../appointmentItem.tsx/AppointmentItem'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'

function HistoryList() {
  const { getAppointments, appointmentLoadingStatus, allAppointments } =
    useContext(AppointmentContext)

  useEffect(() => {
    getAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (appointmentLoadingStatus === 'loading') {
    return <Spinner />
  } else if (appointmentLoadingStatus === 'error') {
    return (
      <>
        <Error />
        <button className="schedule__reload" onClick={getAppointments}>
          Try reload!
        </button>
      </>
    )
  }
  return (
    <>
      {allAppointments.length > 0 ? (
        allAppointments.map((item) => (
          <AppointmentItem key={item.id} isHistory {...item} />
        ))
      ) : (
        <h2>No appointments</h2>
      )}
    </>
  )
}

export default HistoryList
