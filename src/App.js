import styled, { css } from 'styled-components';
import { Main } from './components/Main';
import cerebrleLogo from './cerebrle_logo.svg';
import { Link } from 'react-router-dom';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HomeIcon from '@mui/icons-material/Home';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 3rem;
  pointer-events: none;
  margin-top: 1rem;
`;

const IconStyle = css`
  color: #FC8B9D;
  margin-top: 10px;
`;

const Home = styled(HomeIcon)`
  ${IconStyle}
`;

const Stats = styled(LeaderboardIcon)`
  ${IconStyle}
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

function App() {

  return (
    <Container>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Logo src={cerebrleLogo} alt="logo" />
      </Link>
      <IconContainer>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Home />
        </Link>
        <Link to="/stats" style={{ textDecoration: "none" }}>
          <Stats />
        </Link>
      </IconContainer>
      {/* Navigation bar can go here */}
      <Main></Main>
    </Container>
  );
}

export default App;
