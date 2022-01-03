import React, { useState, useEffect } from "react";

import { Chart, PieSeries, Title } from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { Animation } from "@devexpress/dx-react-chart";
import axios from "axios";
import { URL } from "../uri";

export default function Dashboard() {
  const [users, setUsers] = useState([
    { plan: "Standard", val: 0 },
    { plan: "Premium", val: 0 },
  ]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(`${URL}/getusers`)
      .then((res) => {
        let arr = [
          { plan: "Standard", val: 0 },
          { plan: "Premium", val: 0 },
        ];
        res.data.data.map((ele) => {
          arr.map((ele2) => {
            if (ele.plan == ele2.plan) ele2.val = ele2.val + 1;
          });
        });
        setUsers(arr);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card">
        <Chart data={users}>
          <PieSeries valueField="val" argumentField="plan" innerRadius={0.6} />
          <Title text="The Members" />
          <Animation />
        </Chart>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
        >
          <div
            style={{ width: "40px", height: "40px", background: "red" }}
          ></div>
          <p style={{ width: "120px", textAlign: "center" }}>
            Premium - {users[1].val}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ width: "40px", height: "40px", background: "blue" }}
          ></div>
          <p style={{ width: "120px", textAlign: "center" }}>
            Standard - {users[0].val}
          </p>
        </div>
      </div>
    </div>
  );
}
