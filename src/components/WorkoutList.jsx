import React from 'react';
import WorkoutCard from './WorkoutCard';

const WorkoutList = ({ workouts, onEdit, onDelete }) => (
  <div>
    {workouts.map((workout, index) => (
      <div key={index} className="mb-4">
        <WorkoutCard workout={workout} />
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(index)}
            className="flex-1 p-2 bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(index)}
            className="flex-1 p-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default WorkoutList;
