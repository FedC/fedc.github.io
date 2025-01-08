import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../js/firebase';
import logo from '../img/logo.svg';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/admin-login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const isActive = (match, location) => {
    if (!match) {
      return false;
    }
    if (location.pathname.includes('edit-project') && match === '/admin') {
      return true;
    }
    return match === location.pathname;
  }

  return (
    <header className="header">
      <img src={logo} alt="Logo" width="250" id="logo" />
      <nav className="header-nav">
        <ul>
          <li>
            <NavLink to="/admin" className={() => (isActive('/admin', window.location) ? 'active' : '')}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/about" className={() => (isActive('/admin/about', window.location) ? 'active' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/featured" className={() => (isActive('/admin/featured', window.location) ? 'active' : '')}>
              Featured
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={() => (isActive('/admin/users', window.location) ? 'active' : '')}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/analytics" className={() => (isActive('/admin/analytics', window.location) ? 'active' : '')}>
              Analytics
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="actions">
        <button id="logoutBtn" className="warn-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;