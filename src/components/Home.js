import seedrandom from 'seedrandom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import cerebrleLogo from '../cerebrle_logo.svg';
import { Link } from 'react-router-dom';
import sequenceIcon from '../icons/sequence_icon.svg'
import numberIcon from '../icons/number_icon.svg'
import wordGameIcon from '../icons/word_icon.svg'
import statsIcon from '../icons/stats_icon.svg'


const BigContainer = styled.div`
  display: flex;
  text-align: center;
  overflow: auto;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;


const Card = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
  border-radius: 5px;
  background-color: lightgray;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  color: black;
  width: 11rem;
  :hover {
    transform: translateY(-5px);
  }
  @media (prefers-color-scheme: dark) {
    color: #DADADA;
    background-color: #1F2023;  
  }
`;

const Icon = styled.img`
  width: 2rem;
`;

const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};

export const Home = () => {

  return (
    <BigContainer>
        <Link to="/sequence" style={{textDecoration: "none"}}>
          <Card>
            <Icon src={sequenceIcon}/>
            <div>Sequence Memory</div>
          </Card>
        </Link>
        <Link to="/number" style={{textDecoration: "none"}}>
          <Card>
            <Icon src={numberIcon}/>
            <div>Number Memory</div>
          </Card>
        </Link>
        <Link to="/word" style={{textDecoration: "none"}}>
          <Card>
            <Icon src={wordGameIcon}/>
            <div>Verbal Memory</div>
          </Card>
        </Link>
        <Link to="/stats" style={{textDecoration: "none"}}>
          <Card>
            <Icon src={statsIcon}/>
            <div>Statistics</div>
          </Card>
        </Link>
    </BigContainer>
  );
}