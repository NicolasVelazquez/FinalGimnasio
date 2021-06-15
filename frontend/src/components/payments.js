import React, { useState, useEffect, useCallback } from "react"
import PaymentsDataService from "../services/payment.service"
import MembersDataService from "../services/member.service"
import { Link, useRouteMatch } from "react-router-dom";
import { VictoryPie, VictoryLabel } from "victory";

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
        setPayments(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveMembers = () => {
    MembersDataService.getAll()
      .then(response => {
        console.log(response.data)
        setMembers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrievePie = () => {
    return (
      <svg viewBox="0 0 400 400">
        <VictoryPie
          colorScale={["tomato"]}
          standalone={false}
          width={400} height={400}
          data={[
            { x: 1, y: 1 }
          ]}
          innerRadius={120} labelRadius={100}
          style={{ labels: { fontSize: 0, fill: "white" } }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 40 }}
          x={200} y={200}
          text="55"
        />
      </svg>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 pb-4" style={{ textAlign: "right" }}>
          <Link to={`${match.url}/crear`} className="btn btn-primary col-lg-4">
            Alta de abono
          </Link>
        </div>
      </div>
      <div className="row">
        <svg viewBox="0 0 400 200">
          <VictoryPie
            colorScale={["tomato"]}
            standalone={false}
            width={200} height={200}
            innerRadius={18} labelRadius={100} radius={20}
            style={{ labels: { fontSize: 0, fill: "white" } }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 10 }}
            x={100} y={100}
            text={countInactive}
          />
          <VictoryPie
            colorScale={["#8BC34A"]}
            standalone={false}
            width={400} height={200}
            innerRadius={18} labelRadius={100} radius={20}
            style={{ labels: { fontSize: 0, fill: "white" } }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 10 }}
            x={200} y={100}
            text={countActive}
          />
        </svg>
      </div>
      <div className="row">
        {payments.map((paymentItem, memberId) => {
          return (
            <div className="col-lg-4 pb-1">
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
            </div>
          );
        })}
      </div>
    </div>

  );
}