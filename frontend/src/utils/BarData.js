export const processBarData = (data) => {
    const agentCounts = data.reduce((acc, lead) => {
      const agentName = lead.salesAgent.name;
      acc[agentName] = (acc[agentName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(agentCounts).map(([name, count]) => ({
      name,
      value: count,
    }));
  };

