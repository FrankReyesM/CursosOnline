import { useState } from 'react';
import { mockCourses } from '../data/mockData';

/**
 * Custom hook para guardar datos en la API
 * @returns {Object} - { saveData, loading }
 */

export const useSaveData = () => {
  const [loading, setLoading] = useState(false);

  const saveData = async (url, method, data) => {
    try {
      setLoading(true);
      // Simular demora de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Intentar usar la API real primero, si falla usar almacenamiento local
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) throw new Error('API no disponible');
        return await response.json();
      } catch (apiError) {
        console.log('API no disponible, usando almacenamiento local');
        
        // Simular operaciones CRUD localmente
        const storedData = JSON.parse(localStorage.getItem('courses') || JSON.stringify(mockCourses));
        
        if (method === 'POST') {
          const newId = Math.max(...storedData.map(c => c.id), 0) + 1;
          const newCourse = { ...data, id: newId };
          storedData.push(newCourse);
          localStorage.setItem('courses', JSON.stringify(storedData));
          return newCourse;
        } else if (method === 'PUT') {
          const courseId = parseInt(url.split('/').pop());
          const index = storedData.findIndex(c => c.id === courseId);
          if (index !== -1) {
            storedData[index] = { ...data, id: courseId };
            localStorage.setItem('courses', JSON.stringify(storedData));
            return storedData[index];
          }
        } else if (method === 'DELETE') {
          const courseId = parseInt(url.split('/').pop());
          const filteredData = storedData.filter(c => c.id !== courseId);
          localStorage.setItem('courses', JSON.stringify(filteredData));
          return { success: true };
        }
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { saveData, loading };
};