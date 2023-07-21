import { ActionsTypes, TAppointmentAction } from './actions'
import {
  IAppointment,
  ActiveAppointment,
} from './../../shared/interfaces/appointment.interface'

import { CalendarValue } from '../../shared/types/react-calendar'

export interface IAppointmentState {
  allAppointments: IAppointment[] | []
  activeAppointments: ActiveAppointment[] | []
  calendarDate: CalendarValue
}

export const reducer = (
  state: IAppointmentState,
  action: TAppointmentAction
): IAppointmentState => {
  switch (action.type) {
    case ActionsTypes.SET_ALL_APPOINTMENTS:
      return { ...state, allAppointments: action.payload }
    case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
      return { ...state, activeAppointments: action.payload }
    case ActionsTypes.SET_CALENDAR_DATE: {
      return { ...state, calendarDate: action.payload }
    }
    default:
      return state
  }
}
