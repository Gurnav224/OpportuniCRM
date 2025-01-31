import { createContext, useContext, useEffect } from "react";
import { useFetch } from "../custom/useFetch";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const {
    items: leads,
    get,
    loading,
    error,
  } = useFetch("http://localhost:3000/api");

  useEffect(() => {
    get("/leads");
  }, [get]);

  return (
    <LeadContext.Provider value={{ leads, get, loading, error }}>
      {children}
    </LeadContext.Provider>
  );
};

const useLead = () => useContext(LeadContext);

export default useLead;
