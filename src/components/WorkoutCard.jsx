import React from 'react';

const WorkoutCard = ({ workout }) => (
  <div className="p-4 border border-gray-300 rounded mb-4">
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
  </div>
);

export default WorkoutCard;
