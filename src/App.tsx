import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import TeamsList from './features/teams/TeamsList';
import TeamDetails from './features/teams/TeamDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TeamsList />,
  },
  {
    path: '/:id',
    element: <TeamDetails />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
