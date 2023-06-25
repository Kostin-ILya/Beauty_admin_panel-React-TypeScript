import { useHTTP } from '../hooks/useHTTP'
import dayjs from 'dayjs'

import { hasRequiredFields } from '../utils/hasRequiredFileds'

import {
  IAppointment,
  ActiveAppointment,
} from '../shared/interfaces/appointment.interface'

const requiredFields = ['id', 'name', 'service', 'phone', 'canceled']

const useAppointmentService = () => {
  const { loadingStatus, request } = useHTTP()

  const _baseAPI = 'https://64da3756e947d30a260af8d7.mockapi.io'

  const getAllAppointments = async (): Promise<IAppointment[]> => {
    const result: IAppointment[] = await request({
      url: `${_baseAPI}/appointments`,
    })

    if (
      result.every((item: IAppointment) =>
        hasRequiredFields(item, requiredFields)
      )
    ) {
      return result
    } else {
      throw new Error(`Data doesn't has all fields`)
    }
  }

  const getAllActiveAppointments = async (): Promise<ActiveAppointment[]> => {
    const data = await getAllAppointments()
    const res: ActiveAppointment[] = data
      .filter(
        ({ canceled, date }) =>
          !canceled && dayjs(date).diff(undefined, 'seconds') > 0
      )
      .map(({ canceled, ...rest }) => {
        return rest
      })

    return res
  }

  return { loadingStatus, getAllAppointments, getAllActiveAppointments }
}

export { useAppointmentService }
