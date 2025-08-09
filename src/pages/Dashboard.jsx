import React, { useEffect, useState } from "react";
import axios from "axios";
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
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  FiClock,
  FiCheckCircle,
  FiActivity,
  FiEye,
  FiTrash2,
  FiMenu,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { Link, Navigate, useNavigate } from "react-router";

// Dummy chart data
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

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileUsername, setProfileUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const formattedUsers = res.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          company: user.company?.name || "N/A",
        }));
        setUsers(formattedUsers);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const openProfileModal = () => {
    const username = localStorage.getItem("username") || "Unknown User";
    setProfileUsername(username);
    setEditedUsername(username);
    setIsProfileModalOpen(true);
    setIsEditing(false);
  };

  const saveUsername = () => {
    const trimmed = editedUsername.trim();
    if (trimmed.length === 0) return;
    localStorage.setItem("username", trimmed);
    setProfileUsername(trimmed);
    setIsEditing(false);
  };

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Company", accessorKey: "company" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(row.original)}
            className="p-2 bg-primary text-white rounded hover:bg-primaryHover"
          >
            <FiEye />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  // Pie chart hover handlers
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const onPieLeave = () => {
    setActiveIndex(null);
  };

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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
        openProfileModal={openProfileModal}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Top navbar */}
        <header className="flex items-center bg-white shadow p-4 w-full">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md mr-4"
            aria-label="Toggle Sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            Dashboard
          </h1>
        </header>

        <main className="flex-1 p-2 sm:p-4 md:p-6 overflow-auto w-full">
          {/* Greeting */}
          <div className="mb-4 sm:mb-6">
            <p className="text-gray-500 text-sm sm:text-base">
              Thursday, 20th February
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
              Hi,{" "}
              <span className="text-primary">
                {localStorage.getItem("username") || "there"}
              </span>
              <span className="text-paragraph text-sm font-normal px-5">
                You can edit your profile
                <span className="text-primary cursor-pointer ps-1">
                  <Link to="/profile">here</Link>
                </span>
              </span>
            </h1>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
              <div className="p-3 bg-primaryLight rounded-lg">
                <FiClock className="text-primary text-2xl" />
              </div>
              <div>
                <p className="text-gray-500">Time Saved</p>
                <h2 className="text-2xl font-bold">12 hrs</h2>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiCheckCircle className="text-green-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500">Projects Completed</p>
                <h2 className="text-2xl font-bold">24</h2>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiActivity className="text-yellow-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500">Projects In-progress</p>
                <h2 className="text-2xl font-bold">7</h2>
              </div>
            </div>
          </div>

          {/* Charts */}
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

          {/* Table */}
          <div className="bg-white rounded-xl p-2 sm:p-4 shadow overflow-x-auto">
            <h3 className="font-semibold mb-4">Users</h3>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-2 text-left text-gray-700"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2">
                        {flexRender(
                          cell.column.columnDef.cell ??
                            cell.column.columnDef.accessorKey,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
              <button
                className="px-3 py-2 bg-primary text-white rounded disabled:opacity-50 w-full sm:w-auto"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <span className="text-sm">
                Page{" "}
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <button
                className="px-3 py-2 bg-primary text-white rounded disabled:opacity-50 w-full sm:w-auto"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>

          {/* User View Modal */}
          {isModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-xs sm:max-w-md">
                <div className="flex flex-col items-center">
                  <img
                    src="/src/assets/avatar.png"
                    alt="Profile"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4"
                  />
                  <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <p className="text-gray-600 mt-2">
                    Company: {selectedUser.company}
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Modal with Edit */}
          {isProfileModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-xs sm:max-w-md">
                <div className="flex flex-col items-center">
                  <img
                    src="/src/assets/avatar.png"
                    alt="Profile"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4"
                  />

                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full text-center"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveUsername();
                        }
                        if (e.key === "Escape") {
                          setIsEditing(false);
                          setEditedUsername(profileUsername);
                        }
                      }}
                    />
                  ) : (
                    <h2 className="text-xl font-bold">{profileUsername}</h2>
                  )}

                  {!isEditing && (
                    <p className="text-gray-600 mt-2">
                      This is your profile info
                    </p>
                  )}

                  <div className="flex gap-4 mt-4">
                    {isEditing ? (
                      <>
                        <button
                          onClick={saveUsername}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditedUsername(profileUsername);
                          }}
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => setIsProfileModalOpen(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
