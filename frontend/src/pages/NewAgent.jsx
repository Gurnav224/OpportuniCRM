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
    <div className="container mx-auto px-5 py-3">
      <h1 className="text-3xl my-5"> Add New Sales Agent </h1>
      <form onSubmit={handleSubmit} method="post">
        <div className="my-3">
          <label className="block py-2" htmlFor="name">Agent Name:</label>
          <input
          className="border py-2 px-3 w-full"
            type="text"
            id="name"
            name="name"
            value={agent.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <label className="block py-2" htmlFor="email">Email Address:</label>
          <input
           className="border py-2 px-3 w-full"
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={agent.email}
          />
        </div>
        {loading && <p>Loading.......</p>}
        {error && <p>{error}</p>}
        <button className="py-2 px-3 text-2xl  bg-black  text-white" type="submit">Create Agent</button>
      </form>
    </div>
  );
};

export default NewAgent;
