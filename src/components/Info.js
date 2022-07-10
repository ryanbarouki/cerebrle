import styled, { css } from 'styled-components';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HomeIcon from '@mui/icons-material/Home';


const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
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



export const Info = () => {
  return (
    <Container>
      <div>
        <h1>Cerebrle</h1>
        <p>Supercharge your brain with Cerebrle! <br /> <br /> With 3 games to choose from and a detailed overview of your progress, Cerebrle is designed for you to experience the benefits of cognitive training in a fun and engaging way.</p>
      </div>
      <div>
        <h2>Sequence Memory</h2>
        <p>The first game is similar to Simon says. There are 9 squares, when you start 1 square will briefly flash pink. </p>
        <p>simply tap the square you remember flashing. Each subsequent round an additonal square will flash and add to the sequence. </p>
        <p>Remember the sequence for as many rounds as you can. Once the game is over, you can share your score by pressing "Share Score!", or move onto the next game by pressing "Play Number Memory".</p>
      </div>
      <div>
        <h2>Number Memory</h2>
        <p>When you click "Start number Memory" a single digit number will appear on the screen for 5 seconds.</p>
        <p>Rember the number once the timer runs out and enter it into the guess box and click "Guess" to submit. If correct, another digit will be added and the game repeats.</p>
        <p>Once the game is over, you can share your score by pressing "Share Score!", or move onto the next game by pressing "Play Verbal memory".</p>
      </div>
      <div>
        <h2>Verbal Memory</h2>
        <p>In Verbal Memory, a word will appear in the middle of the screen.</p>
        <p> if you have seen the word in todays Verbal Memory game, click the "Seen" button, otherwise click "new". Each time you get a word wrong you lose one of your 3 lives. </p>
        <p>
Once the game is over, you can share your score by pressing "Share Score!", or use the <Home></Home>  button to go back to the main page or the <Stats></Stats> button to go to the statistics page</p>
      </div>
    </Container>
  );
}