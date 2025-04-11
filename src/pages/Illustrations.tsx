import React from 'react';
import { useNavigate } from 'react-router-dom';

const Illustrations: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to Our App</h1>
      <p>Experience seamless authentication with OTPless</p>
      <button 
        className="button"
        onClick={() => navigate('/enter-mobile')}
      >
        Get Started
      </button>
    </div>
  );
};

export default Illustrations;
