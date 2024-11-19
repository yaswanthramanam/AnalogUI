import React from "react";

const Steps: React.FC = () => {
    return(
        <div className='roles'>
        <div className='childRole'>
          <p style={{color: "red"}}>
            Step 1
          </p>
          <h2>
          Upload Data
          </h2>
        </div>
        <div className='childRole'>
          <p style={{color: "red"}}>
          Step 2
          </p>
          <h2>Earn Tokens</h2>
        </div>
        <div className='childRole'>
          <p style={{color: "red"}}>
          Step 3
          </p>
          <h2>Track Data Usage</h2>
        </div>

      </div>
    );
};

export default Steps;