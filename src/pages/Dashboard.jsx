import React, { useState } from 'react';
import Title from '../components/Titulos';
import Button from '../components/Button';
import Card from '../components/Card';
import Message from '../components/Message';
import CourseForm from '../components/Forms/CourseForm';
import { useFetchData } from '../hooks/useFetchData';
import { useSaveData } from '../hooks/useSaveData';
import { API_BASE_URL, MESSAGE_TYPES, BUTTON_VARIANTS, BUTTON_SIZES } from '../utils/constants';


 //Dashboard principal para la gestión de cursos

const Dashboard = () => {
  const { data: courses, loading, error, refetch } = useFetchData(API_BASE_URL);
  const { saveData, loading: saving } = useSaveData();
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [message, setMessage] = useState(null);

//esto es un mensaje temporal
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  //maneja la logica pa crear un nuev curso
  const handleCreateCourse = async (courseData) => {
    try {
      await saveData(API_BASE_URL, 'POST', courseData);
      showMessage(MESSAGE_TYPES.SUCCESS, 'Curso creado exitosamente');
      setShowForm(false);
      refetch();
    } catch (err) {
      showMessage(MESSAGE_TYPES.ERROR, 'Error al crear el curso');
    }
  };

  //actualiza el curso
  const handleUpdateCourse = async (courseData) => {
    try {
      await saveData(`${API_BASE_URL}/${editingCourse.id}`, 'PUT', courseData);
      showMessage(MESSAGE_TYPES.SUCCESS, 'Curso actualizado exitosamente');
      setEditingCourse(null);
      setShowForm(false);
      refetch();
    } catch (err) {
      showMessage(MESSAGE_TYPES.ERROR, 'Error al actualizar el curso');
    }
  };

  //lo elimina
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      try {
        await saveData(`${API_BASE_URL}/${courseId}`, 'DELETE');
        showMessage(MESSAGE_TYPES.SUCCESS, 'Curso eliminado exitosamente');
        refetch();
      } catch (err) {
        showMessage(MESSAGE_TYPES.ERROR, 'Error al eliminar el curso');
      }
    }
  };

  //basicamente, inicia la edicion del curso
  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  //cancela la edicion del curso
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando cursos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={refetch}>Reintentar</Button>
        </Card>
      </div>
    );
  }

  // Renderizado principal
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Title>Gestión de Cursos Online</Title>
          {message && (
            <Message type={message.type} onClose={() => setMessage(null)}>
              {message.text}
            </Message>
          )}
        </div>

        {showForm ? (
          <Card className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingCourse ? 'Editar Curso' : 'Crear Nuevo Curso'}
            </h2>
            <CourseForm
              course={editingCourse}
              onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}
              onCancel={handleCancelForm}
            />
          </Card>
        ) : (
          <div className="mb-6">
            <Button onClick={() => setShowForm(true)} disabled={saving}>
              + Agregar Nuevo Curso
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.curso}
                </h3>
                <p className="text-sm text-blue-600 font-medium mb-2">
                  {course.tematica}
                </p>
                <p className="text-gray-600 font-medium mb-3">
                  Instructor: {course.instructor}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {course.descripcion}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size={BUTTON_SIZES.SM}
                  variant={BUTTON_VARIANTS.SECONDARY}
                  onClick={() => handleEdit(course)}
                  className="flex-1"
                  disabled={saving}
                >
                  Editar
                </Button>
                <Button
                  size={BUTTON_SIZES.SM}
                  variant={BUTTON_VARIANTS.DANGER}
                  onClick={() => handleDeleteCourse(course.id)}
                  className="flex-1"
                  disabled={saving}
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay cursos registrados
            </h3>
            <p className="text-gray-500 mb-4">
              Comienza agregando tu primer curso
            </p>
            <Button onClick={() => setShowForm(true)}>
              Crear Primer Curso
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;