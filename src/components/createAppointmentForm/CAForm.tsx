import { useState, useContext, ChangeEvent, FormEvent } from 'react'

import { AppointmentContext } from '../../context/appointments/AppointmentContext'

import { useAppointmentService } from '../../services/appointmentService'
import { CreatedAppointment } from '../../shared/interfaces/appointment.interface'

import './caform.scss'

const CAForm = () => {
  const [formData, setFormData] = useState<CreatedAppointment>({
    date: '',
    name: '',
    service: '',
    phone: '',
  })
  const [isDisabledBtn, setDisabledBtn] = useState<boolean>(false)

  const { getActiveAppointments } = useContext(AppointmentContext)

  const { addNewAppointment } = useAppointmentService()

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setDisabledBtn(true)

    addNewAppointment(formData)
      .then(() => {
        getActiveAppointments()
        setFormData({
          date: '',
          name: '',
          service: '',
          phone: '',
        })
      })
      .catch((e) => {
        console.error(e)
        alert('Sorry, error when adding a new appointment.')
      })
      .finally(() => {
        setDisabledBtn(false)
      })
  }

  return (
    <form className="caform" onSubmit={onSubmitForm}>
      <div className="caform__title">Create new appointment</div>
      <label htmlFor="name">
        Name<span>*</span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="User name"
        required
        value={formData.name}
        onChange={onChangeInput}
      />

      <label htmlFor="service">
        Service<span>*</span>
      </label>
      <input
        type="text"
        name="service"
        id="service"
        placeholder="Service name"
        required
        value={formData.service}
        onChange={onChangeInput}
      />

      <label htmlFor="phone">
        Phone number<span>*</span>
      </label>
      <input
        type="tel"
        name="phone"
        id="phone"
        placeholder="+1 890 335 372"
        pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
        title="Format should be +1 804 944 567"
        required
        value={formData.phone}
        onChange={onChangeInput}
      />

      <label htmlFor="date">
        Date<span>*</span>
      </label>
      <input
        type="text"
        name="date"
        id="date"
        placeholder="DD/MM/YYYY HH:mm"
        pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
        title="Format should be DD/MM/YYYY HH:mm"
        required
        value={formData.date}
        onChange={onChangeInput}
      />
      <button disabled={isDisabledBtn}>Create</button>
    </form>
  )
}

export default CAForm
