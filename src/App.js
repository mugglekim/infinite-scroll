import { useState } from 'react';
import './App.scss';
import GenreList from './GenreList';
import MovieScroll from './MovieScroll';
const App = () => {
  const[activeTab,setActiveTab]=useState('popular');
  return (
    <div className='app'>
      <h1>영화검색</h1>
      <div className='tabs'>
        <button onClick={()=>{setActiveTab('popular')}}>인기 영화</button>
        <button onClick={()=>{setActiveTab('genre')}}>장르별 영화</button>
      </div>
      <div className='content'>
        {activeTab==='popular' && <MovieScroll/>}
        {activeTab==='genre' && <GenreList/>}
      </div>
    </div>
  );
};

export default App;