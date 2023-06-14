import { useEffect, useContext } from 'react'

import { AppointmentContext } from '../../context/appointments/AppointmentContext'

import AppointmentItem from '../appointmentItem.tsx/AppointmentItem'

const AppointmentList = () => {
  const { getActiveAppointments, activeAppointments } =
    useContext(AppointmentContext)

  useEffect(() => {
    getActiveAppointments()
  }, [])

  return (
    <>
      {activeAppointments.length > 0
        ? activeAppointments.map((item) => (
            <AppointmentItem key={item.id} {...item} />
          ))
        : null}
    </>
  )
}

export default AppointmentList
