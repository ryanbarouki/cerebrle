import { NavLink, Routes, Route } from 'react-router-dom';
import { SequenceMain } from './Games/Sequence/SequenceMain';
import { NumberMain } from './Games/Number/NumberMain';
import { WordMain } from './Games/Word/WordMain';
import { Home } from './Home';
import { StatsView } from './Stats/StatsView';
import { useMemo } from 'react';
import { DateTime } from 'luxon';

const getDayString = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};

export const Main = () => {
  const dayString = useMemo(getDayString, []);
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/number' element={<NumberMain dayString={dayString}/>}></Route>
      <Route exact path='/sequence' element={<SequenceMain dayString={dayString}/>}></Route>
      <Route exact path='/word' element={<WordMain dayString={dayString}/>}></Route>
      <Route exact path='/stats' element={<StatsView dayString={dayString}/>}></Route>
    </Routes>
  );
}