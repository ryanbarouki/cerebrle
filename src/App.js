import styled, { css } from 'styled-components';
import { Main } from './components/Main';
import cerebrleLogo from './cerebrle_logo.svg';
import { Link } from 'react-router-dom';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { AdContainer } from './components/GlobalStyles';
import GoogleAd from './components/GoogleAd';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1 0 auto;
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

const Info = styled(InfoIcon)`
  ${IconStyle}
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

function App() {

  return (
    <>
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
        <Link to="/info" style={{ textDecoration: "none" }}>
          <Info />
        </Link>
      </IconContainer>
      <Main></Main>
    </Container>
    <AdContainer>
      <GoogleAd slot="4517132145"/>
    </AdContainer>
    </>
  );
}

export default App;
