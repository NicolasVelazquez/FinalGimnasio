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

  const handleInputChange = event => {
    setMember(event.target.value);
  };

  const saveMember = () => {
    var data = {
      text: member,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
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
              <label htmlFor="description">{ editing ? "Editar" : "Crear" } Member</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={member}
                onChange={handleInputChange}
                name="text"
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