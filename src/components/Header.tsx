import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGlobe, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  
  // Create proper links based on current page
  const getLink = (section) => {
    return isHomePage ? `#${section}` : `/#${section}`;
  };
  
  return (
    <header className="header">
      <div className="header-wrapper">
        {/* Logo */}
        <div className="logo">
          <span className="logo-highlight">AMR </span> <span>TECH SOLUTION</span>
        </div>
        
        {/* Navigation */}
        <nav className="nav">
          <Link to="/">الرئيسية</Link>
          <a href={getLink('services')}>خدماتنا</a>
          <a href={getLink('about')}>من نحن</a>
          <a href={getLink('areas')}>مجالاتنا</a>
          <a href={getLink('testimonials')}>آراء العملاء</a>
          <Link to="/documents">المنصة</Link>
          <div className="dropdown">
            <button className="lang-button">
              <FaGlobe className="ml-1" /> <span>اللغة</span>
            </button>
            <div className="dropdown-content">
              <a href="#" data-lang="ar">العربية <img src="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/sa.svg" alt="Arabic" /></a>
              <a href="#" data-lang="fr">Français <img src="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/fr.svg" alt="French" /></a>
              <a href="#" data-lang="en">English <img src="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/gb.svg" alt="English" /></a>
            </div>
          </div>
        </nav>
        
        {/* Auth Buttons */}
        <div className="auth-buttons">
  <Link to="/login" className="btn-outline">تسجيل الدخول</Link>
  <Link to="/signup" className="btn-filled">إنشاء حساب</Link>
</div>

        
        {/* Mobile menu icon */}
        <div className="mobile-menu" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>
      
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <Link to="/" onClick={toggleMobileMenu}>الرئيسية</Link>
          <a href={getLink('services')} onClick={toggleMobileMenu}>خدماتنا</a>
          <a href={getLink('about')} onClick={toggleMobileMenu}>من نحن</a>
          <a href={getLink('areas')} onClick={toggleMobileMenu}>مجالاتنا</a>
          <a href={getLink('testimonials')} onClick={toggleMobileMenu}>آراء العملاء</a>
          <Link to="/documents" onClick={toggleMobileMenu}>المنصة</Link>
          <div className="mobile-auth">
  <Link to="/login" className="btn-outline" onClick={toggleMobileMenu}>تسجيل الدخول</Link>
  <Link to="/signup" className="btn-filled" onClick={toggleMobileMenu}>إنشاء حساب</Link>
</div>


        </div>
      )}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={toggleMobileMenu} />}
    </header>
  );
};

export default Header;