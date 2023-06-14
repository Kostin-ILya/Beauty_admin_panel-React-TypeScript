import { useReducer, createContext } from 'react'
import { reducer, IInitialState } from './reducer'
import { ActionsType } from './actions'
import { useAppointmentService } from '../../services/appointmentService'

const initialState: IInitialState = {
  allAppointments: [],
  activeAppointments: [],
}

interface IProviderProps {
  children: React.ReactNode
}

interface IAppointmentContextValue extends IInitialState {
  getAppointments: () => void
  getActiveAppointments: () => void
}

export const AppointmentContext = createContext<IAppointmentContextValue>({
  allAppointments: initialState.allAppointments,
  activeAppointments: initialState.activeAppointments,
  getActiveAppointments: () => {},
  getAppointments: () => {},
})

export const AppointmentContextProvider = ({ children }: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { getAllActiveAppointments, getAllAppointments } =
    useAppointmentService()

  const value = {
    allAppointments: state.allAppointments,
    activeAppointments: state.activeAppointments,
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
