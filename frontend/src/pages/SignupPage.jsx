import React from 'react'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../utils/axios.js";
import { addUser } from '../redux/userSlice.js';
import toast from 'react-hot-toast';

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignup = async () => {
        try {
            const res = await axiosInstance.post("/api/auth/signup", { name, email, password }, { withCredentials: true });
    
            dispatch(addUser(res.data.data));
            console.log("data : ", res.data);
    
            navigate("/login");
        } catch (error) {
          toast.error("Oops, Something went wrong");
          console.log("error : ", error.message);
        }
    };
    

    return (
        <div className="flex flex-col md:flex-row justify-center items-start min-h-screen px-4 py-2 -my-10 gap-10">

            <div className="flex flex-col justify-center items-center text-2xl md:text-3xl font-bold text-white">
            <h2>Gen AI Analytics Data Query System</h2>
            </div>
    
            <fieldset className="w-full max-w-sm md:max-w-md bg-base-200 border border-base-300 p-6 rounded-lg shadow-lg">
                <legend className="text-lg font-semibold mb-2">Signup</legend>
                
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                    type="text" 
                    className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Name" 
                    onChange={(e) => setName(e.target.value)} 
                />

                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                    type="text" 
                    className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                
                <label className="block text-sm font-medium mt-3 mb-1">Password</label>
                <input 
                    type="password" 
                    className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                
                <button 
                    className="btn w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 mt-4 rounded-md transition duration-300"
                    onClick={handleSignup}
                >
                    Register
                </button>
    
                <div className="flex justify-center mt-4">
                    <Link to="/login" className="text-blue-500 hover:underline text-sm">
                        Already have an account? Login.
                    </Link>
                </div>
            </fieldset>
        </div>
    );   
}

export default SignupPage;