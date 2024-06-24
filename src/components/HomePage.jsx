import React, { useState, useEffect } from 'react';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';
import EditWorkoutForm from './EditWorkoutForm';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts'));
    if (savedWorkouts) {
      setWorkouts(savedWorkouts);
    }
  }, []);

  const addWorkout = (workout) => {
    const updatedWorkouts = [...workouts, workout];
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
  };

  const updateWorkout = (index, updatedWorkout) => {
    const updatedWorkouts = workouts.map((workout, i) =>
      i === index ? updatedWorkout : workout
    );
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    setEditingIndex(null);
  };

  const deleteWorkout = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">RAGA-Workout Tracker</h1>
      {editingIndex !== null ? (
        <EditWorkoutForm 
          workout={workouts[editingIndex]} 
          index={editingIndex} 
          updateWorkout={updateWorkout}
        />
      ) : (
        <WorkoutForm addWorkout={addWorkout} />
      )}
      <WorkoutList workouts={workouts} onEdit={handleEdit} onDelete={deleteWorkout} />
    </div>
  );
}
