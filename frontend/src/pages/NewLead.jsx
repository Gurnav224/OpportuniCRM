import { useEffect, useState } from "react";
import { useFetch } from "../custom/useFetch";
import Select from "react-select";
import SelectComponent from "../components/Select";
import { leadSource, leadStatus, crmTags, priority } from "../utils/newLead";

const NewLead = () => {
  const [clearSelectedTag, setClearSelectedTag] = useState("");
  const [clearSelectedAgent, setClearSelectedAgent] = useState("");

  const [newLead, setNewLead] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: 0,
    priority: "",
  });

  const {
    get,
    post,
    error,
    loading,
    items: agents,
  } = useFetch("http://localhost:3000/api");

  const options = (Array.isArray(agents) ? agents : []).map((agent) => ({
    value: agent?._id,
    label: agent?.name,
  }));

  const crmTagsOptions = crmTags.map((tag) => ({
    label: tag,
    value: tag,
  }));


  useEffect(() => {
    get("/agents");
  }, [get]);

  

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setNewLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputSelectedTagChange = (selected) => {
    setClearSelectedTag(selected);
    setNewLead((prev) => ({
      ...prev,
      tags: selected.map((tag) => tag.value),
    }));
  };

  const inputSelectedAgentChange = (selected) => {
    setClearSelectedAgent(selected);
    setNewLead((prev) => ({
      ...prev,
      salesAgent: selected.value,
    }));
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    await post("/leads", newLead);

    setNewLead({
      name: "",
      source: "",
      salesAgent: "",
      status: "",
      tags: [],
      timeToClose: 0,
      priority: "",
    });

    setClearSelectedAgent("");
    setClearSelectedTag("");
  };

  return (
    <div className="container mx-auto px-5 py-3">
      <h1 className="text-3xl my-5"> Add New Lead</h1>
      <form onSubmit={handleCreateLead} method="post">
        <div>
          <label className="block py-2" htmlFor="name">
            Lead Name:
          </label>
          <input
            type="text"
            name="name"
            className="border py-2 px-3 w-full"
            onChange={inputChangeHandler}
            value={newLead.name}
          />
        </div>
        <div>
          <SelectComponent
            options={leadSource}
            name="source"
            value={newLead.source}
            label={"Lead Source"}
            inputChangeHandler={inputChangeHandler}
          />
        </div>
        <div>
          <label className="block py-3" htmlFor="salesAgent">
            Sales Agent
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={options}
            value={clearSelectedAgent}
            onChange={inputSelectedAgentChange}
          />
        </div>
        <div>
          <SelectComponent
            options={leadStatus}
            label={"Lead Status"}
            name={"status"}
            value={newLead.status}
            inputChangeHandler={inputChangeHandler}
          />
        </div>
        <div>
          <SelectComponent
            options={priority}
            label={"Priority"}
            name={"priority"}
            value={newLead.priority}
            inputChangeHandler={inputChangeHandler}
          />
        </div>
        <div>
          <label className="block py-3" htmlFor="timeToClose">
            Time To Close:
          </label>
          <input
            className="w-full border py-3 px-3"
            type="number"
            name="timeToClose"
            id="timeToClose"
            value={newLead.timeToClose}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="my-3">
          <label htmlFor="block py-3">Tags:</label>
          <Select
            isMulti
            options={crmTagsOptions}
            value={clearSelectedTag}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={inputSelectedTagChange}
          />
        </div>
        <div className="my-3">
          {error && <p className="text-red-600">{error}</p>}
          {loading && <p className="text-green-600">{loading}</p>}
        </div>
        <button
          className="py-2 px-3 bg-black w-40 text-2xl text-white"
          type="submit"
        >
          Create Lead
        </button>
      </form>
    </div>
  );
};

export default NewLead;
