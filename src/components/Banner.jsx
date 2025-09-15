import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => (
  <div
    className="banner-bg"
    style={{
      backgroundImage: `url(/images/banner2.jpg)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '400px',
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <div className="banner-content">
      <h1>Venís por la comida,<br />te quedás por la vibra.</h1>
      <Link to="/menu" className="banner-btn">Ver menú</Link>
    </div>
  </div>
);

export default Banner;
