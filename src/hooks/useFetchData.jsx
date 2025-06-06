import { useState, useEffect } from 'react';
import { mockCourses } from '../data/mockData';

/**
 * Custom hook para obtener datos de la API
 * @param {string} url - URL de la API
 * @returns {Object} - { data, loading, error, refetch }
 */

export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Simular demora de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Intentar usar la API real primero, si falla usar datos mock
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API no disponible');
        const result = await response.json();
        setData(result);
      } catch (apiError) {
        console.log('API no disponible, usando datos de demostración');
        // Usar datos de demostración almacenados localmente
        const storedData = JSON.parse(localStorage.getItem('courses') || JSON.stringify(mockCourses));
        setData(storedData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};