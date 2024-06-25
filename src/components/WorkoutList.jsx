import React from 'react';
import WorkoutCard from './WorkoutCard';

const WorkoutList = ({ workouts, editWorkout, deleteWorkout }) => (
  <div>
    {workouts.map((workout, index) => (
      <div key={index} className="mb-4">
        <WorkoutCard
          workout={workout}
          editWorkout={editWorkout}
          deleteWorkout={deleteWorkout}
        />
      </div>
    ))}
  </div>
);

export default WorkoutList;
