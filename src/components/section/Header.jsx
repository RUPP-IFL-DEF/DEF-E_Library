import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../theme/header.css';

const API_BASE = 'https://def-e-library-server.onrender.com';

const Header = ({ scrollToSection, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [profile, setProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const sections = ['Home', 'RECORD', 'Contact', 'About'];

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      if (token) fetchProfile(token);
    };
    checkToken();
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProfile = async (token) => {
    try {
      const res = await fetch(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setProfile(data);
    } catch (e) {
      console.warn('Failed loading profile', e);
    }
  };

  const handleClick = (section) => {
    if (section === 'About') navigate('/about');
    else if (section === 'Contact') navigate('/contact');
    else if (section === 'Home') navigate('/');
    else scrollToSection && scrollToSection(section);
    setIsMenuOpen(false);
  };

  const isActive = (item) => {
    if (location.pathname === '/about' && item === 'About') return true;
    if (location.pathname === '/contact' && item === 'Contact') return true;
    if (location.pathname === '/' && activeSection === item) return true;
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProfile(null);
    setIsMenuOpen(false);
    setDropdownOpen(false);
    navigate('/login');
  };

  const displayName = profile?.username || 'User';
  const avatarUrl =
    profile?.profile?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4CAF50&color=fff`;

  return (
    <header className="sticky-header">
      <div className="logo-container">
        <img src="/deff.jpeg" alt="Logo" className="logo" />
      </div>

      <nav className={isMenuOpen ? 'active' : ''}>
        <ul>
          {sections.map((item) => (
            <li key={item}>
              <a
                href={item === 'About' || item === 'Contact' ? `/${item.toLowerCase()}` : `#${item}`}
                className={isActive(item) ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item);
                }}
              >
                {item.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen((o) => !o)}
      >
        ☰
      </div>

      {/* Profile & Auth Buttons Container */}
      <div
        className="profile-auth-container"
        style={{ marginLeft: 'auto', position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}
        ref={dropdownRef}
      >
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate('/login')} className="login-btn">
              Sign In
            </button>
            <button onClick={() => navigate('/signup')} className="signup-btn">
              Sign Up
            </button>
          </>
        ) : (
          <>
            <div
              className="profile-summary"
              onClick={() => setDropdownOpen((o) => !o)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <img
                src={avatarUrl}
                alt="avatar"
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="profile-name">{displayName}</div>
            </div>

            {dropdownOpen && (
              <div className="profile-dropdown">
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/profile');
                  }}
                >
                  Profile
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
