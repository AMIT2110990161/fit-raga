import { useState } from 'react';
import Hero from './components/Hero';
import Generator from './components/Generator';
import Workout from './components/Workout';
import { generateWorkout } from './utils/functions';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './components/HomePage';

function App() {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState('individual');
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState('strength_power');

  function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscles, goal });
    setWorkout(newWorkout);

    window.location.href = '#workout';
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Hero />,
    },
    {
      path: "/Generator",
      element: (
        <Generator
          poison={poison}
          setPoison={setPoison}
          muscles={muscles}
          setMuscles={setMuscles}
          goal={goal}
          setGoal={setGoal}
          updateWorkout={updateWorkout}
        />
      ),
    },

    {
      path: "/Workout",
      element: <Workout workout={workout} />,
    },

    {
      path: "/HomePage",
      element: <HomePage />,
    },
  ]);

  return (
    <>
      <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
