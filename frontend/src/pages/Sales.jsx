import { Link } from "react-router-dom";
import useLead from "../context/LeadContext";
import { useEffect, useState } from "react";

const Sales = () => {
  const { leads, get, agents } = useLead();
  const [agentQuery, setAgentQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const [filterLeads , setFilterLeads] = useState([])

  useEffect(() => {
    if (agentQuery) {
      get("/leads", { salesAgent: agentQuery });
    }
  }, [get, agentQuery]);

  useEffect(()=> {
    setFilterLeads(leads)
  },[leads])

  useEffect(() => {
    if (statusQuery) {
      get("/leads", { status: statusQuery });
    }
  }, [get, statusQuery]);

  useEffect(() => {
    get("/agents");
  }, [get]);

  const status = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  const filterByPriority = (e) => {
    const {value:priority} = e.target;
    setFilterLeads(leads.filter((lead) => lead.priority === priority))
  }


  const sortByTimeToClose = () => {
    setFilterLeads((prev) => {
      const sorted = [...prev].sort((a,b) => a.timeToClose - b.timeToClose);
      return sorted
    })
  }
  

  return (
    <>
      <h1 className="py-3 px-4 text-3xl text-center font-bold">
        Leads By Sales agent
      </h1>

      <div className="container mx-auto flex justify-center ">
        <div className="w-40">
          <Link
            className="py-4  text-2xl font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to="/"
          >
            Back To Dashboard
          </Link>
        </div>
        <div className="w-full border py-3 px-3">
          <h2 className="text-3xl text-center my-3 border py-3 px-3 ">
            Lead List By Agent
          </h2>
          <div className="my-3">
            <label className="mx-3" htmlFor="agent">
              Sales Agent
            </label>
            <select
              onChange={(e) => setAgentQuery(e.target.value)}
              className="border py-1 px-3"
              name="agent"
              id="agent"
            >
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
          <ul className=" border py-3 px-3">
            {filterLeads.map((lead) => (
              <li key={lead._id}>
                {lead.name} - {lead.status}
              </li>
            ))}
          </ul>

          {/* Filters */}

          <div className="flex items-center">
            <div>
              <label className="mx-3" htmlFor="status">
                Status
              </label>
              <select
                onClick={(e) => setStatusQuery(e.target.value)}
                className="border py-1 px-3 my-2"
                name="status"
                id="status"
              >
                {status.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>
            </div>
            <div>
                <label className="mx-2" htmlFor="priority">Priority</label>
                <select onChange={filterByPriority} className="border px-3 py-1" name="priority" id="priority">
                    <option value="">select</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
          </div>
          <div className="py-3 px-4">
            <button onClick={sortByTimeToClose}>Sort by: Time to Close</button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Sales;
