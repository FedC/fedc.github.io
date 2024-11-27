import React, { useEffect } from 'react';
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
              <DynamicCssLoader cssPath="/home.css" />
              <Home />
            </>
          }
        />
        <Route
          path="/admin/*"
          element={
            <>
              <DynamicCssLoader cssPath="/admin.css" />
              <AdminPanel />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

const DynamicCssLoader = ({ cssPath }) => {
  useEffect(() => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = cssPath;
    document.head.appendChild(css);

    return () => {
      document.head.removeChild(css);
    };
  }, [cssPath]);

  return null;
};

export default App;