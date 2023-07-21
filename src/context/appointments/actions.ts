import {
  IAppointment,
  ActiveAppointment,
} from './../../shared/interfaces/appointment.interface'
import { CalendarValue } from '../../shared/types/react-calendar'

export enum ActionsTypes {
  SET_ALL_APPOINTMENTS = 'SET_ALL_APPOINTMENTS',
  SET_ACTIVE_APPOINTMENTS = 'SET_ACTIVE_APPOINTMENTS',
  SET_CALENDAR_DATE = 'SET_CALENDAR_DATE',
}

export type TAppointmentAction =
  | {
      type: ActionsTypes.SET_ALL_APPOINTMENTS
      payload: IAppointment[]
    }
  | {
      type: ActionsTypes.SET_ACTIVE_APPOINTMENTS
      payload: ActiveAppointment[]
    }
  | {
      type: ActionsTypes.SET_CALENDAR_DATE
      payload: CalendarValue
    }
