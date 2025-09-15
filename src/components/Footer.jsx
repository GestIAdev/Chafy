import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h2 className="footer-title">BAR CHAFI</h2>
          <p className="footer-tel">Teléfono: +54 9 261 5432-5412</p>
          <p className="footer-mail">Mail: barchafi@gmail.com</p>
          <p className="footer-direccion">Aristides Villanueva al 500, Ciudad de Mendoza</p>
        </div>
        <div className="footer-redes">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram size={28} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook size={28} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Bar Chafi | Todos los derechos reservados
      </div>
    </footer>
  );
}
