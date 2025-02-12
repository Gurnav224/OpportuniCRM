import { Link, useSearchParams } from "react-router-dom";
import useLead from "../context/LeadContext";
import { useEffect, useState } from "react";
import { leadStatus, priorityOptions } from "../utils/selectValues";
import SelectComponent from "../components/Select";

const LeadStatusView = () => {
  const { leads, get, agents } = useLead();
  const [filterLeads , setFilterLeads] = useState()


  const [searchParams , setSearchParams] = useSearchParams();
  const status = searchParams.get('status');
  const name = searchParams.get('name');
  const priority = searchParams.get('priority');
  
  const newParams = new URLSearchParams(searchParams);

  useEffect(() => {
    get("/leads", { status , name , priority});
  }, [get, status, name, priority]);

  useEffect(() =>{
    setFilterLeads(leads)
  },[leads])

  useEffect(() => {
    get("/agents");
  }, [get]);

  const agentNames = agents.map((agent) => agent.name);


  const filterByStatus = (e) => {
    const {value} = e.target;
    if(value){
      newParams.set('status', value)
    }
    else{
      newParams.delete('status')
    }
    setSearchParams(newParams)
  }


  const filterBySalesAgent = (e) => {
     const {value:agent} = e.target;
     if(agent){
      newParams.set('name',agent)
     }
     else{
      newParams.delete('name')
     }
     setSearchParams(newParams)
  }

  const filterByPriority = (e) => {
    const {value:priority} = e.target;
    if(priority){
      newParams.set('priority',priority)
    }
    else{
      newParams.delete('priority')
    }
    setSearchParams(newParams)
  }



  const sortByTimeToClose = () => {
    setFilterLeads((prev) => {
      const sorted = [...prev].sort((a,b) => a.timeToClose - b.timeToClose);
      return sorted
    })
  }
  

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800">Leads By Status</h1>

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

        {/* Lead List Section */}
        <section className="w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center border-b pb-3 text-gray-800">
            Lead List By Status
          </h2>

          {/* Filter by Status */}
          <div className="my-4">
            <SelectComponent
              options={leadStatus}
              name="status"
              label="Status"
              inputChangeHandler={filterByStatus}
            />
          </div>

          {/* Lead List */}
          <ul className="w-full bg-gray-50 shadow-md rounded-lg overflow-hidden">
            <li className="grid grid-cols-2 bg-gray-200 py-3 px-4 border-b text-gray-700 font-medium text-lg">
              <p className="text-left">Lead Name</p>
              <p className="text-left">Sales Agent</p>
            </li>
            {filterLeads?.length > 0 ? (
              filterLeads.map((lead) => (
                <li
                  key={lead._id}
                  className="grid grid-cols-2 py-3 px-4 border-b hover:bg-gray-100 text-gray-800 text-left"
                >
                  <p>{lead.name}</p>
                  <p>{lead.salesAgent.name}</p>
                </li>
              ))
            ) : (
              <li className="py-3 px-4 text-gray-500">No Leads Found</li>
            )}
          </ul>

          {/* Filters Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filter by Sales Agent */}
            <SelectComponent
              options={agentNames}
              label="Sales Agent"
              name="agent"
              inputChangeHandler={filterBySalesAgent}
            />

            {/* Filter by Priority */}
            <SelectComponent
              options={priorityOptions}
              name="priority"
              label="Priority"
              inputChangeHandler={filterByPriority}
            />
          </div>

          {/* Sorting Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={sortByTimeToClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all"
            >
              Sort by: Time to Close
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeadStatusView;
