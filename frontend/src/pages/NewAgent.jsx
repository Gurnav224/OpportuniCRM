import { useState } from "react";
import { useFetch } from "../custom/useFetch";

const NewAgent = () => {
  const {  post , error , loading, } = useFetch("http://localhost:3000/api");

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
