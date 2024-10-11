// src/pages/HomeRedirect.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to /login when this component is rendered
    navigate('/login');
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default HomeRedirect;
