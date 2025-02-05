import { Link } from "react-router-dom";
import useLead from "../context/LeadContext";
import { useEffect } from "react";
import LeadsBarChart from "../components/LeadsBarChart";
import LeadsPieChart from "../components/LeadsPieChart";
import { processBarData } from "../utils/BarData";
import { processStatusData } from "../utils/PieData";

const Reports = () => {
  const { leads, get } = useLead();

  useEffect(() => {
    get("/leads");
  }, [get]);

  const closedLeads = leads?.filter((lead) => lead.status === "Closed");
  const pipelineLeadsCount = leads.filter((lead) => lead.status !== "Closed");

  let closedAndPipelineData = [
    { name: "Closed", value: closedLeads.length },
    { name: "Pipeline", value: pipelineLeadsCount.length },
  ];

  const leadDistributedData = processStatusData(leads);
  const closedLeadData = processBarData(closedLeads);

  return (
    <>
      <h1 className="py-3 px-4 text-3xl text-center font-bold">
        OpportuniCRM Reports
      </h1>
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
        {/* Report Screen */}
        <div className="border w-full container">
          <h2 className="py-3 px-4 text-2xl text-center font-medium border m-3">
            Report Overview
          </h2>
          <hr />
          {/* Pie Chart */}
          <div className="flex justify-around items-center border m-3">
            <p className="text-3xl font-medium">Total Leads Closed and In Pipeline</p>
            <LeadsPieChart data={closedAndPipelineData} />
          </div>
          {/* Bar Chart */}
          <div className="border m-3">
            <p className="py-3 px-4 font-medium">
              Leads Closed by Sales Agent:{" "}
            </p>
            <LeadsBarChart data={closedLeadData} />
            <div />
          </div>
          {/* Pie Chart */}
          <div className="border m-3 flex items-center justify-around">
            <p className="text-3xl font-medium">Lead Distribution by status:</p>
            <LeadsPieChart data={leadDistributedData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
