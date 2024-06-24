import React, { useState } from 'react';

const EditWorkoutForm = ({ workout, index, updateWorkout }) => {
  const [bodyPart, setBodyPart] = useState(workout.bodyPart);
  const [date, setDate] = useState(workout.date);
  const [exercises, setExercises] = useState(workout.exercises);

  const handleExerciseChange = (exerciseIndex, field, value) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === exerciseIndex ? { ...exercise, [field]: value } : exercise
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
    updateWorkout(index, { bodyPart, date, exercises });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 text-black">
      <input
        type="text"
        placeholder="Enter your Split or Body Part"
        value={bodyPart}
        onChange={(e) => setBodyPart(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="space-y-2">
          <input
            type="text"
            placeholder={`Exercise ${exerciseIndex + 1}`}
            value={exercise.name}
            onChange={(e) => handleExerciseChange(exerciseIndex, 'name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {exercise.sets.map((set, setIndex) => (
            <div key={setIndex} className="space-y-2">
              <input
                type="number"
                placeholder={`Weight for set ${setIndex + 1}`}
                value={set.weight}
                onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder={`Reps for set ${setIndex + 1}`}
                value={set.reps}
                onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
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
      ))}
      <button
        type="button"
        onClick={handleAddExercise}
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Add Exercise
      </button>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Update Workout
      </button>
    </form>
  );
};

export default EditWorkoutForm;
