import { useReducer, createContext } from 'react'

import { reducer, IAppointmentState } from './reducer'
import { ActionsTypes } from './actions'
import { useAppointmentService } from '../../services/appointmentService'
import { LoadingStatus } from '../../hooks/useHTTP'

import {
  ActiveAppointment,
  IAppointment,
} from '../../shared/interfaces/appointment.interface'
import { CalendarValue } from '../../shared/types/react-calendar'

interface IProviderProps {
  children: React.ReactNode
}

interface IAppointmentContextValue extends IAppointmentState {
  appointmentLoadingStatus: LoadingStatus
  getAppointments: () => void
  getActiveAppointments: () => void
  setCalendarDate: (newDate: CalendarValue) => void
}

const initialState: IAppointmentState = {
  allAppointments: [],
  activeAppointments: [],
  calendarDate: null,
}

function filterAppointmentByDate<T extends ActiveAppointment | IAppointment>(
  data: T[],
  state: IAppointmentState
): T[] {
  const filteredData = data.filter((item) => {
    if (
      Array.isArray(state.calendarDate) &&
      state.calendarDate[0] &&
      state.calendarDate[1]
    ) {
      if (
        new Date(item.date).getTime() >=
          new Date(state.calendarDate[0]).getTime() &&
        new Date(item.date).getTime() <=
          new Date(state.calendarDate[1]).getTime()
      ) {
        return item
      }
    } else {
      return item
    }
    return false
  })

  return filteredData
}

export const AppointmentContext = createContext<IAppointmentContextValue>({
  allAppointments: initialState.allAppointments,
  activeAppointments: initialState.activeAppointments,
  calendarDate: initialState.calendarDate,
  appointmentLoadingStatus: 'idle',
  getActiveAppointments: () => {},
  getAppointments: () => {},
  setCalendarDate: (newDate: CalendarValue) => {},
})

export const AppointmentContextProvider = ({ children }: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { getAllActiveAppointments, getAllAppointments, loadingStatus } =
    useAppointmentService()

  const value = {
    allAppointments: state.allAppointments,
    activeAppointments: state.activeAppointments,
    appointmentLoadingStatus: loadingStatus,
    calendarDate: state.calendarDate,

    getAppointments: () => {
      getAllAppointments().then((data) => {
        dispatch({
          type: ActionsTypes.SET_ALL_APPOINTMENTS,
          payload: filterAppointmentByDate<IAppointment>(data, state),
        })
      })
    },
    getActiveAppointments: () => {
      getAllActiveAppointments().then((data) => {
        dispatch({
          type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
          payload: filterAppointmentByDate<ActiveAppointment>(data, state),
        })
      })
    },

    setCalendarDate: (newDate: CalendarValue) => {
      dispatch({ type: ActionsTypes.SET_CALENDAR_DATE, payload: newDate })
    },
  }

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  )
}
