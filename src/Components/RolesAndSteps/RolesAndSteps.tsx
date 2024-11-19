import React, { useState } from 'react';
import './RolesAndSteps.css';
import Steps from '../Steps/Steps';
import Contributor from '../Contributor/Contributor';

function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  if(selectedRole=== 'contributor'){
    return (
      <div className='container'>
        <div className="role-selection">
          <h2>Choose a role</h2>
          <div className="role-option" style={{ backgroundColor: 'rgba(255, 0, 0, 0.035)' }}>
            <label htmlFor="contributor">
              <div className="role-icon">
              </div>
              <div className="role-description">
                <h3>Contributors</h3>
                <p>Upload labeled data, earn tokens, and track data usage for transparency and impact.</p>
              </div>
              <a href="/contributor" className="select-role" style={{margin: '20px 0px'}}>Get Started</a>
            </label>
            <input
              type="radio"
              id="contributor"
              name="role"
              value="contributor"
              checked={selectedRole === 'contributor'}
              onChange={() => handleRoleSelect('contributor')}
            />
          </div>
          <div className="role-option">
            <label htmlFor="developer">
              <div className="role-icon">
              </div>
              <div className="role-description">
                <h3>Developers</h3>
                <p>Browse, deploy, and monitor AI models to enhance your applications.</p>
              </div>
            </label>
            <input
              type="radio"
              id="developer"
              name="role"
              value="developer"
              checked={selectedRole === 'developer'}
              onChange={() => handleRoleSelect('developer')}
              
            />
          </div>
          
        </div>
        <Steps/>
      </div>
  
    );
  }
  else{
    return (
      <div className='container'>
        <div className="role-selection">
          <h2>Choose a role</h2>
          <div className="role-option">
            <label htmlFor="contributor">
              <div className="role-icon">
              </div>
              <div className="role-description">
                <h3>Contributors</h3>
                <p>Upload labeled data, earn tokens, and track data usage for transparency and impact.</p>
              </div>
            </label>
            <input
              type="radio"
              id="contributor"
              name="role"
              value="contributor"
              checked={selectedRole === 'contributor'}
              onChange={() => handleRoleSelect('contributor')}
            />
          </div>
          <div className="role-option" style={{ backgroundColor: 'rgba(255, 0, 0, 0.035)' }}>
            <label htmlFor="developer">
              <div className="role-icon">
              </div>
              <div className="role-description">
                <h3>Developers</h3>
                <p>Browse, deploy, and monitor AI models to enhance your applications.</p>
              </div>
              <a href="#" className="select-role"  style={{margin: '20px 0px'}}>Get Started</a>
            </label>
            <input
              type="radio"
              id="developer"
              name="role"
              value="developer"
              checked={selectedRole === 'developer'}
              onChange={() => handleRoleSelect('developer')}
              
            />
          </div>
          
        </div>
        <Steps/>
      </div>
  
    );
  }

  
}

export default RoleSelection;