import { Link, NavLink } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Main } from './components/Main';
import cerebrleLogo from './cerebrle_logo.svg';

function App() {
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/">
            <img src={cerebrleLogo} alt="Cerebrle" />
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            <NavLink to="/" end><DashboardOutlinedIcon /> Games</NavLink>
            <NavLink to="/stats"><BarChartOutlinedIcon /> Stats</NavLink>
            <NavLink to="/info"><HelpOutlineIcon /> Help</NavLink>
          </nav>
        </div>
      </header>
      <main className="site-main">
        <Main />
      </main>
      <footer className="site-footer">
        <a className="nn-cmp-show" href="#">Manage Cookie Settings</a>
      </footer>
    </>
  );
}

export default App;
