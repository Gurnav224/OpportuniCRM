import { useState } from "react";
import { useFetch } from "../custom/useFetch";
import { Link } from "react-router-dom";

const NewAgent = () => {
  const {  post , error , loading, } = useFetch();

  const [agent, setAgent] = useState({
    email: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
      await post("/agents", agent);
      setAgent({
        name:'',
        email:''

      })
  };

  return (
    <div className="flex flex-col md:flex-row container mx-auto py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-lg p-5 rounded-lg">
        <Link
          className="text-2xl font-semibold text-blue-600 dark:text-blue-500 hover:underline block"
          to={"/"}
        >
          ⬅ Back To Dashboard
        </Link>
      </aside>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Sales Agent</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} method="post" className="space-y-5">
          {/* Agent Name */}
          <div>
            <label className="block text-gray-700 font-medium">Agent Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={agent.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-gray-700 font-medium">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={handleInputChange}
              value={agent.email}
              required
            />
          </div>

          {/* Error & Loading Messages */}
          <div>
            {loading && <p className="text-green-600 text-center">Loading...</p>}
            {error && <p className="text-red-600 text-center">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold rounded-lg transition-all"
          >
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAgent;
