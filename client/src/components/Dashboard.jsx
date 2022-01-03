import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Chart, PieSeries, Title } from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { Animation } from "@devexpress/dx-react-chart";

export default function Dashboard() {
  const data = [
    { region: "Asia", val: 4119626293 },
    { region: "Africa", val: 1012956064 },
    { region: "Northern America", val: 344124520 },
    { region: "Latin America and the Caribbean", val: 590946440 },
    { region: "Europe", val: 727082222 },
    { region: "Oceania", val: 35104756 },
  ];
  return (
    <div>
      Dashboard
      <div className="card">
        <Chart data={data}>
          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.6}
          />
          <Title text="The Population of Continents and Regions" />
          <Animation />
        </Chart>
      </div>
    </div>
  );
}
