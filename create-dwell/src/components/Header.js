import React from 'react';
import './Header.scss';

const Header = () => (
  <nav className="nav">
    <div className="nav__inner">
      <a href="/" className="nav__logo">
        <img src="img/logo.svg" alt="Logo" width="500" />
      </a>
      <ul className="nav__list">
        <li className="nav__item"><a href="#about" className="nav__link">About</a></li>
        <li className="nav__item"><a href="#residential" className="nav__link">Residential</a></li>
        <li className="nav__item"><a href="#commercial" className="nav__link">Commercial</a></li>
        <li className="nav__item"><a href="#cultural" className="nav__link">Cultural</a></li>
        <li className="nav__item"><a href="#contact" className="nav__link">Contact</a></li>
      </ul>
    </div>
  </nav>
);

export default Header;