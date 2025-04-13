import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

try {
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    document.body.classList.add('safari');
  }
} catch (e) {
  console.error('Error detecting Safari browser:', e);
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/admin-login"
          element={
            <>
              <AdminLogin />
            </>
          }
        />
        <Route
          path="/admin/*"
          element={
            <>
              <AdminPanel />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;