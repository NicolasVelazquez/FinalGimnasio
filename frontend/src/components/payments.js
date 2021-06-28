import React, { useState, useEffect } from "react"
import PaymentsDataService from "../services/payment.service"
import MembersDataService from "../services/member.service"
import { Link, useRouteMatch } from "react-router-dom"
import { VictoryPie, VictoryLabel } from "victory"

export default function Payments(props) {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [countActive, setCountActive] = useState(0);
  const [countInactive, setCountInactive] = useState(0);
  let match = useRouteMatch();

  useEffect(() => {
    retrieveMembers();
    retrievePayments();
  }, []);

  useEffect(() => {
    let countActive = 0;
    let countInactive = 0;

    members.forEach(element => {
      if (element.active) {
        countActive++;
      } else {
        countInactive++;
      }
    });

    setCountActive(countActive)
    setCountInactive(countInactive)

  }, [members]);

  const retrievePayments = () => {
    PaymentsDataService.getAll()
      .then(response => {
        console.log(response.data)
        setPayments(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveMembers = () => {
    MembersDataService.getAll()
      .then(response => {
        setMembers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  class CircleCounter extends React.Component {
    render() {
      return (
        <div className="row" style={{ textAlign: "center" }}>
          <div className="col">
            <label>Socios Activos</label>
            <svg viewBox="0 0 800 200">
              <VictoryPie
                colorScale={["#8BC34A"]}
                standalone={false}
                width={800} height={200}
                innerRadius={75} labelRadius={100} radius={80}
                style={{ labels: { fontSize: 0, fill: "white" } }}
              />
              <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 30 }}
                x={400} y={100}
                text={countActive}
              />
            </svg>
          </div>
          <div className="col">
            <label>Socios Inactivos</label>
            <svg viewBox="0 0 800 200">
              <VictoryPie
                colorScale={["tomato"]}
                standalone={false}
                width={800} height={200}
                innerRadius={75} labelRadius={100} radius={80}
                style={{ labels: { fontSize: 0, fill: "white" } }}
              />
              <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 30 }}
                x={400} y={100}
                text={countInactive}
              />
            </svg>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 pb-4" style={{ textAlign: "right" }}>
          <Link to={{
            pathname: match.url + "/crear",
            state: {
              memberList: members
            }
          }} className="btn btn-primary col-lg-4">
            Alta Abono
          </Link>
        </div>
      </div>
      <CircleCounter />
      <br />
      <h2>Registro de Pagos</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Id Socio</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((paymentItem, memberId) => {
              return (
                <tr key={paymentItem.memberId}>
                  <td>{paymentItem.memberId}</td>
                  <td>{paymentItem.type}</td>
                  <td>$ {paymentItem.price}</td>
                  <td>{new Date(paymentItem.start).toLocaleDateString()}</td>
                  <td>{new Date(paymentItem.end).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
          {/* <div className="col-lg-4 pb-1">
            <div className="card">
              <div className="card-body">
                <div className="card-text">
                  <strong>Id Socio: </strong>{paymentItem.memberId}<br />
                  <strong>Tipo: </strong>{paymentItem.type}<br />
                  <strong>Monto: </strong>{paymentItem.price}<br />
                  <strong>Fecha de Inicio: </strong>{new Date(paymentItem.start).toLocaleDateString()}<br />
                  <strong>Fecha de Fin: </strong>{new Date(paymentItem.end).toLocaleDateString()}<br />
                </div>
              </div>
            </div>
          </div> */}
        </table>
      </div>
    </div>
  );
}