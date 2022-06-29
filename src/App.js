import styled from 'styled-components';
import { Main } from './components/Main';
import cerebrleLogo from './cerebrle_logo.svg';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  height: 3rem;
  pointer-events: none;
  margin-top: 1rem;
`;

function App() {

  return (
    <Container>
      <Link to="/" style={{textDecoration: "none"}}>
        <Logo src={cerebrleLogo} alt="logo" />            
      </Link>
      {/* Navigation bar can go here */}
      <Main></Main>
    </Container>
  );
}

export default App;
