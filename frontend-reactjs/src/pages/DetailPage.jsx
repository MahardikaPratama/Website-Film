import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; 
import '../css/comment.css';
import Footer from "../components/footer";
import movieData from '../data/movies.json';

const DetailPage = () => {
    const { id } = useParams();
    const idUrl = parseInt(id, 10);
    const [movie, setMovie] = useState(null);
    const carouselRef = useRef(null);
    const [genresString, setGenresString] = useState('');
    const [avaibilityString, setAvaibilityString] = useState('');
    
    useEffect(() => {
        const foundMovie = movieData.find(movie => movie.id === idUrl);
        setMovie(foundMovie);
        setGenresString(foundMovie.genres.join(', '));
        setAvaibilityString(foundMovie.avaibility.join(', '));
    }, [idUrl]);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-gray-300 bg-gray-900">
            {/* Header */}
            <header className="bg-gray-800 shadow">
                <div className="container px-6 py-4 mx-auto">
                    <h1 className="text-3xl font-bold text-white">DramaKu</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container px-6 py-10 mx-auto">
                <div className="p-6 bg-gray-800 shadow-md">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/4">
                            <div className="h-64 bg-gray-200 lg:h-auto">
                                <img 
                                    src={movie.coverImage} // Use movie data for image
                                    alt="Drama Poster" 
                                    className="object-cover w-full h-full" 
                                />
                            </div>
                        </div>
                        <div className="mt-6 lg:w-3/4 lg:pl-6 lg:mt-0">
                            <h1 className="text-4xl font-bold leading-tight text-white">{movie.title}</h1>
                            <p className="mt-2 text-gray-400">Other Title: {movie['Alternative Title']}</p>
                            <p className="mt-2 text-gray-400">Year: {movie.year}</p>
                            <p className="mt-2 text-gray-400">Synopsis: {movie.synopsis}</p>
                            <p className="mt-2 text-gray-400">Genre: {genresString}</p>
                            <p className="mt-2 text-gray-400">Rating: {movie.rating}/10</p>
                            <p className="mt-2 text-gray-400">Availability: {avaibilityString}</p>
                        </div>
                    </div>

                    {/* Actor Carousel */}
                    <div className="mt-10">
                        <h2 className="mb-4 text-2xl font-bold text-white">Actors</h2>
                        <div className="relative">
                            {/* Scroll buttons */}
                            <button 
                                onClick={scrollLeft} 
                                className="absolute left-0 p-2 mr-4 text-white transform -translate-y-1/2 bg-gray-800 rounded-full shadow-md top-1/2 hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </button>
                            <button 
                                onClick={scrollRight} 
                                className="absolute right-0 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full shadow-md top-1/2 hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faArrowRight}/>
                            </button>

                            <div 
                                ref={carouselRef} 
                                className="flex px-12 py-2 space-x-4 overflow-x-auto"
                            >
                                {/* Actor items */}
                                {movie.actors.map((actor, i) => (
                                    <div key={i} className="flex-none w-32">
                                        <div className="h-40 bg-gray-200">
                                            <img 
                                                src={actor.fotoActor} // Use actor data for image
                                                alt={`Actor ${i + 1}`} 
                                                className="object-cover w-full h-full rounded-md"
                                            />
                                        </div>
                                        <p className="mt-2 text-center text-gray-400">{actor.namaActor}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="flex items-center justify-center mt-10 bg-gray-200">
                        <div className="w-full" style={{ maxWidth: '1280px', aspectRatio: '16/9' }}>
                            <iframe 
                                className="w-full h-full" 
                                src={movie['link trailer']} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-10 comment-section">
                        <h2 className="text-2xl font-bold text-white">People think about this drama</h2>
                        <div className="comment-list">
                            {['User 1', 'User 2', 'User 3'].map((user, i) => (
                                <div key={i} className="comment-item">
                                    <div className="user-avatar"></div>
                                    <div className="comment-content">
                                        <div className="username">{user}</div>
                                        <div className="comment-date">Aug {30 - i}, 2024</div>
                                        <div className="rating">★★★★☆</div>
                                        <div className="comment-text">Good movie but could be better.</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Comment Form */}
                        <div className="bg-gray-900 comment-form">
                            <h2 className="text-2xl font-bold text-white">Add Your Comment</h2>
                            <form>
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    required 
                                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500"
                                />
                                <textarea 
                                    placeholder="Your Comment" 
                                    required 
                                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500"
                                ></textarea>
                                <div className="mb-4 rating-input">
                                    <label className="block text-gray-400">Rating:</label>
                                    <div className="flex space-x-1 star-rating">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <React.Fragment key={i}>
                                                <input 
                                                    type="radio" 
                                                    id={`star${5 - i}`} 
                                                    name="rating" 
                                                    value={5 - i} 
                                                    required 
                                                    className="hidden"
                                                />
                                                <label 
                                                    htmlFor={`star${5 - i}`} 
                                                    className="text-yellow-400 cursor-pointer"
                                                >
                                                    ★
                                                </label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                <input 
                                    type="submit" 
                                    value="Submit" 
                                    className="px-4 py-2 text-white bg-blue-600 rounded cursor-pointer hover:bg-blue-700"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default DetailPage;
