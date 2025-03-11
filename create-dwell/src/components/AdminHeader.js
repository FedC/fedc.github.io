import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../js/firebase';
import logo from '../img/logo.svg';

import * as styles from './AdminHeader.module.scss';

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
    <header className={styles.header}>
      <img src={logo} alt="Logo" width="250" id="logo" />
      <nav className={styles.headerNav}>
        <ul>
          <li>
            <NavLink to="/admin" className={() => (isActive('/admin', window.location) ? styles.active : '')}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/about" className={() => (isActive('/admin/about', window.location) ? styles.active : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/featured" className={() => (isActive('/admin/featured', window.location) ? styles.active : '')}>
              Featured
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={() => (isActive('/admin/users', window.location) ? styles.active : '')}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/analytics" className={() => (isActive('/admin/analytics', window.location) ? styles.active : '')}>
              Analytics
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.actions}>
        <button id="logoutBtn" className="warn-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;