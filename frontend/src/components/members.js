import React, { useState, useEffect } from "react"
import MembersDataService from "../services/member.service"
import { Link, useRouteMatch } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  const [members, setMembers] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    retrieveMembers();
  }, []);

  const retrieveMembers = () => {
    MembersDataService.getAll()
      .then(response => {
        console.log(response.data);
        setMembers(response.data);
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

  function closeModal() {
    setSelectedMemberId(null)
    setIsOpen(false);
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 pb-4" style={{ textAlign: "right" }}>
          <Link to={`${match.url}/crear`} className="btn btn-primary col-lg-4">
            Alta Socio
          </Link>
        </div>
      </div>
      <div >
        <h2>Registro de Socios</h2>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header}>
              <Card.Subtitle>
                <Row>
                  <Col>Nombre y Apellido</Col>
                  <Col>Email</Col>
                  <Col>Estado</Col>
                  <Col md="auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-contract" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M3.646 13.854a.5.5 0 0 0 .708 0L8 10.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zm0-11.708a.5.5 0 0 1 .708 0L8 5.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </Col>
                </Row>
              </Card.Subtitle>
            </Accordion.Toggle>
          </Card>
          {members.map((memberItem, index) => {
            return (
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey={memberItem._id}>
                  <Row>
                    <Col><strong>{memberItem.name} {memberItem.lastName}</strong></Col>
                    <Col> {memberItem.email}</Col>
                    <Col>{(memberItem.active) ? 'ACTIVO' : 'INACTIVO'}</Col>
                    <Col md="auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={memberItem._id}>
                  <Card.Body>
                    <div className="card-text">
                      <Row>
                        <Col>
                          <strong>Fecha de Nacimiento: </strong>{new Date(memberItem.birthday).toLocaleDateString()}<br />
                          <strong>Socio desde: </strong>{new Date(memberItem.createdAt).toLocaleDateString()}<br />
                          <strong>Género: </strong>{memberItem.genre ? memberItem.genre : '-'}<br />
                        </Col>
                        <Col>
                          <strong>Teléfono: </strong>{memberItem.phonenumber ? memberItem.phonenumber : '-'}<br />
                          {(memberItem.activePayment) &&
                            <div>
                              <strong>Vencimiento del abono: </strong> {new Date(memberItem.activePayment.end).toLocaleDateString()}
                            </div>}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <strong>Clases inscripto: </strong>
                          {(memberItem.classesEnrolled.length && memberItem.classesEnrolled.length > 0) ?
                            <ul>
                              {memberItem.classesEnrolled.map((item, indexClass) => (
                                <li key={indexClass}>{item}</li>
                              ))}
                            </ul> : <p>Aún no se ha inscripto a una clase.</p>}
                        </Col>
                      </Row>
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
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              // <div className="col-lg-4 pb-1">
              //   <div className="card">
              //     <div className="card-body">
              //       <h5 className="card-title">{memberItem.name} {memberItem.lastName} {(memberItem.active) ? '(ACTIVO)' : '(INACTIVO)'}</h5>
              //       <div className="card-text">
              //         <strong>Email: </strong>{memberItem.email}<br />
              //         <strong>Fecha de Nacimiento: </strong>{new Date(memberItem.birthday).toLocaleDateString()}<br />
              //         <strong>Socio desde: </strong>{new Date(memberItem.createdAt).toLocaleDateString()}<br />
              //         <strong>Género: </strong>{memberItem.genre ? memberItem.genre : '-'}<br />
              //         <strong>Teléfono: </strong>{memberItem.phonenumber ? memberItem.phonenumber : '-'}<br />
              //         {(memberItem.activePayment) &&
              //           <div>
              //             <strong>Vencimiento del abono: </strong> {new Date(memberItem.activePayment.end).toLocaleDateString()}
              //           </div>
              //         }
              //         <strong>Clases inscripto: </strong>
              //         {(memberItem.classesEnrolled.length && memberItem.classesEnrolled.length > 0) ?
              //           <ul>
              //             {memberItem.classesEnrolled.map((item, indexClass) => (
              //               <li key={indexClass}>{item}</li>
              //             ))}
              //           </ul> : <p>Aún no se ha inscripto a una clase.</p>}
              //       </div>
              //       <div className="row">
              //         <Link to={{
              //           pathname: match.url + "/" + memberItem._id + "/editar",
              //           state: {
              //             currentMember: memberItem
              //           }
              //         }} className="btn btn-primary col-lg-5 mx-1 mb-1">
              //           Editar
              //         </Link>
              //         <button onClick={(e) => openModal(memberItem._id, e)} className="btn btn-danger col-lg-5 mx-1 mb-1">Eliminar</button>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            );
          })}
        </Accordion>
      </div>
      <Modal
        isOpen={modalIsOpen}
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