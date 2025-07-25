import React from "react";
import red from "../images/red-token.svg";
import blue from "../images/blue-token.svg";
import green from "../images/green-token.svg";
import yellow from "../images/yellow-token.svg";

function TokenPreview() {
  return (
    <div className="token-preview">
      <div><h3>Red</h3><img src={red} alt="Red Token" /></div>
      <div><h3>Green</h3><img src={green} alt="Green Token" /></div>
      <div><h3>Yellow</h3><img src={yellow} alt="Yellow Token" /></div>
      <div><h3>Blue</h3><img src={blue} alt="Blue Token" /></div>
    </div>
  );
}

export default TokenPreview;
