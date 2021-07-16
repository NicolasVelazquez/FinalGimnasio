import React, { useState } from "react";
import ClassDataService from "../services/class.service";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'

const AddClass = props => {
  let initialClassState = ""
  let editing = false;
  let scheduleDays = []
  let scheduleHours = []
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

  if (props.location.state && props.location.state.currentClass) {
    editing = true;
    initialClassState = props.location.state.currentClass
  }

  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState(initialClassState.name)

  const setDays = (day) => {
    if (day.checked) {
      scheduleDays.push(day.name)
    } else {
      scheduleDays = scheduleDays.filter(item => item !== day.name)
    }
    console.log(scheduleDays)
  }

  const setHours = (hour) => {
    if (hour.checked) {
      scheduleHours.push(hour.name)
    } else {
      scheduleHours = scheduleHours.filter(item => item !== hour.name)
    }
    console.log(scheduleHours)
  }

  function compareDays ( a, b ){ return days.indexOf(a) - days.indexOf(b); }
  function compareHours ( a, b ){ return hours.indexOf(a) - hours.indexOf(b); }

  const saveClass = (e) => {
    e.preventDefault()

    if(scheduleDays.length < 1 || scheduleHours.length < 1){
      alert("Debe seleccionar al menos un día y un horario.")
    } else {
      scheduleDays.sort(compareDays);
      scheduleHours.sort(compareHours);
  
      var data = {
        name: name,
        schedule: scheduleDays.map(function (x) {
          return x + ': ' + scheduleHours.join(', ');
        })
      };
  
      if (editing) {
        console.log(initialClassState)
        data._id = props.location.state.currentClass._id
        ClassDataService.updateClass(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        ClassDataService.createClass(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  };

  return (
    <div className="submit-form" >
      {submitted ? (
        <div style={{ textAlign: " -webkit-center" }} >
          <div className="col-lg-4 pb-1">
            <div className="card">
              <div className="card-body">
                <h4>¡Clase guardada con éxito!</h4>
                <Link to={"/clases"} className="btn btn-success">
                  Atrás
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={saveClass}>
          <div className="card-body">
            <div className="form-group">
              <h2 htmlFor="description">{editing ? "Editar" : "Crear"} Clase</h2>
              <div className="form-group">
                <label for="inputEmail4">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Nombre'
                />
              </div>
              <label>Días</label>
              <div className="mb-3">
                {days.map((day) => (
                  <Form.Check
                    inline
                    label={day}
                    name={day}
                    type="checkbox"
                    id={`inline-${day}-1`}
                    onChange={(e) => setDays(e.target)}
                  />
                ))}
              </div>
              <label>Horarios</label>
              <div className="mb-3">
                {hours.map((hour) => (
                  <Form.Check
                    inline
                    label={hour}
                    name={hour}
                    type="checkbox"
                    id={`inline-${hour}-1`}
                    onChange={(e) => setHours(e.target)}
                  />
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-success mx-1 mb-1">Guardar</button>
            <Link to={"/clases"} className="btn btn-primary mx-1 mb-1">Atrás</Link>
          </div>
        </form>
      )}
    </div>

  );
};

export default AddClass;