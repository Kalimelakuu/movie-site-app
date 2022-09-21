import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/Navigation';
import Switch from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/system';

import Trending from './pages/Trending/trending';
import Movies from './pages/Movies/movies';
import Series from './pages/Series/series';
import Search from './pages/Search/search';



function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='app'>
            <Container>
              <Routes>
              <Route exact path='/' element={<Trending/>}   />
              <Route path='/movies' element={<Movies/>}  />
              <Route path='/series' element={<Series/>}   />
              <Route path='/search' element={<Search/>}  />    
              </Routes> 
            </Container> 
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
