import { NavLink, Routes, Route } from 'react-router-dom';
import { SequenceMain } from './Games/Sequence/SequenceMain';
import { NumberMain } from './Games/Number/NumberMain';
import { VerbalMain } from './Games/Verbal/VerbalMain';
import { Home } from './Home';

export const Main = () => (
  <Routes>
    <Route exact path='/' element={<Home/>}></Route>
    <Route exact path='/number' element={<NumberMain/>}></Route>
    <Route exact path='/sequence' element={<SequenceMain/>}></Route>
    <Route exact path='/verbal' element={<VerbalMain/>}></Route>
  </Routes>
);