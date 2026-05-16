import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiInfo, FiMenu, FiX } from "react-icons/fi";
import { TbCalculator } from "react-icons/tb";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
        />
      )}

      <aside className={isOpen ? "sidebar open" : "sidebar"}>
        <div>
          <div className="logo">
            <img
              src="/logo2.png"
              alt="Numy Academy"
              className="logo-image"
            />
          
            <div>
              <h2>Numy</h2>
              <h2>Academy</h2>
            </div>
          </div>

          <nav className="sidebar-nav">
            <NavLink className="nav-item" to="/" end onClick={closeMenu}>
              <FiHome />
              <span>Home</span>
            </NavLink>

            <NavLink className="nav-item" to="/calculator" onClick={closeMenu}>
              <TbCalculator />
              <span>Calculator</span>
            </NavLink>

            <NavLink className="nav-item" to="/about" onClick={closeMenu}>
              <FiInfo />
              <span>About Us</span>
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;