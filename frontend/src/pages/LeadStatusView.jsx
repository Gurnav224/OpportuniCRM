import { Link } from "react-router-dom";
import useLead from "../context/LeadContext";
import { useEffect, useState } from "react";

const LeadStatusView = () => {
  const options = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];
  const [filterLeads , setFilterLeads] = useState()

  const { leads, get, agents } = useLead();
  const [selected, setSelected] = useState("New");

  useEffect(() => {
    get("/leads", { status: selected });
  }, [get, selected]);

  useEffect(() =>{
    setFilterLeads(leads)
  },[leads])

  useEffect(() => {
    get("/agents");
  }, [get]);


  const filterBySalesAgent = (e) => {
     const {value:agent} = e.target;
      setFilterLeads(leads.filter((lead) => lead.salesAgent.name === agent))
  }

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
      <h1 className="font-medium text-3xl text-center py-4 px-3">
        Leads By Status
      </h1>
      <div className="container flex py-3 px-3 mx-auto">
        <div className="w-40">
          <Link
            className="py-4  text-2xl font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to="/"
          >
            Back To Dashboard
          </Link>
        </div>
        <div className="border w-full">
          <div className="m-3">
            <h2 className="text-2xl font-bold border text-center py-3">
              Lead List By Status
            </h2>
          </div>
          <hr />
          <div className="py-3 px-4">
            <label className="mx-3" htmlFor="status">
              Status:
            </label>
            <select
              className="border py-2 px-3"
              onChange={(e) => setSelected(e.target.value)}
              name="status"
              id="status"
            >
              {options.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <hr />
          <ul className="py-3 px-3">
            {filterLeads?.map((lead) => (
              <li key={lead._id} className="py-1 px-3">
                {lead.name} - Sales Agent: {lead.salesAgent.name}
              </li>
            ))}
          </ul>
          <hr />
          {/* Filters */}
          <div className="py-3 px-4 flex gap-5">
            <span>Filters: </span>
            <div>
            <label className="mx-3" htmlFor="status">
              Sales Agent:
            </label>
            <select className="border px-3 py-1" onChange={ (e) =>  filterBySalesAgent(e)} name="status" id="status">
              {agents.map((agent) => (
                <option key={agent._id} value={agent.name}>
                  {agent.name}
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

export default LeadStatusView;
