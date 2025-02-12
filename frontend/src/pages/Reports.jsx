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
    <div className="min-h-screen bg-gray-100 py-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800">OpportuniCRM Reports</h1>

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

        {/* Report Section */}
        <section className="w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center border-b pb-3 text-gray-800">
            Report Overview
          </h2>

          {/* Pie Chart - Total Leads */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 shadow-sm p-6 rounded-lg mt-6">
            <p className="text-xl font-medium text-gray-700">Total Leads Closed and In Pipeline</p>
            <div className="w-64 h-64">
              <LeadsPieChart data={closedAndPipelineData} />
            </div>
          </div>

          {/* Bar Chart - Leads Closed by Sales Agent */}
          <div className="bg-gray-50 shadow-sm p-6 rounded-lg mt-6">
            <p className="text-xl font-medium text-gray-700">
              Leads Closed by Sales Agent:
            </p>
            <div className="w-full">
              <LeadsBarChart data={closedLeadData} />
            </div>
          </div>

          {/* Pie Chart - Lead Distribution */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 shadow-sm p-6 rounded-lg mt-6">
            <p className="text-xl font-medium text-gray-700">Lead Distribution by Status:</p>
            <div className="w-64 h-64">
              <LeadsPieChart data={leadDistributedData} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reports;
