import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Decimation,
  Ticks,
} from "chart.js";
import styles from "./Chart.module.css";
import { width } from "@mui/system";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
function ChartRender(props) {
  return (
    <div className={styles.container}>
      <Line
        data={{
          labels: props.log.map((logItem) =>
            new Date(logItem.updated_at).toLocaleString()
          ),
          datasets: [
            {
              label: "weekly",
              data: props.log.map((res,i) => res.amount),
              backgroundColor: ["rgba(241, 22, 70, 0.5)"],
            },
          ],
        }}
        options={{
          responsive: true,
          title: { display: true, text: "test chart" },
          scales: {
            y: { ticks: { precision:0 } },
          },
          
        }}
      />
    </div>
  );
}

export default ChartRender;
