import React, { useState } from "react";
import MembersDataService from "../services/member.service";
import PaymentsDataService from "../services/payment.service"
import { Link } from "react-router-dom";

const AddPayment = props => {
  let memberList = []
  let initialMemberState = ""
  let editing = false;
  
  if (props.location.state && props.location.state.memberList) {
    memberList = props.location.state.memberList
  } else {
    MembersDataService.getAll()
      .then(response => {
        console.log(response.data)
        memberList = response.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  const [member] = useState(initialMemberState);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState(initialMemberState.name)
  const [lastName, setLastName] = useState(initialMemberState.lastName)
  const [birthday, setBirthday] = useState(initialMemberState.birthday)
  const [email, setEmail] = useState(initialMemberState.email)
  const [genre, setGenre] = useState(initialMemberState.genre)
  const [phonenumber, setPhonenumber] = useState(initialMemberState.phonenumber)

  const saveMember = (e) => {
    e.preventDefault()

    var data = {
      name: name,
      lastName: lastName,
      birthday: birthday,
      email: email,
      genre: genre,
      phonenumber: phonenumber
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
        <div style={{ textAlign: " -webkit-center" }} >
          <div className="col-lg-4 pb-1">
            <div className="card">
              <div className="card-body">
                <h4>¡Abono guardado con éxito!</h4>
                <Link to={"/socios"} className="btn btn-success">
                  Atrás
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={saveMember}>
          <div className="card-body">
            <div className="form-group">
              <h2 htmlFor="description">{editing ? "Editar" : "Crear"} Abono</h2>
              <div class="form-group row">
              <div class="col-8">
                <label for="exampleDataList" class="form-label">Seleccione un socio</label>
                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Escriba el email o nombre del socio..."/>
                <datalist id="datalistOptions">
                  {memberList.map((item) =>
                    <option key={item.email} value={"(" + item.email + ") " + item.lastName + ", " + item.name} />
                  )}
                </datalist>
              </div>
              <div class="col-4">
                <label for="inputEmail4">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  defaultValue={member.name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Nombre'
                  maxlength="20"
                />
              </div>
              </div>
              <div class="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  defaultValue={member.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Apellido'
                  maxlength="20"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  defaultValue={member.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  maxlength="20"
                />
              </div>
              <div class="form-group">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  required="true"
                  defaultValue={member.birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder='Fecha de Nacimiento'
                />
              </div>
              <div class="form-group">
                <label>Género</label>
                <select class="custom-select" defaultValue={member.genre} onChange={(e) => setGenre(e.target.value)}>
                  <option selected>Género</option>
                  <option value="No Informado">Prefiero no decirlo</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                </select>
              </div>
              <div class="form-group">
                <label>Número de Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  defaultValue={member.phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  placeholder='Teléfono'
                  maxlength="15"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success mx-1 mb-1">Enviar</button>
            <Link to={"/socios"} className="btn btn-primary mx-1 mb-1">Atrás</Link>
          </div>
        </form>
      )}
    </div>

  );
};

export default AddPayment;