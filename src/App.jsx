import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Renderiza la página actual
  switch (currentPage) {
    case 'welcome':
      return <WelcomePage onNavigate={handleNavigate} />;
    case 'dashboard':
      return <Dashboard />;
    default:
      return <WelcomePage onNavigate={handleNavigate} />;
  }
};

export default App;