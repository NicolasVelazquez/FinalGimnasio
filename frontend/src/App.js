import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Members from "./components/members"
import AddMember from "./components/add-member"

function App() {
  // const [user, setUser] = React.useState(null);

  // async function login(user = null) {
  //   setUser(user);
  // }

  // async function logout() {
  //   setUser(null)
  // }

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/gimnasio" className="navbar-brand">
          Gimnasio App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/socios"} className="nav-link">
              Socios
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/abonos"} className="nav-link">
              Abonos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/clases"} className="nav-link">
              Clases
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route path="/socios/editar/:id" render={(props) => (<AddMember {...props} />)}/>
          <Route exact path={["/socios/crear"]} component={AddMember} />
          <Route exact path={["/socios"]} component={Members} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
