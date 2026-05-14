import { NavLink } from "react-router-dom";
import { FiHome, FiInfo } from "react-icons/fi";
import { TbCalculator } from "react-icons/tb";

// type SidebarProps = {
//   currency: string;
//   onCurrencyChange: (currency: string) => void;
// };
// { currency, onCurrencyChange }: SidebarProps
function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          <div className="logo-icon">logo</div>
          <div>
            <h2>Finance</h2>
            <h2>Calculator</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink className="nav-item" to="/" end >
            <FiHome />
            <span>Home</span>
          </NavLink>

          <NavLink className="nav-item " to="/calculator">
            <TbCalculator />
            <span>Calculator</span>
          </NavLink>

          <NavLink className="nav-item" to="/about">
            <FiInfo />
            <span>About Us</span>
          </NavLink>
        </nav>
      </div>

      {/* <div className="sidebar-bottom">
        <div className="currency-box">
          <label>Currency</label>
          <select
            value={currency}
            onChange={(event) => onCurrencyChange(event.target.value)}
          >
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
            <option value="PLN">PLN (zł)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div> */}

        {/* <div className="theme-toggle">
          <button>☀️</button>
          <button>🌙</button>
        </div> */}
      {/* </div> */}
    </aside>
  );
}

export default Sidebar;