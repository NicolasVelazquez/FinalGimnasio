import React, { useState, useEffect } from "react"
import MembersDataService from "../services/member.service"
import { Link, useRouteMatch } from "react-router-dom";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
};

export default function Members(props) {
  const [classes, setClasses] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    retrieveMembers();
  }, []);

  const retrieveMembers = () => {
    MembersDataService.getAll()
      .then(response => {
        console.log(response.data);
        setClasses(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  function deleteMember(id, e) {
    e.preventDefault();
    MembersDataService.deleteMember(id)
      .then(response => {
        retrieveMembers();
      })
      .catch(e => {
        console.log(e);
      });
    closeModal();
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedMemberId, setSelectedMemberId] = React.useState();

  function openModal(id) {
    setSelectedMemberId(id)
    setIsOpen(true);
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setSelectedMemberId(null)
    setIsOpen(false);
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 pb-4"  style={{textAlign: "right"}}>
          <Link to={`${match.url}/crear`} className="btn btn-primary col-lg-4">
            Alta de socio
          </Link>
        </div>
      </div>
      <div className="row">
        {classes.map((memberItem, index) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{memberItem.name} {memberItem.lastName} {(memberItem.active) ? '(ACTIVO)' : '(INACTIVO)'}</h5>
                  <div className="card-text">
                    <strong>Edad: </strong>{memberItem.age}<br />
                    <strong>Email: </strong>{memberItem.email}<br />
                    <strong>Socio desde: </strong>{new Date(memberItem.createdAt).toLocaleString()}<br />
                    {(memberItem.activePayment) &&
                      <div>
                        <strong>Vencimiento del abono: </strong> {new Date(memberItem.activePayment.end).toLocaleString()}
                      </div>
                    }
                    <strong>Clases inscripto: </strong>
                    {(memberItem.classesEnrolled.length && memberItem.classesEnrolled.length > 0) ?
                      <ul>
                        {memberItem.classesEnrolled.map((item, indexClass) => (
                          <li key={indexClass}>{item}</li>
                        ))}
                      </ul> : <p>Aún no se ha inscripto a una clase.</p>}
                  </div>
                  <div className="row">
                    <Link to={{
                      pathname: match.url + "/" + memberItem._id + "/editar",
                      state: {
                        currentMember: memberItem
                      }
                    }} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      Editar
                    </Link>
                    <button onClick={(e) => openModal(memberItem._id, e)} className="btn btn-danger col-lg-5 mx-1 mb-1">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <button onClick={closeModal} type="button" class="close" aria-label="Cerrar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-body">
          <div style={{ padding: "5px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path d="M13 17.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-8.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z"></path><path fill-rule="evenodd" d="M9.836 3.244c.963-1.665 3.365-1.665 4.328 0l8.967 15.504c.963 1.667-.24 3.752-2.165 3.752H3.034c-1.926 0-3.128-2.085-2.165-3.752L9.836 3.244zm3.03.751a1 1 0 00-1.732 0L2.168 19.499A1 1 0 003.034 21h17.932a1 1 0 00.866-1.5L12.866 3.994z"></path></svg>
            <h5 class="modal-title">Eliminar Socio</h5>
          </div>
          <div>
            <button onClick={closeModal} class="btn btn-secondary mx-1 mb-1">Cancelar</button>
            <button onClick={(e) => deleteMember(selectedMemberId, e)} class="btn btn-danger mx-1 mb-1">Eliminar</button>
          </div>
        </div>
      </Modal>
    </div>

  );
}

// export default Members;