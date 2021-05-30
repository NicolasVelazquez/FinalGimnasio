import React, { useState } from "react";
import MembersDataService from "../services/member.service";
import { Link } from "react-router-dom";

const AddMember = props => {
  let initialMemberState = ""

  let editing = false;

  if (props.location.state && props.location.state.currentMember) {
    editing = true;
    initialMemberState = props.location.state.currentMember.text
  }

  const [member, setMember] = useState(initialMemberState);
  const [submitted, setSubmitted] = useState(false);
  
  const [name, setName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [age, setAge] = useState(null)
  const [email, setEmail] = useState(null)

  // const handleInputChange = event => {
  //   setMember(event.target.value);
  // };

  const saveMember = () => {
    var data = {
      name: name,
      lastName: lastName,
      age: age,
      email: email
    };

    if (editing) {
      data._id = props.location.state.currentMember._id
      MembersDataService.updateMember(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
        MembersDataService.createMember(data)
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
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>¡Guardado exitoso!</h4>
            <Link to={"/socios"} className="btn btn-success">
              Atrás
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Editar" : "Crear" } Socio</label>
              <input
                type="text"
                className="form-control"
                // id="text"
                required
                value={member.name}
                onChange={(e) => setName(e.target.value)}
                // onChange={handleInputChange}
                // name="text"
                placeholder='Nombre'
              />
              <input
                type="text"
                className="form-control"
                required
                value={member.lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Apellido'
              />
              <input
                type="text"
                className="form-control"
                required
                value={member.age}
                onChange={(e) => setAge(e.target.value)}
                placeholder='Edad'
              />
              <input
                type="text"
                className="form-control"
                required
                value={member.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='E-mail'
              />
            </div>
            <button onClick={saveMember} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

  );
};

export default AddMember;