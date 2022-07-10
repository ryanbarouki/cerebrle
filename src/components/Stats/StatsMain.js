
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import sequenceIcon from '../../icons/sequence_icon.svg'
import numberIcon from '../../icons/number_icon.svg'
import wordGameIcon from '../../icons/word_icon.svg'


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
  background-color: #EFEFEF;
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

export const StatsMain = () => {

  return (
    <BigContainer>
        <div>View your stats for each game!</div>
        <Link to="/stats/sequence" style={{textDecoration: "none"}}>
          <Card>
            <Icon src={sequenceIcon}/>
            <div>Sequence Memory Stats</div>
          </Card>
        </Link>
        <Link to="/stats/number" style={{textDecoration: "none"}}>
          <Card>
            <Icon src={numberIcon}/>
            <div>Number Memory Stats</div>
          </Card>
        </Link>
        <Link to="/stats/word" style={{textDecoration: "none"}}>
          <Card>
            <Icon src={wordGameIcon}/>
            <div>Verbal Memory Stats</div>
          </Card>
        </Link>
    </BigContainer>
  );
}