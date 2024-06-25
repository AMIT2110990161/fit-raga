import React from 'react';

const WorkoutCard = ({ workout, editWorkout, deleteWorkout }) => (
  <div className="p-4 bg-slate-950 border border-solid border-blue-400 rounded-lg mb-4">
    <h3 className="font-bold flex gap-2">
      {workout.bodyPart}
      <p>({new Date(workout.date).toLocaleDateString()})</p>
    </h3> <br />
    {workout.exercises.map((exercise, exerciseIndex) => (
      <div key={exerciseIndex} className="mb-4">
        <h4 className="font-semibold">{exercise.name}</h4>
        {exercise.sets.map((set, setIndex) => (
          <p key={setIndex}>
            Set {setIndex + 1}: Weight: {set.weight} kg, Reps: {set.reps}
          </p>
        ))}
      </div>
    ))}
    <div className='flex gap-4'>
      <button
        onClick={() => editWorkout(workout)}
        className="w-full p-2 bg-yellow-500 text-white rounded"
      >
        Edit Workout
      </button>
      <button
        onClick={() => deleteWorkout(workout.date)}
        className="w-full p-2 bg-red-500 text-white rounded"
      >
        Delete Workout
      </button>
    </div>
  </div>
);

export default WorkoutCard;
