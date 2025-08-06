import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import MovieDetails from './moviedetails';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/:id" element={<MovieDetails />} />
  </Routes>
);

export default App;
