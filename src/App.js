import styled from 'styled-components';
import { Main } from './components/Main';
import cerebrleLogo from './cerebrle_logo.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.img`
  height: 5rem;
  pointer-events: none;
  font-family: "Boston-Regular";
`;

function App() {

  return (
    <Container>
      <Logo src={cerebrleLogo} alt="logo" />            
      {/* Navigation bar can go here */}
      <Main></Main>
    </Container>
  );
}

export default App;
