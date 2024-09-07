import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/style.css';
import '../css/index.css';
import '../css/modal.css';

// Custom Arrow Components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#ffcc00',  // Change arrow color
        borderRadius: '50%',
        padding: '10px',
        right: '-25px', // Position to right of carousel
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#ffcc00',  // Change arrow color
        borderRadius: '50%',
        padding: '10px',
        left: '-25px', // Position to left of carousel
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
};

const DetailPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const { movie } = location.state || {};

  useEffect(() => {
    if (movie) {
      setMovieDetails(movie);
      console.log("Movie details:", movie); 
    }
  }, [movie]);

  if (!movieDetails) return <div>Loading...</div>;

  // Slider settings for react-slick with custom arrows and no dots
  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,  // Custom next arrow
    prevArrow: <PrevArrow />,  // Custom prev arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container px-6 py-4 mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">DramaKu</h1>
        </div>
      </header>

      <main className="container px-6 py-10 mx-auto">
        <div className="p-6 bg-white shadow-md">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4">
              <img src={movieDetails.image} alt={movieDetails.title} className="h-64 bg-gray-200 lg:h-auto w-full object-cover" />
            </div>
            <div className="mt-6 lg:w-3/4 lg:pl-6 lg:mt-0">
              <h1 className="text-4xl font-bold leading-tight">{movieDetails.title}</h1>
              <p className="mt-2 text-gray-600">Other Titles: {movieDetails.otherTitles?.join(', ')}</p>
              <p className="text-gray-600">Year: {movieDetails.year}</p>
              <p className="mt-4 text-gray-700">Synopsis: {movieDetails.synopsis}</p>
              <p className="mt-2 text-gray-700">Genre: {Array.isArray(movieDetails.genres) ? movieDetails.genres.join(', ') : 'No genres available'}</p>
              <p className="mt-2 text-gray-700">Rating: {movieDetails.rating}/10</p>
              <p className="mt-2 text-gray-700">Availability: {movieDetails.availability?.join(', ')}</p>
            </div>
          </div>

          {/* Actors Section with Slider */}
          <h2 className="text-xl font-bold mt-6">Actors</h2>
          <Slider {...settings} className="mt-6">
            {movieDetails.actors?.map((actor, index) => (
              <div key={index} className="px-2 text-center">
                <img src={actor.picture} alt={actor.name} className="w-24 h-24 mx-auto bg-gray-200 rounded-full" />
                <p className="mt-2 text-gray-600">{actor.name}</p>
              </div>
            ))}
          </Slider>

          {/* Movie Trailer Section */}
          <h2 className="text-xl font-bold mt-6">Movie Trailer</h2>
          <div className="relative w-full h-64 mt-4 bg-gray-800 overflow-hidden rounded-lg">
            <div
              className="w-full h-full cursor-pointer"
              style={{
                backgroundImage: `url(${movieDetails.trailerThumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => window.open(movieDetails.trailer, '_blank')}
            >
              <div className="flex items-center justify-center h-full">
                <svg className="w-20 h-20 text-white opacity-75" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.5 3.5a.5.5 0 01.832-.374l8.75 6.5a.5.5 0 010 .748l-8.75 6.5A.5.5 0 014.5 16.5v-13z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className="comment-section mt-10">
            <h2 className="text-xl font-bold">What People Think About This Drama</h2>
            <div className="comment-list">
              {movieDetails.comments?.map((comment, index) => (
                <div key={index} className="comment-item flex mb-4">
                  <div className="user-avatar w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="comment-content ml-4">
                    <div className="username font-bold">{comment.username}</div>
                    <div className="comment-date text-sm text-gray-500">{comment.date}</div>
                    <div className="rating text-yellow-500">
                      {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                    </div>
                    <div className="comment-text mt-1 text-gray-700">{comment.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <div className="comment-form mt-10">
              <h2 className="text-xl font-bold">Add Your Comment</h2>
              <form className="mt-4">
                <input type="text" placeholder="Your Name" className="block w-full p-2 mb-2 bg-gray-200" required />
                <textarea placeholder="Your Comment" className="block w-full p-2 mb-2 bg-gray-200" required></textarea>
                <div className="rating-input mb-4">
                  <label className="block mb-1 font-bold">Rating:</label>
                  <div className="star-rating">
                    <input type="radio" id="star5" name="rating" value="5" className="hidden" required />
                    <label htmlFor="star5" className="text-yellow-500 cursor-pointer">★</label>
                    <input type="radio" id="star4" name="rating" value="4" className="hidden" />
                    <label htmlFor="star4" className="text-yellow-500 cursor-pointer">★</label>
                    <input type="radio" id="star3" name="rating" value="3" className="hidden" />
                    <label htmlFor="star3" className="text-yellow-500 cursor-pointer">★</label>
                    <input type="radio" id="star2" name="rating" value="2" className="hidden" />
                    <label htmlFor="star2" className="text-yellow-500 cursor-pointer">★</label>
                    <input type="radio" id="star1" name="rating" value="1" className="hidden" />
                    <label htmlFor="star1" className="text-yellow-500 cursor-pointer">★</label>
                  </div>
                </div>
                <button type="submit" className="px-4 py-2 font-bold text-white bg-yellow-500 rounded">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
