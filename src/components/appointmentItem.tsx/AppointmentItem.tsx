import { useState, useEffect } from 'react'

import dayjs from 'dayjs'
import { Optional } from 'utility-types'

import { IAppointment } from '../../shared/interfaces/appointment.interface'

import './appointmentItem.scss'

type AppointmentProps = Optional<IAppointment, 'canceled'> & {
  handleOpen: (state: boolean) => void
  handleSelectId: (id: number) => void
}

function AppointmentItem({
  id,
  date,
  name,
  service,
  phone,
  canceled,
  handleOpen,
  handleSelectId,
}: AppointmentProps) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null)

  useEffect(() => {
    setTimeLeft(
      `${dayjs(date).diff(undefined, 'h')}:${
        dayjs(date).diff(undefined, 'm') % 60
      }`
    )

    const timerID = setInterval(() => {
      setTimeLeft(
        `${dayjs(date).diff(undefined, 'h')}:${
          dayjs(date).diff(undefined, 'm') % 60
        }`
      )
    }, 6000)

    return () => {
      clearInterval(timerID)
    }
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
              handleOpen(true)
              handleSelectId(id)
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

export default AppointmentItem
