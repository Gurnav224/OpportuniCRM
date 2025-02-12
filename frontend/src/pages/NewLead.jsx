import { useEffect, useState } from "react";
import { useFetch } from "../custom/useFetch";
import Select from "react-select";
import SelectComponent from "../components/Select";
import { leadSource, leadStatus, crmTags, priorityOptions } from "../utils/selectValues";
import { useLocation, useNavigate , Link} from "react-router-dom";

const NewLead = () => {
  const [clearSelectedTag, setClearSelectedTag] = useState("");
  const [clearSelectedAgent, setClearSelectedAgent] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const [newLead, setNewLead] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: 0,
    priority: "",
  });

  useEffect(() => {
    if (state) {
      setNewLead(state);
    }
  }, [state]);

  const { get, post, error, loading, agents, put } = useFetch(
    "http://localhost:3000/api"
  );

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

  const handleUpdateLead = async (e) => {
    e.preventDefault();

    await put(`/leads/${state._id}`, newLead);

    setTimeout(() => {
      navigate(`/leads/${state._id}`);
    }, 2000);
  };


  return (
    <div className="min-h-screen bg-gray-100 py-6">
    {/* Page Header */}
    <h1 className="text-3xl font-bold text-center text-gray-800">  
      {state ? "Edit Lead" : "Add New Lead"}
    </h1>

    <div className="flex flex-col md:flex-row container mx-auto py-6 gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-5 rounded-lg">
        <Link
          className="text-2xl font-semibold text-blue-600 dark:text-blue-500 hover:underline block"
          to={"/"}
        >
          ⬅ Back To Dashboard
        </Link>
      </aside>

      {/* Form Section */}
      <section className="w-full bg-white shadow-lg rounded-lg p-6">
        <form
          onSubmit={state ? handleUpdateLead : handleCreateLead}
          method="post"
          className="space-y-6"
        >
          {/* Lead Name */}
          <div>
            <label className="block text-gray-700 font-medium">Lead Name:</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={inputChangeHandler}
              value={newLead.name}
              required
            />
          </div>

          {/* Lead Source */}
          <SelectComponent
            options={leadSource}
            name="source"
            value={newLead.source}
            label="Lead Source"
            inputChangeHandler={inputChangeHandler}
          />

          {/* Sales Agent */}
          <div>
            <label className="block text-gray-700 font-medium">Sales Agent:</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              options={options}
              value={clearSelectedAgent}
              onChange={inputSelectedAgentChange}
            />
          </div>

          {/* Lead Status */}
          <SelectComponent
            options={leadStatus}
            label="Lead Status"
            name="status"
            value={newLead.status}
            inputChangeHandler={inputChangeHandler}
          />

          {/* Priority */}
          <SelectComponent
            options={priorityOptions}
            label="Priority"
            name="priority"
            value={newLead.priority}
            inputChangeHandler={inputChangeHandler}
          />

          {/* Time To Close */}
          <div>
            <label className="block text-gray-700 font-medium">Time To Close (days):</label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              type="number"
              name="timeToClose"
              value={newLead.timeToClose}
              onChange={inputChangeHandler}
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-medium">Tags:</label>
            <Select
              isMulti
              options={crmTagsOptions}
              value={clearSelectedTag}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={inputSelectedTagChange}
            />
          </div>

          {/* Error & Loading Messages */}
          <div>
            {error && <p className="text-red-600">{error}</p>}
            {loading && <p className="text-green-600">{loading}</p>}
          </div>

          {/* Submit Button */}
          <button
            className="w-full md:w-40 py-3 bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold rounded-lg transition-all"
            type="submit"
          >
            {state ? "Update Lead" : "Create Lead"}
          </button>
        </form>
      </section>
    </div>
  </div>
  );
};

export default NewLead;
