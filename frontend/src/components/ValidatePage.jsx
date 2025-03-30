import React from 'react';
import { axiosInstance } from '../utils/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ValidatePage = () => {
    const [sqlQuery, setSqlQuery] = useState("");
    const [queryValidate, setQueryValidate] = useState(null);
  
    const handleQuery = async () => {
        try {
            const res = await axiosInstance.post("/api/validate", { sqlQuery : sqlQuery }, {withCredentials: true});
      
            const queryDetails = res.data.valid;

            setQueryValidate(queryDetails);
      
        } catch (error) {
            toast.error("Oops, Something went wrong");
            console.error("Error:", error.response?.data || error.message);
        }
    }
  
    return (
        <div className="flex flex-col gap-3 justify-center items-center m-2">

            <textarea type="text" value={sqlQuery} placeholder="Enter your query" className="textarea textarea-primary" onChange={(e) => setSqlQuery(e.target.value)}></textarea>

            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleQuery}>Validate Query</button>
            </div>

            <div className="flex justify-center card card-dash bg-base-100 w-[85%]">

                <div className="flex justify-center my-5">
                    {
                       queryValidate && (queryValidate ? <p className="text-green-500 text-xl">Valid Query</p> : <p className="text-red-500 text-xl">Invalid Query</p>)
                    }
                </div>

            </div>
        </div>
);
}

export default ValidatePage