import {
  IAppointment,
  TActiveAppointment,
} from './../../shared/interfaces/appointment.interface'

export enum ActionsType {
  SET_ALL_APPOINTMENTS = 'SET_ALL_APPOINTMENTS',
  SET_ACTIVE_APPOINTMENTS = 'SET_ACTIVE_APPOINTMENTS',
}

export type TAppointmentAction =
  | {
      type: ActionsType.SET_ALL_APPOINTMENTS
      payload: IAppointment[]
    }
  | {
      type: ActionsType.SET_ACTIVE_APPOINTMENTS
      payload: TActiveAppointment[]
    }
