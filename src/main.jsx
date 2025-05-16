import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Loading from './components/Loading.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // make sure you're using 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx';
import AddCoffee from './components/AddCoffee.jsx'
import CoffeeDetails from './components/CoffeeDetails.jsx'
import UpdateCoffee from './components/UpdateCoffee.jsx'

// ✅ Router setup
const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: MainLayout,
      children: [
        {
          index: true,
          loader: () => fetch('http://localhost:3000/coffees'),
          Component: Home
        },
        {
          path: 'addCoffee',
          Component: AddCoffee
        },
        {
          path: 'coffee/:id',
          Component: CoffeeDetails
        },
        {
          path: 'updateCoffee/:id',
          loader: ({ params }) => fetch(`http://localhost:3000/coffees/${params.id}`),
          Component: UpdateCoffee
        }
      ]
    },
    {
      path: '*',
      element: <div>404 - Page Not Found</div>
    }
  ],
  {
    hydrateFallbackElement: <Loading /> // ✅ Correct usage inside 2nd argument
  }
);

// ✅ Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
