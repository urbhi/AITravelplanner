import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Createtrip from './create-trip/index.jsx';
import Header from './components/coustom/Header.jsx';
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';
import Footer from './components/coustom/Footer.jsx';
import MYTrips from './My_trips/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <Createtrip />
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip />
  },
  {
    path: '/my-trips',
    element: <MYTrips />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <div
          style={{
            flex: 1,
          }}
        >
          <Toaster />
          <RouterProvider router={router} />
        </div>
        <Footer 
          style={{
            borderTop: '1px solid #ccc',
            padding: '1em',
            backgroundColor: '#f8f8f8',
            textAlign: 'center',
          }}
        />
      </div>
    </GoogleOAuthProvider>
  </StrictMode>
);
