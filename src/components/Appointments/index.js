import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppList = this.getFilteredAppointmentList()

    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="form-container">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.onAddAppointment}>
                <label htmlFor="titleId" className="label-name">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="titleId"
                  placeholder="Title"
                  className="text-input"
                  value={title}
                  onChange={this.onChangeTitleInput}
                />
                <br />
                <label htmlFor="dateId" className="label-name">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  id="dateId"
                  placeholder="dd/mm/yyyy"
                  className="text-input"
                  value={date}
                  onChange={this.onChangeDateInput}
                />
                <br />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="appointment-item-container">
            <h1 className="sub-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {filteredAppList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
