import React from 'react';
import { axiosInstance } from '../utils/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ExplainPage = () => {

    const [sqlQuery, setSqlQuery] = useState("");
    
    const [queryDetails, setQueryDetails] = useState([]);

    const handleQuery = async () => {
        try {
            const res = await axiosInstance.post("/api/explain", { sqlQuery : sqlQuery }, {withCredentials: true});
    
            const queryDetails = res.data;

            setQueryDetails(queryDetails);
    
        } catch (error) {
            toast.error("Oops, Something went wrong");
            console.error("Error:", error.response?.data || error.message);
        }
    }

  return (
    <div className="flex flex-col gap-3 justify-center items-center m-2">

        <textarea type="text" value={sqlQuery} placeholder="Enter your query" className="textarea textarea-primary" onChange={(e) => setSqlQuery(e.target.value)}></textarea>

        <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleQuery}>Get Query Breakdown</button>
        </div>

        <div className="flex justify-center card card-dash bg-base-100 w-[85%]">

            <div className="card-body">
                {queryDetails.length !== 0 && (
                    <div> 
                        <h2 className="card-title">Pseudo-SQL Query Breakdown</h2>
                        {queryDetails.map((query, index) => (
                            <p key={index}>{index + 1}. {query.detail}</p>
                        ))}
                    </div>
                    )}
            </div>

        </div>

    </div>
  );
}

export default ExplainPage