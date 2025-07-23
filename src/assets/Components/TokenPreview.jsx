import React from "react";

// If TokenPreview.jsx is in src/assets/Components/
// And images are in src/assets/images/
import red from "../images/red-token.svg";
import blue from "../images/blue-token.svg";
import green from "../images/green-token.svg";
import yellow from "../images/yellow-token.svg";

function TokenPreview() {
  return (
    <div>
      <div>
        <h3>Red Token</h3>
        <img src={red} alt="Red Token" />
      </div>
      <div>
        <h3>Blue Token</h3>
        <img src={blue} alt="Blue Token" />
      </div>
      <div>
        <h3>Green Token</h3>
        <img src={green} alt="Green Token" />
      </div>
      <div>
        <h3>Yellow Token</h3>
        <img src={yellow} alt="Yellow Token" />
      </div>
    </div>
  );
}

export default TokenPreview;
