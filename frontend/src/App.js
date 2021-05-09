import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Gym from "./components/gym"

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/gimnasio" className="navbar-brand">
          Gimnasio App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/gimnasio"} className="nav-link">
              Gimnasio
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/gimnasio"]} component={Gym} />
          <Route 
            path="/gimnasio/:id/review"
            render={(props) => (
              <Gym {...props} user={user} />
            )}
          />
          <Route 
            path="/gimnasio/:id"
            render={(props) => (
              <Gym {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Gym {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
