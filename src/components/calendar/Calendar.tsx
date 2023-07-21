import { useContext } from 'react'

import { Calendar as LibCalendar } from 'react-calendar'

import { AppointmentContext } from '../../context/appointments/AppointmentContext'

import 'react-calendar/dist/Calendar.css'
import './calendar.scss'

function Calendar() {
  const { calendarDate, setCalendarDate } = useContext(AppointmentContext)

  return (
    <div className="calendar">
      <LibCalendar
        value={calendarDate}
        onChange={setCalendarDate}
        selectRange
      />
      <button
        className="calendar__reset"
        onClick={() => {
          setCalendarDate(null)
        }}
        disabled={
          Array.isArray(calendarDate) && calendarDate[0] && calendarDate[1]
            ? false
            : true
        }
      >
        Reset filters
      </button>
    </div>
  )
}

export default Calendar
