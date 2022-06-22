import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import cerebrleLogo from './cerebrle_logo.svg';


const BigContainer = styled.div`
  display: flex;
  text-align: center;
  position: absolute;
  overflow: auto;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  @media (prefers-color-scheme: dark) {
  background-color: #121212;
  }
`;

const Logo = styled.img`
  height: 5rem;
  pointer-events: none;
  font-family: "Boston-Regular";
`;


const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};

function App() {

  return (
    <BigContainer>
      <Logo src={cerebrleLogo} alt="logo" />            
    </BigContainer>
  );
}

export default App;
