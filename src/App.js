import styled from 'styled-components';
import { Main } from './components/Main';
import cerebrleLogo from './cerebrle_logo.svg';
import altLogo from './cerebrle_logo_2.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
      <Logo src={altLogo} alt="logo" />            
      {/* Navigation bar can go here */}
      <Main></Main>
    </Container>
  );
}

export default App;
