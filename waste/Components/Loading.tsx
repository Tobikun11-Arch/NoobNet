import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Customize Css/loader.css'

function Loading() {
  const Location = useLocation();
  const { user, ImageValue } = Location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      navigate('/userHome', { state: { user, ImageValue } });
    }, 6000);

    return () => clearTimeout(delay);
  }, [user, ImageValue, navigate]);

  return (

    <div className="honeycomb">
      
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>

  </div>

  );
}

export default Loading;