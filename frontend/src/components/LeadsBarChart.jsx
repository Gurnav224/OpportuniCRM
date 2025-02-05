  
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
  
  const LeadsBarChart = ({ data }) => {
    return (
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis  />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#3884d8" name="Closed Leads"/>
      </BarChart>
    );
  };


  export default LeadsBarChart