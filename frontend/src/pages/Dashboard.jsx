import Sidebar from "../components/Sidebar";
import { Link, useSearchParams } from "react-router-dom";
import useLead from "../context/LeadContext";
import { useEffect } from "react";
import { filterByStatus } from "../utils/filterByStatus";
import { leadStatus } from "../utils/selectValues";
import SelectComponent from "../components/Select";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { get, error, loading, leads } = useLead();

  useEffect(() => {
    const selectedStatus = searchParams.get("status");
    get("/leads", { status: selectedStatus });
  }, [get, searchParams]);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("status", value);
    } else {
      newParams.delete("status");
    }

    setSearchParams(newParams);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex w-full">
      {/* Sidebar */}
      <Sidebar />
      <div className="w-full">
        {/* Header */}
        <header className="bg-white shadow-md py-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            OpportuniCRM Dashboard
          </h1>
        </header>

        {/* Main Content */}
        <main className="shadow-lg rounded-lg p-6 w-auto  mx-auto my-4">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Overview
          </h2>
          <hr className="my-4 border-gray-300" />

          {/* Loading & Error Messages */}
          {loading && <p className="text-blue-500 text-center">{loading}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Leads List */}
          <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-700 px-3">Leads</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
              {leads?.map((lead) => (
                <li
                  key={lead._id}
                  className="bg-white shadow-md rounded-lg p-4 border"
                >
                  <Link
                    className="text-lg font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    to={`/leads/${lead._id}`}
                  >
                    {lead.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lead Status */}
          <div className="mt-6">
            <h3 className="text-xl font-medium text-gray-700 px-3">
              Lead Status
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {["New", "Contacted", "Qualified"].map((status) => (
                <li
                  key={status}
                  className="bg-gray-50 shadow-md rounded-lg p-4 border"
                >
                  <p className="text-lg font-medium text-gray-700">{status}:</p>
                  <span className="text-xl font-semibold text-blue-600">
                    {filterByStatus(leads, status)}
                  </span>{" "}
                  Leads
                </li>
              ))}
            </ul>
          </div>

          {/* Filters & Actions */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md border">
            <div className="flex items-center gap-4">
              <p className="font-medium text-gray-700">Quick Filters:</p>
              <SelectComponent
                options={leadStatus}
                inputChangeHandler={handleFilterChange}
                name="status"
              />
            </div>
            <Link
              to="/newlead"
              className="mt-4 inline-block text-blue-600 hover:underline font-medium border p-3 rounded-lg "
            >
              ➕ Add New Lead
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
