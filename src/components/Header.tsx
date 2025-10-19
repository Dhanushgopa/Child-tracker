import { Activity, Apple, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="navbar-title">Child Health Analytics</h1>
            <p className="navbar-subtitle">WHO Growth Standards Platform</p>
          </div>
        </Link>
        
        <nav className="navbar-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <Activity className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link 
            to="/food-log" 
            className={`nav-link ${isActive('/food-log') ? 'active' : ''}`}
          >
            <Apple className="w-4 h-4" />
            <span>Food Log</span>
          </Link>
          <Link 
            to="/history" 
            className={`nav-link ${isActive('/history') ? 'active' : ''}`}
          >
            <FileText className="w-4 h-4" />
            <span>History</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;