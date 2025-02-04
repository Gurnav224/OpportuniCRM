import { Link } from "react-router-dom";
import useLead from "../context/LeadContext";
import { useEffect } from "react";

const Agents = () => {
  const { agents, get, error, loading } = useLead();

  useEffect(() => {
    get("/agents");
  }, [get]);

  return (
    <>
      <h1 className="py-3 px-4 text-3xl text-center font-bold">
        Sales Agent Management
      </h1>
      <div className="container flex mx-auto py-3 px-4">
        <div className="w-40">
          <Link
            className="py-4 text-2xl font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to={"/"}
          >
            Back To Dashboard
          </Link>
        </div>
        <div className="w-full border">
          <h1 className="py-3 px-4 text-2xl text-center font-bold">
            Sales Agent Management{" "}
          </h1>
          <hr />
          {loading && <p>{loading}</p>}
          {error && <p>{error}</p>}
          <ul className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            {agents.map((agent) => (
              <li
                key={agent._id}
                className="grid grid-cols-3 bg-gray-100 py-3 px-4 border-b text-gray-700 font-medium text-left"
              >
                <p className="min-w-[160px]">Agent:</p>
                <p className="min-w-[160px]">{agent.name}</p>
                <p className="min-w-[290px]">{agent.email}</p>
              </li>
            ))}
          </ul>
          <div className="py-3 px-3">
            <Link
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              to="/newagent"
            >
              Add New Agent
            </Link>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Agents;
