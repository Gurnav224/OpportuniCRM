
export   const processStatusData = (data) => {
       const statusCounts = data.reduce((acc, lead) => {
        const status = lead.status;
        acc[status] = (acc[status] || 0) +1;
        return acc
       },{})


       return Object.entries(statusCounts).map(([name,count]) => ({
        name,
        value:count
       }))
  }