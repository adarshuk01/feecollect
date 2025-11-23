import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import TextInput from "../../common/TextInput";
import SelectInput from "../../common/SelectInput";

ChartJS.register(ArcElement, Tooltip, Legend);

function AttendanceReport() {
  const [date, setDate] = useState("");
  const [group, setGroup] = useState("");

  // 🔹 Default date = today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // 🔹 Dummy group list (replace with API if needed)
  const groups = [
    { label: "Class A", value: "classA" },
    { label: "Class B", value: "classB" },
    { label: "Class C", value: "classC" },
  ];

  // 🔹 Attendance chart data
  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance Status",
        data: [75, 25], // Example static values
        backgroundColor: ["#4CAF50", "#FF6384"],
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
        text: "Student Attendance Report",
        font: { size: 16 },
      },
    },
    cutout: "60%",
  };

  return (
    <div className="w-full mx-auto space-y-4 rounded-2xl bg-white p-4">
      {/* Inputs */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        <TextInput
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <SelectInput
          label="Group"
          name="group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          options={groups}
        />
      </div>

      {/* Summary */}
      <p>
        Attendance report for <b>{date}</b> {group && <>| Group: <b>{group}</b></>}
      </p>

      {/* Chart */}
      <div className="relative h-[250px] sm:h-[300px] md:h-[350px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default AttendanceReport;
