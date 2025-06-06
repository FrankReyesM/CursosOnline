import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { BUTTON_SIZES } from '../utils/constants';

// Esto es la Ppgina de bienvenida de la aplicación

const WelcomePage = ({ onNavigate }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onNavigate('dashboard');
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-500 to-blue-300 flex items-center justify-center p-4">
      <Card className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ¡Buen dia profe!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Esta es mi app de gestion de cursos :D
          </p>
          <div className="text-6xl mb-4">📚</div>
          <p className="text-sm text-gray-500 mb-4">
            Redirigiéndote en {countdown} segundos...
          </p>
        </div>
        <Button 
          onClick={() => onNavigate('dashboard')} 
          size={BUTTON_SIZES.LG} 
          className="w-full"
        >
          Ir al Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default WelcomePage;