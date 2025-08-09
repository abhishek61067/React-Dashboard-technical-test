import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const hoursData = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 5 },
  { day: "Thu", hours: 4.5 },
  { day: "Fri", hours: 6 },
  { day: "Sat", hours: 5.5 },
  { day: "Sun", hours: 2 },
];

const taskData = [
  { name: "In Progress", value: 10, color: "#4E42D9" },
  { name: "Completed", value: 7, color: "#22C55E" },
  { name: "Yet to Start", value: 3, color: "#FACC15" },
];

const Charts = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Pie chart hover handlers
  const onPieEnter = (_, index) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(null);

  // Custom Tooltip for Pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, color } = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: color,
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            fontWeight: "bold",
            minWidth: 100,
            textAlign: "center",
          }}
        >
          <div>{name}</div>
          <div>{value} tasks</div>
        </div>
      );
    }
    return null;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-h-screen w-full">
        <header className="flex items-center bg-white shadow p-4 w-full">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md mr-4 md:hidden"
            aria-label="Toggle Sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h2 className="text-lg sm:text-2xl font-bold">Charts</h2>
        </header>
        <main className="flex-1 p-2 sm:p-4 md:p-6 overflow-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 sm:mb-8">
            {/* Bar Chart */}
            <div className="bg-white rounded-xl p-4 shadow col-span-1 md:col-span-2 lg:col-span-2">
              <h3 className="font-semibold mb-4">Hours Spent</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={hoursData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="hours" fill="#4E42D9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Pie Chart with rounded corners and custom tooltip */}
            <div className="bg-white rounded-xl p-4 shadow mt-4 md:mt-0">
              <h3 className="font-semibold mb-4">Task Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={taskData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={6}
                    cornerRadius={10}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    activeIndex={activeIndex}
                    activeShape={(props) => (
                      <g>
                        <path
                          d={props.sectorPath}
                          fill={props.fill}
                          stroke="#fff"
                          strokeWidth={3}
                          filter="drop-shadow(0 0 2px rgba(0,0,0,0.2))"
                        />
                      </g>
                    )}
                  >
                    {taskData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        color={entry.color}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Charts;
