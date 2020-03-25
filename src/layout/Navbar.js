/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark rounded-bottom mb-4">
    <Link to = "/" className="navbar-brand text-decoration-none text-secondary">{props.title}</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item mx-3 active">
      <Link to = "/" className="text-decoration-none text-secondary">Home</Link>
      </li>
      <li className="nav-item mx-3">
      <Link to = "/add" className="text-decoration-none text-secondary">Add User</Link>
      </li>
      <li className="nav-item mx-3">
      <Link to = "/github" className="text-decoration-none text-secondary">Project Files</Link>
      </li>
    </ul>
  </div>
</nav>
  );
};

//Burada proptype tanımladık yani gelecek prop verisisnin ne ayak olacağını baştan belirliyoruz, isrequired ise bunun zorunlu gönderilmesi gerek demek.
Navbar.proptype = {
  title: PropTypes.string.isRequired,
};
//Aynı zamanda varsayılan değer de verebiliyoruz böylece veri gelmezse o gösteriliyor.
Navbar.defaultProps = {
  title: 'Default App',
};
export default Navbar;