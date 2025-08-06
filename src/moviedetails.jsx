import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Moviecard from './Moviecard.jsx';



const MovieDetails = () => {

     const {state} = useLocation();
  const navigate = useNavigate();

  const movie = state?.movie;

  // If movie is missing (user directly navigated to URL), redirect or show error
  if (!movie) {
    return (
      <div className="text-white">
        <p>Movie data not found.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (

<div className="w-screen h-screen  flex items-center justify-center p-4">
  
  <div className="w-full max-w-[1000px] h-[500px] bg-[#040314] relative
   shadow-[inset_0px_12px_32px_0px_#CECEFB05,_0px_0px_50px_0px_#AB8BFF4D] rounded-[10px] text-white flex overflow-hidden">
    
    {/* Poster Section */}
    <div className="w-[40%] h-full  flex items-center justify-center p-4">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : '/No-Poster.png'
        }
        alt={movie.title}
        className="w-[302px] h-[441px] rounded-[10px] opacity-100 object-cover"
      />
    </div>

    {/* Details Section */}
    <div className="w-[60%] h-full overflow-y-auto p-6 space-y-4">
      <h2 className="text-3xl text-[#A8B5DB] font-bold">{movie.title}</h2>

      <p className="text-sm text-gray-400">
        {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'} • {movie.original_language?.toUpperCase()}
      </p>
        
        <div className="flex items-center text-[#A8B5DB] text-sm space-x-2">
          <strong>Rating:</strong>
          <div className="flex items-center space-x-1">
             <img src="/star.svg" alt="Star Icon" className="w-4  h-4" />
              <span>{movie.vote_average?.toFixed(1)}/10</span>
              <span>({movie.vote_count}k)</span>
          </div>
       </div>
      

        <div>
          <h3 className="text-xl text-[#A8B5DB] font-semibold mb-1">Overview</h3>
          <p className="text-[#A8B5DB] text-sm leading-relaxed">{movie.overview}</p>
        </div>

         <div className="text-sm text-[#D6C7FF] space-y-1">
           <p><strong className="text-[#A8B5DB]">Adult     :</strong> {movie.adult ? 'Yes' : 'No'}</p>
           <p><strong className="text-[#A8B5DB]">Popularity:</strong> {movie.popularity?.toFixed(0)/100}</p>
           <p><strong className="text-[#A8B5DB]">Status    :</strong> Released</p>
           <p><strong className="text-[#A8B5DB]">Release date    :</strong>  {new Date(movie.release_date).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'long',
               day: 'numeric',
                   })}</p>
         </div>
      </div>

      <div >
        <button
          onClick={() => navigate('/')}
              className="absolute bottom-6 right-6 bg-[#AB8BFF] text-white px-4 py-2 
               rounded-md hover:bg-[#A8B5DB] transition-colors shadow-md"
          >
          Back
        </button>
      </div>

    </div>
 </div>


    
  )
}

export default MovieDetails