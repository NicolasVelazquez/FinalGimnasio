import React, { useState, useEffect } from "react"
import ClassDataService from "../services/class.service"
import { Link } from "react-router-dom"

const Gym = props => {
    const [classes, setClasses] = useState([]);
    
    useEffect(() => {
        retrieveClasses();
    }, []);
    
    const retrieveClasses = () => {
        ClassDataService.getAll()
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
            {/* <div className="input-group col-lg-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}
                >
                  Search
                </button>
              </div>
            </div> */}
            </div>
                <div className="row">
                {classes.map((classItem) => {
                return (
                    <div className="col-lg-4 pb-1">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">{classItem.name}</h5>
                        <p className="card-text">
                            {/* <strong>Last Name: </strong>{classItem.schedule}<br/> */}
                            <strong>Horarios: </strong>{classItem.schedule.all}
                        </p>
                        <div className="row">
                        <Link to={"/clases/"+classItem._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                            View details
                        </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                );
                })}


            </div>
        </div>
    );
}

export default Gym;