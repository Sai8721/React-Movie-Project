import { useEffect, useState } from 'react'
import Search from './Search.jsx'
import Moviecard from './Moviecard.jsx'
import { useDebounce } from 'react-use';
import { updateSearchCount, getTrendingmovies } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}


const Home = () => {

 const [searchTerm, setSearchTerm] = useState('');

 const [errormeassage, setErrorMessage] = useState('');

 const [movieList, setMovieList] = useState([]);

 const [isLoading, setisLoading] = useState(false);

const [TrendingMovies, setTrendingMovies] = useState([]);

 

 

 const fetchMovies = async (query = '') => {
  try {
    setisLoading(true);
    setErrorMessage('');

    const endPoint = query 
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
    const response = await fetch(endPoint, API_OPTIONS);

    
    
    if(!response.ok) {
      throw new Error('Network response was not ok');
     }

     const data = await response.json();

     if (data.response === 'error') {
      setErrorMessage(data.error || 'Failed to Fetch Movies');
      setMovieList([]);
      return;
     }

     setMovieList(data.results || []);

     
      console.log('Movies with video = true:', data);

     if(query && data.results.length > 0) {
      await updateSearchCount(query, data.results[0]);
     }
  }
  catch (error) {
    console.error(`Error fetching movies:, ${error}`);
    setErrorMessage('Failed to fetch movies. Please try again later.');
  }
  finally {
    setisLoading(false);
  }
}

useDebounce(() => {
 fetchMovies(searchTerm);},  500,  [searchTerm]
 );

  const LoadTrendingmovies = async () => {
    try {

      const movie = await getTrendingmovies();

      setTrendingMovies(movie);
      
    } catch (error) {
      console.error('Error loading trending movies:', error);
    }
  }

 useEffect( () => {
      LoadTrendingmovies();
 }, []);


  return (
    <main>
        <div className='pattern'>
            <div className='wrapper'>
                <header>
                    <img src='./hero.png' alt='Hero Banner' />
                    <h1>Find <span className='text-gradient'>Movies</span> you'll Enjoy without the Hassle</h1>
                    
                    
                   {/* <h1 className='text-white'>{searchTerm}</h1>*/} 


                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                </header>

                {TrendingMovies.length > 0 && (
                  <section className='trending'>
                    <h2>Trending Movies</h2>
                    <ul>
                      {TrendingMovies.map((movie, index) => (
                        <li key={movie.$id} >
                          <p>{index + 1}</p>
                          <img src={movie.poster_url} alt={movie.title} />
                        </li>
                      ))}
                    </ul>
                  </section>)}

                <section className='all-movies'>
                    
                    <h2><span className='text-gradient font-sans'>All Movies</span></h2>

                    
                      {isLoading ? (
                        <p className='text-white'>Loading...</p>
                      ) : errormeassage ? (
                        <p className='text-red-500'>{errormeassage}</p>
                      ) : (
                        <ul>
                          {movieList.map((movie) => (
                            <Moviecard key={movie.id} movie={movie}/>
                          ))}
                           
                        </ul>
                      )
                    }

                      
                </section>
                
            </div>
        </div>
    </main>
  )
}

export default Home