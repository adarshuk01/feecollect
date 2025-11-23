import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import TextInput from "../../common/TextInput";
import GroupWiseFeeReport from "./GroupWiseFeeReport";

ChartJS.register(ArcElement, Tooltip, Legend);

function FeeReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [days, setDays] = useState(30);

  // 🔹 Set default dates on mount (from = today - 30 days, to = today)
  useEffect(() => {
    const today = new Date();
    const past30Days = new Date();
    past30Days.setDate(today.getDate() - 30);

    setFromDate(past30Days.toISOString().split("T")[0]);
    setToDate(today.toISOString().split("T")[0]);
  }, []);

  // 🔹 Update days difference whenever dates change
  useEffect(() => {
    if (fromDate && toDate) {
      const diffTime = Math.abs(new Date(toDate) - new Date(fromDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    }
  }, [fromDate, toDate]);

  const data = {
    labels: ["Paid", "Pending", "Other fee"],
    datasets: [
      {
        label: "Fee Status",
        data: [65, 25, 10],
        backgroundColor: ["#4CAF50", "#FF6384", "#FFCE56"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: "Student Fee Status",
        font: { size: 16 },
      },
    },
    cutout: "60%",
  };

  return (
    <div className="w-full mx-auto space-y-4 rounded-2xl bg-white p-4">
      <GroupWiseFeeReport/>
      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        <TextInput
          label="From"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <TextInput
          label="To"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <p>
        Fee report of <b>{days} days</b>
      </p>

      <div className="relative h-[250px] sm:h-[300px] md:h-[350px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default FeeReport;
