import axios from "axios";
import { useCallback, useState } from "react"


export const useFetch = (baseUrl) => {
    const [items , setItems] = useState([])
    const [data , setData] = useState({});
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);

    // GET request 
    const get = useCallback(async (endpoint, params = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await  axios.get(`${baseUrl}${endpoint}`,{params});
            setItems(response.data);
            return response.data
        } catch (error) {
            setError(error?.response?.data?.error || 'Something went wrong')
        }
        finally{
            setLoading(false)
        }
    },[baseUrl])



     // POST request
    const post = useCallback(async (endpoint, body) => {
       setLoading(true);
       setError(null);

       try {
         const response = await axios.post(`${baseUrl}${endpoint}`,body);
         setData(response.data);
         return response.data
       } catch (error) {
          setError(error?.response?.data?.error || "something went wrong")
       }
       finally{
        setLoading(false)
       }
       

    },[baseUrl])




    return {data , loading, error , post , get , items}
}