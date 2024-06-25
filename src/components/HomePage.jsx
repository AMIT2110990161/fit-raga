import React, { useState, useEffect } from 'react';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts'));
    if (savedWorkouts) {
      setWorkouts(savedWorkouts);
    }
  }, []);

  const addWorkout = (workout) => {
    const updatedWorkouts = [workout, ...workouts];
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    setShowForm(false);
  };

  const updateWorkout = (updatedWorkout) => {
    const updatedWorkouts = workouts.map((workout) =>
      workout.date === updatedWorkout.date ? updatedWorkout : workout
    );
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    setWorkoutToEdit(null);
    setShowForm(false);
  };

  const deleteWorkout = (date) => {
    const updatedWorkouts = workouts.filter((workout) => workout.date !== date);
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
  };

  const editWorkout = (workout) => {
    setWorkoutToEdit(workout);
    setShowForm(true);
  };

  return (
    <div className="max-w-xlg mx-auto mt-10">
      <h1 className='font-semibold text-4xl sm:text-2.5xl md:text-4xl lg:text-5xl mb-10'>RAGA<span className='text-blue-400'>-Workout Tracker</span></h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full p-2 bg-blue-500 text-white rounded mb-4"
      >
        {showForm ? 'Hide Form' : 'Add New Workout'}
      </button>
      {showForm && (
        <WorkoutForm
          addWorkout={addWorkout}
          updateWorkout={updateWorkout}
          workoutToEdit={workoutToEdit}
        />
      )}
      <WorkoutList
        workouts={workouts}
        editWorkout={editWorkout}
        deleteWorkout={deleteWorkout}
      />
    </div>
  );
}
