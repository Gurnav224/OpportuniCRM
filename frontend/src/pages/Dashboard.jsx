import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import useLead from "../context/LeadContext";
import { useEffect, useState } from "react";
import { filterByStatus } from "../utils/filterByStatus";

const Dashboard = () => {
  const { leads, loading, error } = useLead();
  const [filterLeads, setFilterLeads] = useState([]);

  // re-render every time when leads array change
  useEffect(() => {
    setFilterLeads(leads);
  }, [leads]);

  const handleFilterChange = (status) => {
    setFilterLeads(
      status !== "all" ? leads.filter((lead) => lead.status === status) : leads
    );
  };

  return (
    <>
      <h1 className="text-3xl text-center my-3">OpportuniCRM Dashboard</h1>

      <div className="flex container mx-auto py-4">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="border w-full">
          <h1 className="text-2xl py-4 text-center">Main Content</h1>
          <hr />
          {loading && <p>{loading}</p>}
          {error && <p>{error}</p>}

          <ul className="px-3 py-3 flex gap-4 flex-wrap">
            {filterLeads?.map((lead) => (
              <li key={lead._id}>
                <Link to={`/leads/${lead._id}`}>{lead.name}</Link>
              </li>
            ))}
          </ul>
          <hr />
          <p className="text-xl px-3">Lead Status</p>
          <ul className="px-3 py-3">
            <li>New: [{filterByStatus(leads, "New")}] Leads</li>
            <li>Contacted: [{filterByStatus(leads, "Contacted")}] Leads</li>
            <li>Qualified: [{filterByStatus(leads, "Qualified")}] Leads</li>
          </ul>
          <hr />
          <div>
            <div className="flex px-3">
              <p className="mx-1">Quick Filters</p>
              <button
                onClick={() => handleFilterChange("all")}
                className="mx-1"
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange("New")}
                className="mx-1"
              >
                New{" "}
              </button>
              <button
                onClick={() => handleFilterChange("Contacted")}
                className="mx-1"
              >
                Contacted
              </button>
            </div>
            <Link to={"/newlead"} className="px-3 py-3 block">
              Add New Lead
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
