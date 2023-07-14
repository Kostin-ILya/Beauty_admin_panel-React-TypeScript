import { useHTTP } from '../hooks/useHTTP'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { hasRequiredFields } from '../utils/hasRequiredFileds'

import {
  IAppointment,
  ActiveAppointment,
  CreatedAppointment,
} from '../shared/interfaces/appointment.interface'

dayjs.extend(customParseFormat)

const requiredFields = ['id', 'name', 'service', 'phone', 'canceled']

const useAppointmentService = () => {
  const { loadingStatus, request } = useHTTP()

  const _baseAPI = 'https://64da3756e947d30a260af8d7.mockapi.io/appointments'

  const getAllAppointments = async (): Promise<IAppointment[]> => {
    const result: IAppointment[] = await request({
      url: _baseAPI,
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

  const addNewAppointment = (
    newAppointment: CreatedAppointment
  ): Promise<any> => {
    const formattedDate = dayjs(newAppointment.date, 'DD/MM/YYYY HH:mm')
    // С формы дата приходит в другом формате. Даем понять библиотеки, как правильно ее парсить
    const data = { ...newAppointment, date: formattedDate, canceled: false }

    return request({
      url: _baseAPI,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  const cancelAppointment = (id: number): Promise<any> => {
    return request({
      url: `${_baseAPI}/${id}`,
      method: 'PUT',
      body: JSON.stringify({ canceled: true }),
    })
  }

  return {
    loadingStatus,
    getAllAppointments,
    getAllActiveAppointments,
    addNewAppointment,
    cancelAppointment,
  }
}

export { useAppointmentService }
