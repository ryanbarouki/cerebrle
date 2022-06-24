import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import cerebrleLogo from '../cerebrle_logo.svg';


const BigContainer = styled.div`
  display: flex;
  text-align: center;
  overflow: auto;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  height: 5rem;
  pointer-events: none;
  font-family: "Boston-Regular";
`;


const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};

export const Home = () => {

  return (
    <BigContainer>
        <div>Links to all the games to go here</div>
    </BigContainer>
  );
}