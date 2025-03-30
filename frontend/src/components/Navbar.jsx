import React from 'react';
import { useDispatch ,useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../redux/userSlice.js';
import { axiosInstance } from "../utils/axios.js";
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
        await axiosInstance.post("api/auth/logout", {}, { withCredentials: true });

        dispatch(removeUser());
        navigate("/login");

    } catch (error) {
        toast.error("Oops, Something went wrong");
        console.log("ERROR : ", error.message);
    }
  }
  return (
    <>
    <div className="navbar bg-base-300 shadow-sm">

        <div className="flex-1">
        <h1 className="text-primary mx-5">Data Query System</h1>
        </div>

        { user && (
        <div className="flex gap-1 mx-5">
            <button className="btn btn-outline btn-error" onClick={handleLogout}>Logout</button>
        </div> )}

    </div>
    </>
  );
}

export default Navbar