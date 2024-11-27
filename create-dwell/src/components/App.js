import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminPanel from './AdminPanel';

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