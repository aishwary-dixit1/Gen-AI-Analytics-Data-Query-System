import React, { useState } from 'react'
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';

const QueryPage = () => {

    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const handleConvert = async () => {
        try {
            const res = await axiosInstance.post("/api/query", { query }, {withCredentials: true});

            const { sqlQuery } = res.data;

            setResponse(sqlQuery);

        } catch (error) {
            toast.error("Oops, Something went wrong");
            console.error("Error:", error.response?.data || error.message);
        }
    }
  return (
    <div className="flex flex-col gap-3 justify-center items-center m-2">

        <textarea type="text" value={query} placeholder="Enter your query" className="textarea textarea-primary" onChange={(e) => setQuery(e.target.value)}></textarea>

        <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleConvert}>Convert</button>
        </div>

        {
           response.length > 0 && (
            <div className="flex justify-center card card-dash bg-base-100 w-[85%]">

                <div className="card-body">
                    <h2 className="card-title">Pseudo-SQL Query</h2>
                    <p>{response}</p>
                </div>

            </div>
           ) 
        }

    </div>
  );
}

export default QueryPage