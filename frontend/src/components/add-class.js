import React, { useState } from "react";
import ClassDataService from "../services/class.service";
import { Link } from "react-router-dom";

const AddClass = props => {
  let initialClassState = ""
  let editing = false;

  if (props.location.state && props.location.state.currentClass) {
    editing = true;
    initialClassState = props.location.state.currentClass
  }

  // const [member] = useState(initialClassState);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState(initialClassState.name)
  const [schedule, setSchedule] = useState(initialClassState.schedule)

  const saveClass = (e) => {
    e.preventDefault()

    var data = {
      name: name,
      schedule: schedule
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
              <div class="form-group">
                <label for="inputEmail4">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Nombre'
                  maxlength="20"
                />
              </div>
              <div class="form-group">
                <label>Días y Horarios</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  defaultValue={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder='Días y Horarios'
                  maxlength="20"
                />
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