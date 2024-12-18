import React, { lazy, Suspense, useEffect, useState } from 'react';
import {Provider} from 'react-redux';
import { createBrowserRouter, Outlet } from 'react-router';
import appStore from './utils/appStore';
import UserContext from './utils/UserContext';

import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Resmenu from './components/Resmenu';
import Cart from './components/Cart';

// Chunking
// Code Splitting
// lazy loading
// on demand loading
// Dynamic imprt
const Grocery = lazy(() => import('./components/Grocery'));


const App = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const dummy = {
      name: 'Abhi',
    }

    setUserName(dummy.name);
  }, []);

  return (
    <Provider store={appStore}>
    <UserContext.Provider value={{loggedUser : userName, setUserName}}>
      <Header />
      <Outlet />
    </UserContext.Provider>
    </Provider>
  )
}

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: '/restaurants/:resId',
        element: <Resmenu />
      },
      {
        path: '/cart',
        element: <Cart />
      },
    ],
    errorElement: <Error />
  },

])