import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLead from "../context/LeadContext";

const Leads = () => {
  const { leads, get, agents, error, loading } = useLead();
  const [selectedName, setSelectedName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    get("/leads");
    if (selectedName) {
      get("/leads", { name: selectedName });
    }

    if (selectedStatus) {
      get("/leads", { status: selectedStatus });
    }
  }, [get, selectedName, selectedStatus]);

  useEffect(() => {
    get("/agents");
  }, [get]);

  const status = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  const filterByStatus = (e) => {
    const { value } = e.target;
    setSelectedStatus(value);
  };

  const filterBySalesAgent = (e) => {
    const { value } = e.target;
    setSelectedName(value);
  };

  const sortByPriority = () => {
    get("/leads", { sortBy: "priority", order: "desc" });
  };

  const sortByTimeToClose = () => {
    get("/leads", { sortBy: "timeToClose", order: "desc" });
  };

  return (
    <div className="flex container mx-auto py-4 gap-2">
      {/* Sidebar */}
      <div className="w-40">
        <Link
          className="py-4  text-2xl font-medium text-blue-600 dark:text-blue-500 hover:underline"
          to={"/"}
        >
          Back To Dashboard
        </Link>
      </div>
      {/* Lead List */}
      <div className="border w-full">
        <h1 className="text-3xl text-center my-3">Lead Overview</h1>
        <hr />
        {loading && <p>loading.........</p>}
        {error && <p>{error}</p>}
        {leads.length === 0 && <p>No Leads Found</p>}
        <ul className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <li className="grid grid-cols-5 bg-gray-100 py-3 px-4 border-b text-gray-700 font-medium text">
            <p className="min-w-[160px]">Name</p>
            <p className="min-w-[160px]">Status</p>
            <p className="min-w-[160px]">Sales Agent</p>
            <p className="min-w-[160px]">Priority</p>
            <p className="min-w-[160px]">Time To Close</p>
          </li>
          {leads.map((lead) => (
            <li
              key={lead._id}
              className="grid grid-cols-5 py-3 px-4 border-b hover:bg-gray-50 text-gray-800 text-left"
            >
              <p className="min-w-[160px]">
                <Link
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  to={`/leads/${lead._id}`}
                >
                  {lead.name}
                </Link>
              </p>
              <p className="min-w-[160px]">{lead.status} </p>
              <p className="min-w-[160px]"> {lead.salesAgent.name}</p>
              <p className="min-w-[160px]">{lead.priority}</p>
              <p className="min-w-[160px]">{lead.timeToClose}</p>
            </li>
          ))}
        </ul>
        <hr />
        {/* filters by status or sales agent */}
        <div className="py-2 px-3 flex gap-2 items-center">
          <h4 className="font-bold">Filters: </h4>
          <div className="flex gap-3 items-center">
            <label className="block " htmlFor="status">
              Filter By Status
            </label>
            <select
              className="border py-2 px-2"
              onChange={(e) => filterByStatus(e)}
              name="status"
              id="status"
            >
              <option value="">select</option>
              {status.map((stat, index) => (
                <option key={index} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>
          <div className="py-1 px-3 flex gap-3">
            <div className="flex gap-3 items-center">
              <label className="block" htmlFor="salesAgent">
                Filter By Sales Agent
              </label>
              <select
                onChange={(e) => filterBySalesAgent(e)}
                className="border py-2 px-2"
                name="salesAgent"
                id="salesAgent"
              >
                <option value="">select</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent.name}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* sort by  */}
        <div className="py-1 px-3 flex gap-3">
          <p className="font-bold">Sort By: </p>
          <button onClick={sortByPriority}>Priority</button>
          <button onClick={sortByTimeToClose}>Time To Close</button>
        </div>
        <Link
          to={"/newlead"}
          className="px-3 py-3 block font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Add New Lead
        </Link>
      </div>
    </div>
  );
};

export default Leads;
