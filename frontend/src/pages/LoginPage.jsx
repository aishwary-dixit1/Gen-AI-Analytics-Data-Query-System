import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../utils/axios.js";
import { addUser } from "../redux/userSlice.js";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("Test123");

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      navigate("/dashboard");
    } catch (error) {
      console.log("Login Error:", error.message);
      return toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen px-4 py-6 gap-10">
        
        <div className="flex flex-col justify-center items-center text-2xl md:text-3xl font-bold text-white">
            <h2>Gen AI Analytics Data Query System</h2>
        </div>

      
        <fieldset className="w-full max-w-sm md:max-w-md bg-base-200 border border-base-300 p-6 rounded-lg shadow-lg">
            <legend className="text-lg font-semibold mb-2">Login</legend>

            <label className="block text-sm font-medium mb-1">email</label>
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
                onClick={handleLogin}
            >
                Login
            </button>

          
            <div className="flex justify-center mt-4">
                <Link to="/signup" className="text-blue-500 hover:underline text-sm">
                    Don't have an account? Register.
                </Link>
            </div>

        </fieldset>
    </div>
);

};

export default Login;
