import { NavLink, Routes, Route } from 'react-router-dom';
import { SequenceGame } from './SequenceGame';
import { Home } from './Home';

export const Main = () => (
  <Routes>
    <Route exact path='/' element={<Home/>}></Route>
    {/* <Route path='/number' component={NumberGame}></Route> */}
    <Route exact path='/sequence' element={<SequenceGame/>}></Route>
    {/* <Route path='/verbal' component={VerbalGame}></Route> */}
  </Routes>
);