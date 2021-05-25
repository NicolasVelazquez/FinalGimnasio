import React, { useState, useEffect } from "react"
import MembersDataService from "../services/member.service"
import { Switch, Route, Link } from "react-router-dom";
import AddMember from "./add-member"

const Members = props => {
  const [classes, setClasses] = useState([]);

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

  return (
    <div>
      <div className="row pb-1">
        <div>
          <Link to={"/socios/crear"} className="btn btn-primary col-lg-4 mx-1 mb-1">
            Alta de socio
          </Link>
        </div>
      </div>
      <div className="row">
        {classes.map((memberItem) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{memberItem.name} {memberItem.lastName} {(memberItem.active) ? '(ACTIVO)' : '(INACTIVO)'}</h5>
                  <div className="card-text">
                    <strong>Edad: </strong>{memberItem.age}<br/>
                    <strong>Email: </strong>{memberItem.email}<br/>
                    <strong>Socio desde: </strong>{new Date(memberItem.createdAt).toLocaleString()}<br/>
                    {(memberItem.activePayment) && 
                      <div>
                        <strong>Vencimiento del abono: </strong> {new Date(memberItem.activePayment.end).toLocaleString()}
                      </div>
                    }
                    <strong>Clases inscripto: </strong>
                    {(memberItem.classesEnrolled.length && memberItem.classesEnrolled.length > 0) ? 
                      <ul>
                      {memberItem.classesEnrolled.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul> : <p>Aún no se ha inscripto a una clase.</p>}
                  </div>
                  <div className="row">
                    <Link to={"/socios/editar/" + memberItem._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      Editar
                    </Link>
                    <Link to={"/socios/eliminar/" + memberItem._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      Eliminar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/socios/crear"]} component={AddMember} />
        </Switch>
      </div>
    </div>
  
  );
}

export default Members;