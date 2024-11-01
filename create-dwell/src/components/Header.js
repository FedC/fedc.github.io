import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../js/firebase';
import logo from '../img/logo.svg';

const Header = () => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = "/admin-login";
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" width="250" id="logo" />
      <nav className="header-nav">
        <ul>
          <li><a href="#projects" className="active">Projects</a></li>
          <li><a href="#users">Users</a></li>
          <li><a href="#analytics">Analytics</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </nav>
      <div className="actions">
        <button id="logoutBtn" className="warn-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
