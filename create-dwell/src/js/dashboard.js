import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AdminPanel from '../components/AdminPanel';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
     <BrowserRouter>
        <AdminPanel />
    </BrowserRouter>
  </React.StrictMode>
);
