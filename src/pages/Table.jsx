import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center bg-white shadow p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md mr-4"
            aria-label="Toggle Sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h2 className="text-2xl font-bold">Users Table</h2>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-xl p-4 shadow">
            <table className="min-w-full">
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
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <span>
                Page{" "}
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <button
                className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>

          {/* User View Modal */}
          {isModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <div className="flex flex-col items-center">
                  <img
                    src="/src/assets/avatar.png"
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-4"
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
        </main>
      </div>
    </div>
  );
};

export default Table;
