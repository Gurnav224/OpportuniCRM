
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
  } from "recharts";


const LeadsPieChart = ({ data}) => {
    const COLORS = ["#ffcc00", "#33ccff", "#663399", "#ff6666", "#99cc33"]; // Colors for Closed and In Pipeline

    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };

  export default LeadsPieChart;