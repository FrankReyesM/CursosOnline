import React, { useState } from 'react';
import Button from '../Button';
import { BUTTON_VARIANTS } from '../../utils/constants'

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    curso: course?.curso || '',
    tematica: course?.tematica || '',
    instructor: course?.instructor || '',
    descripcion: course?.descripcion || ''
  });
  const [errors, setErrors] = useState({});

// Validaciones de los campos del formulario
  const validateForm = () => {
    const newErrors = {};
    if (!formData.curso.trim()) newErrors.curso = 'El nombre del curso es requerido';
    if (!formData.tematica.trim()) newErrors.tematica = 'La temática es requerida';
    if (!formData.instructor.trim()) newErrors.instructor = 'El nombre del instructor es requerido';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   //Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };


   //Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Curso
        </label>
        <input
          type="text"
          name="curso"
          value={formData.curso}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.curso ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ingresa el nombre del curso"
        />
        {errors.curso && <p className="text-red-500 text-sm mt-1">{errors.curso}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Temática
        </label>
        <input
          type="text"
          name="tematica"
          value={formData.tematica}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.tematica ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ingresa la temática del curso"
        />
        {errors.tematica && <p className="text-red-500 text-sm mt-1">{errors.tematica}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instructor
        </label>
        <input
          type="text"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.instructor ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ingresa el nombre del instructor"
        />
        {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="4"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            errors.descripcion ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ingresa una descripción del curso"
        />
        {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={handleSubmit} className="flex-1">
          {course ? 'Actualizar Curso' : 'Crear Curso'}
        </Button>
        <Button variant={BUTTON_VARIANTS.SECONDARY} onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default CourseForm;