import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useSelector } from 'react-redux';


const Body = () => {
  const navigate = useNavigate();
  const userId = useSelector((store) => store.user);

  const fetchUser = async () => {
      if(userId) return;
      else navigate("/login");
  }
  useEffect(() => {
      fetchUser();
  }, []);
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  );
}

export default Body