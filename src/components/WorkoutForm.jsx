import React, { useState, useEffect } from 'react';

const WorkoutForm = ({ addWorkout, updateWorkout, workoutToEdit }) => {
  const [bodyPart, setBodyPart] = useState('');
  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: [{ weight: '', reps: '' }] }]);

  useEffect(() => {
    if (workoutToEdit) {
      setBodyPart(workoutToEdit.bodyPart);
      setDate(workoutToEdit.date);
      setExercises(workoutToEdit.exercises);
    }
  }, [workoutToEdit]);

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updatedExercises);
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === exerciseIndex) {
        const updatedSets = exercise.sets.map((set, j) =>
          j === setIndex ? { ...set, [field]: value } : set
        );
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: [{ weight: '', reps: '' }] }]);
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const handleAddSet = (exerciseIndex) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === exerciseIndex) {
        return { ...exercise, sets: [...exercise.sets, { weight: '', reps: '' }] };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const handleRemoveSet = (exerciseIndex, setIndex) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === exerciseIndex) {
        const updatedSets = exercise.sets.filter((_, j) => j !== setIndex);
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = { bodyPart, date, exercises };
    if (workoutToEdit) {
      updateWorkout(workout);
    } else {
      addWorkout(workout);
    }
    setBodyPart('');
    setDate('');
    setExercises([{ name: '', sets: [{ weight: '', reps: '' }] }]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-slate-950 border border-solid border-blue-400 rounded-lg mb-10">
      <input
        type="text"
        placeholder="Enter your Split or Body Part"
        value={bodyPart}
        onChange={(e) => setBodyPart(e.target.value)}
        className="w-full p-2 bg-slate-950 border border-solid border-blue-400 rounded-lg"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border border-solid border-blue-400 rounded-lg text-black"
      />
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="space-y-2">
          <input
            type="text"
            placeholder={`Exercise ${exerciseIndex + 1}`}
            value={exercise.name}
            onChange={(e) => handleExerciseChange(exerciseIndex, 'name', e.target.value)}
            className="w-full p-2 bg-slate-950 border border-solid border-blue-400 rounded-lg"
          />
          {exercise.sets.map((set, setIndex) => (
            <div key={setIndex} className="space-y-2">
              <input
                type="number"
                placeholder={`Weight for set ${setIndex + 1}`}
                value={set.weight}
                onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                className="w-full p-2 bg-slate-950 border border-solid border-blue-400 rounded-lg"
              />
              <input
                type="number"
                placeholder={`Reps for set ${setIndex + 1}`}
                value={set.reps}
                onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                className="w-full p-2 bg-slate-950 border border-solid border-blue-400 rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                className="w-full p-2 bg-red-500 text-white rounded"
              >
                Remove Set
              </button>
            </div>
          ))}
          <div className='flex gap-5'>
            <button
              type="button"
              onClick={() => handleAddSet(exerciseIndex)}
              className="w-full p-2 bg-green-500 text-white rounded"
            >
              Add Set
            </button>
            <button
              type="button"
              onClick={() => handleRemoveExercise(exerciseIndex)}
              className="w-full p-2 bg-red-500 text-white rounded"
            >
              Remove Exercise
            </button>
          </div>
        </div>
      ))}
      <div className='flex gap-5'>
        <button
          type="button"
          onClick={handleAddExercise}
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Add Exercise
        </button>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {workoutToEdit ? 'Update Workout' : 'Add Workout'}
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;
