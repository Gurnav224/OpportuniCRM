

export  const filterByStatus = (leads, status) => {
    return leads.filter((lead) => lead.status === status).length
  }