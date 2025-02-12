import axios from "axios";
import { useCallback, useState } from "react";

export const useFetch = (baseUrl) => {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lead, setLead] = useState({});
  const [comments, setComments] = useState([]);
  // GET request
  const get = useCallback(
    async (endpoint, params = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${baseUrl}${endpoint}`, { params });

        if (endpoint === `/leads/${params.leadId}`) {
          setLead(response?.data);
        }

        if (endpoint === "/leads") {
          setLeads(response?.data);
        }

        if (endpoint === "/agents") {
          setAgents(response?.data);
        }

        if (endpoint === "/comment") {
          setComments(response.data);
        }

        return response?.data;
      } catch (error) {
        setError(error?.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  // POST request
  const post = useCallback(
    async (endpoint, body) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(`${baseUrl}${endpoint}`, body);
        setData(response.data);
        return response.data;
      } catch (error) {
        setError(error?.response?.data?.error || "something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  // PUT request

  const put = useCallback(
    async (endpoint, body) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.put(`${baseUrl}${endpoint}`, body);

        setAgents(response.data);
      } catch (error) {
        setError(error?.response?.data?.error || "something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  return {
    data,
    loading,
    error,
    post,
    get,
    leads,
    agents,
    lead,
    put,
    comments,
  };
};
