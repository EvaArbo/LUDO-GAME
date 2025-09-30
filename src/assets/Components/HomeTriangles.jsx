import React from "react";
import "../styles/homeTriangles.css";

const HomeTriangles = () => {
  return (
    <div className="home-triangle-wrapper">
      <div className="home-triangle home-red"></div>
      <div className="home-triangle home-green"></div>
      <div className="home-triangle home-yellow"></div>
      <div className="home-triangle home-blue"></div>
      <div className="home-center-diamond" />
    </div>
  );
};

export default HomeTriangles;
