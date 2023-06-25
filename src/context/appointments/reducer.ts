import { ActionsType, TAppointmentAction } from './actions'
import {
  IAppointment,
  ActiveAppointment,
} from './../../shared/interfaces/appointment.interface'

export interface IInitialState {
  allAppointments: IAppointment[] | []
  activeAppointments: ActiveAppointment[] | []
}

export const reducer = (state: IInitialState, action: TAppointmentAction) => {
  switch (action.type) {
    case ActionsType.SET_ALL_APPOINTMENTS:
      return { ...state, allAppointments: action.payload }
    case ActionsType.SET_ACTIVE_APPOINTMENTS:
      return { ...state, activeAppointments: action.payload }
    default:
      return state
  }
}
