import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewLead from "./pages/NewLead";
import NewAgent from "./pages/NewAgent";
import Leads from "./pages/Leads";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Agents from "./pages/Agents";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { LeadProvider } from "./context/LeadContext";
import LeadDetails from "./pages/LeadDetails";
import LeadStatusView from "./pages/LeadStatusView";

function App() {
  return (
    <LeadProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/newlead" element={<NewLead />} />
          <Route path="/newagent" element={<NewAgent />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/leads/:leadId" element={<LeadDetails/>} />
          <Route path="/statusview" element={<LeadStatusView/>} />
        </Routes>
      </Router>
    </LeadProvider>
  );
}

export default App;
