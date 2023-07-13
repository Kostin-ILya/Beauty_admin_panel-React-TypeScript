import { useState, useEffect, useContext, memo } from 'react'

import dayjs from 'dayjs'
import { Optional } from 'utility-types'

import { IAppointment } from '../../shared/interfaces/appointment.interface'

import { AppointmentContext } from '../../context/appointments/AppointmentContext'

import './appointmentItem.scss'

type AppointmentProps = Optional<IAppointment, 'canceled'> & {
  handleOpen: (appointmentId: number) => void
}

function AppointmentItem({
  id,
  date,
  name,
  service,
  phone,
  canceled,
  handleOpen,
}: AppointmentProps) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null)

  const { getActiveAppointments } = useContext(AppointmentContext)

  useEffect(() => {
    setTimeLeft(
      `${dayjs(date).diff(undefined, 'h')}:${
        (dayjs(date).diff(undefined, 'm') % 60) + 1
      }`
    )

    const timerId = setInterval(() => {
      if (dayjs(date).diff(undefined, 's') <= 0) {
        getActiveAppointments()
        clearInterval(timerId)
      } else {
        setTimeLeft(
          `${dayjs(date).diff(undefined, 'h')}:${
            (dayjs(date).diff(undefined, 'm') % 60) + 1
          }`
        )
      }
    }, 60000)

    return () => {
      clearInterval(timerId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm')

  return (
    <div className="appointment">
      <div className="appointment__info">
        <span className="appointment__date">Date: {formattedDate}</span>
        <span className="appointment__name">Name: {name}</span>
        <span className="appointment__service">Service: {service}</span>
        <span className="appointment__phone">Phone: {phone}</span>
      </div>
      {!canceled ? (
        <>
          <div className="appointment__time">
            <span>Time left:</span>
            <span className="appointment__timer">{timeLeft}</span>
          </div>
          <button
            className="appointment__cancel"
            onClick={() => {
              handleOpen(id)
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="appointment__canceled">Canceled</div>
      )}
    </div>
  )
}

export default memo(AppointmentItem)
