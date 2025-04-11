import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens or state here
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Welcome Home</h1>
      <p>You have successfully authenticated using OTPless!</p>
      <button 
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
