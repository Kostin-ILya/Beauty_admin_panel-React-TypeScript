import { useReducer, createContext } from 'react'

import { reducer, IInitialState } from './reducer'
import { ActionsType } from './actions'
import { useAppointmentService } from '../../services/appointmentService'
import { LoadingStatus } from '../../hooks/useHTTP'

const initialState: IInitialState = {
  allAppointments: [],
  activeAppointments: [],
}

interface IProviderProps {
  children: React.ReactNode
}

interface IAppointmentContextValue extends IInitialState {
  appointmentLoadingStatus: LoadingStatus
  getAppointments: () => void
  getActiveAppointments: () => void
}

export const AppointmentContext = createContext<IAppointmentContextValue>({
  allAppointments: initialState.allAppointments,
  activeAppointments: initialState.activeAppointments,
  appointmentLoadingStatus: 'idle',
  getActiveAppointments: () => {},
  getAppointments: () => {},
})

export const AppointmentContextProvider = ({ children }: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { getAllActiveAppointments, getAllAppointments, loadingStatus } =
    useAppointmentService()

  const value = {
    allAppointments: state.allAppointments,
    activeAppointments: state.activeAppointments,
    appointmentLoadingStatus: loadingStatus,
    getAppointments: () => {
      getAllAppointments().then((data) =>
        dispatch({ type: ActionsType.SET_ALL_APPOINTMENTS, payload: data })
      )
    },
    getActiveAppointments: () => {
      getAllActiveAppointments().then((data) => {
        dispatch({ type: ActionsType.SET_ACTIVE_APPOINTMENTS, payload: data })
      })
    },
  }

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  )
}
