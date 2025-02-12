import { Link } from "react-router-dom";
import useLead from "../context/LeadContext";
import { useEffect } from "react";

const Agents = () => {
  const { agents, get, error, loading } = useLead();

  useEffect(() => {
    get("/agents");
  }, [get]);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
    {/* Page Title */}
    <h1 className="text-3xl font-bold text-center text-gray-800">Sales Agent Management</h1>

    <div className="flex flex-col md:flex-row container mx-auto py-6 gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-5 rounded-lg">
        <Link
          className="text-2xl font-semibold text-blue-600 dark:text-blue-500 hover:underline block"
          to="/"
        >
          ⬅ Back To Dashboard
        </Link>
      </aside>

      {/* Sales Agent List Section */}
      <section className="w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center border-b pb-3 text-gray-800">
          Sales Agent Management
        </h2>

        {/* Loading & Error Messages */}
        {loading && <p className="text-blue-500 text-center py-3">Loading...</p>}
        {error && <p className="text-red-500 text-center py-3">{error}</p>}

        {/* Sales Agent List */}
        <ul className="w-full bg-white shadow-md rounded-lg overflow-hidden mt-4">
          {/* Table Header */}
          <li className="grid grid-cols-1 sm:grid-cols-3 bg-gray-200 py-3 px-4 border-b text-gray-700 font-medium text-lg">
            <p className="text-left">Agent</p>
            <p className="text-left">Name</p>
            <p className="text-left">Email</p>
          </li>

          {/* Agent Rows */}
          {agents.length > 0 ? (
            agents.map((agent) => (
              <li
                key={agent._id}
                className="grid grid-cols-1 sm:grid-cols-3 py-3 px-4 border-b hover:bg-gray-100 text-gray-800 text-left transition-all"
              >
                <p>👤</p>
                <p>{agent.name}</p>
                <p>{agent.email}</p>
              </li>
            ))
          ) : (
            <li className="py-3 px-4 text-gray-500 text-center">No Agents Found</li>
          )}
        </ul>

        {/* Add New Agent Button */}
        <div className="mt-6 flex justify-center">
          <Link
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all font-medium"
            to="/newagent"
          >
            ➕ Add New Agent
          </Link>
        </div>
      </section>
    </div>
  </div>

  );
};

export default Agents;
