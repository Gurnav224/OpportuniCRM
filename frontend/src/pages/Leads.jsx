import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useLead from "../context/LeadContext";
import { leadStatus, crmTags, leadSource } from "../utils/selectValues";
import SelectComponent from "../components/Select";

const Leads = () => {
  const { leads, get, agents, error, loading } = useLead();
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get("name") || "";
  const status = searchParams.get("status") || "";
  const tag = searchParams.get("tag") || "";
  const source = searchParams.get("source") || "";

  useEffect(() => {
    get("/leads", { status, name, tag, source });
  }, [get, name, status, tag, source]);

  useEffect(() => {
    get("/agents");
  }, [get]);
  const newParams = new URLSearchParams(searchParams);

  const agentNames = agents.map((agent) => agent.name);

  const filterByStatus = (e) => {
    const { value } = e.target;
    if (value) {
      newParams.set("status", value);
    } else {
      newParams.delete("status");
    }
    setSearchParams(newParams);
  };

  const filterBySalesAgent = (e) => {
    const { value } = e.target;
    if (value) {
      newParams.set("name", value);
    } else {
      newParams.delete("name");
    }
    setSearchParams(newParams);
  };

  const filterByTagName = (e) => {
    const { value } = e.target;
    if (value) {
      newParams.set("tag", value);
    } else {
      newParams.delete("tag");
    }
    setSearchParams(newParams);
  };

  const filterBySource = (e) => {
    const { value } = e.target;
    if (value) {
      newParams.set("source", value);
    } else {
      newParams.delete("source");
    }
    setSearchParams(newParams);
  };

  const sortByPriority = () => {
    get("/leads", { sortBy: "priority", order: "desc" });
  };

  const sortByTimeToClose = () => {
    get("/leads", { sortBy: "timeToClose", order: "desc" });
  };

  return (
    <div className="flex flex-col md:flex-row container mx-auto py-6 gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg p-5 rounded-lg">
        <Link
          className="text-2xl font-semibold text-blue-600 dark:text-blue-500 hover:underline block"
          to={"/"}
        >
          ⬅ Back To Dashboard
        </Link>
      </aside>

      {/* Lead List Section */}
      <section className="w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Lead Overview</h1>
        <hr className="my-4 border-gray-300" />

        {/* Loading & Error Messages */}
        {loading && <p className="text-xl py-3 text-green-500 text-center">Loading...</p>}
        {error && <p className="text-xl py-3 text-red-500 text-center">{error}</p>}
        {leads.length === 0 && (
          <p className="text-xl py-3 text-red-500 text-center">No Leads Found</p>
        )}

        {/* Leads Table */}
        <ul className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          {/* Table Header */}
          <li className="grid grid-cols-5 bg-gray-100 py-3 px-4 border-b text-gray-700 font-semibold text-lg">
            <p className="min-w-[160px]">Name</p>
            <p className="min-w-[160px]">Status</p>
            <p className="min-w-[160px]">Sales Agent</p>
            <p className="min-w-[160px]">Priority</p>
            <p className="min-w-[160px]">Time To Close</p>
          </li>

          {/* Table Rows */}
          {leads.map((lead, index) => (
            <li
              key={lead._id}
              className={`grid grid-cols-5 py-3 px-4 border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-all`}
            >
              <p className="min-w-[160px]">
                <Link
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  to={`/leads/${lead._id}`}
                >
                  {lead.name}
                </Link>
              </p>
              <p className="min-w-[160px]">{lead.status}</p>
              <p className="min-w-[160px]">{lead.salesAgent.name}</p>
              <p className="min-w-[160px]">{lead.priority}</p>
              <p className="min-w-[160px]">{lead.timeToClose}</p>
            </li>
          ))}
        </ul>

        <hr className="my-6 border-gray-300" />

        {/* Filters Section */}
        <h4 className="font-semibold text-2xl px-3">Filters:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 rounded-lg shadow-md">
          <div className="py-3 bg-gray-100 rounded-lg">
            <SelectComponent options={leadStatus} inputChangeHandler={filterByStatus} name="status" label="By Status" />
          </div>
          <div className="py-3 bg-gray-100 rounded-lg">
            <SelectComponent inputChangeHandler={filterBySalesAgent} label="By Sales Agent" name="salesAgent" options={agentNames} />
          </div>
          <div className="py-3 bg-gray-100 rounded-lg">
            <SelectComponent label="By Tag" options={crmTags} name="tags" inputChangeHandler={filterByTagName} />
          </div>
          <div className="py-3 bg-gray-100 rounded-lg">
            <SelectComponent name="source" options={leadSource} inputChangeHandler={filterBySource} label="By Source" />
          </div>
        </div>

        {/* Sort Section */}
        <div className="py-3 px-3 flex flex-wrap items-center gap-3">
          <p className="font-semibold text-lg">Sort By:</p>
          <button
            onClick={sortByPriority}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all"
          >
            Priority
          </button>
          <button
            onClick={sortByTimeToClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all"
          >
            Time To Close
          </button>
        </div>

        {/* Add New Lead */}
        <Link
          to={"/newlead"}
          className="mt-4 inline-block text-blue-600 hover:underline font-medium"
        >
          ➕ Add New Lead
        </Link>
      </section>
    </div>
  );
};

export default Leads;
