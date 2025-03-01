import { createContext, useContext, useEffect } from "react";
import { useFetch } from "../custom/useFetch";





const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const {
    leads,
    get,
    loading,
    error,
    agents
  } = useFetch();



  useEffect(() => {
    get("/leads");
  }, [get]);

  return (
    <LeadContext.Provider value={{ leads, agents,  get, loading, error }}>
      {children}
    </LeadContext.Provider>
  );
};

const useLead = () => useContext(LeadContext);

export default useLead;
