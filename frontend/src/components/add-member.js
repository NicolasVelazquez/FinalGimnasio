import React, { useState } from "react";
import MembersDataService from "../services/member.service";
import { Link } from "react-router-dom";

const AddMember = props => {
  let initialMemberState = ""

  let editing = false;

  if (props.location.state && props.location.state.currentMember) {
    editing = true;
    initialMemberState = props.location.state.currentMember
  }

  const [member] = useState(initialMemberState);
  const [submitted, setSubmitted] = useState(false);
  
  const [name, setName] = useState(initialMemberState.name)
  const [lastName, setLastName] = useState(initialMemberState.lastName)
  const [age, setAge] = useState(initialMemberState.age)
  const [email, setEmail] = useState(initialMemberState.email)

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
      console.log(initialMemberState)
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
      <div className="submit-form" >
        {submitted ? (
          <div  style={{textAlign: " -webkit-center"}} >
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h4>¡Socio guardado con éxito!</h4>
                  <Link to={"/socios"} className="btn btn-success">
                    Atrás
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="form-group">
              <h4 htmlFor="description">{ editing ? "Editar" : "Crear" } Socio</h4>
              <input
                type="text"
                className="form-control"
                // id="text"
                required
                defaultValue={member.name}
                onChange={(e) => setName(e.target.value)}
                // onChange={handleInputChange}
                // name="text"
                placeholder='Nombre'
              />
              <input
                type="text"
                className="form-control"
                required
                defaultValue={member.lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Apellido'
              />
              <input
                type="number"
                min="0"
                max="100"
                className="form-control"
                required="true"
                defaultValue={member.age}
                onChange={(e) => setAge(e.target.value)}
                placeholder='Edad'
              />
              <input
                type="email"
                className="form-control"
                required
                defaultValue={member.email}
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