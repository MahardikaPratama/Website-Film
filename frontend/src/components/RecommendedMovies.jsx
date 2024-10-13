import React, { useState, useEffect } from 'react';
import movieDataService from '../services/movie.service'; 

const RecommendedMovies = () => {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            try {
                const response = await movieDataService.getRecommendedMovies();
                setRecommendedMovies(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recommended movies:", error);
                setError("Failed to load recommended movies.");
                setLoading(false);
            }
        };

        fetchRecommendedMovies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold text-white">Movies You Might Like</h2>
            <div className="flex flex-wrap space-x-4">
                {recommendedMovies.map((movie, i) => (
                    <div key={i} className="w-1/4 p-2">
                        <div className="h-64 bg-gray-200">
                            <img 
                                src={movie.coverImage} 
                                alt={movie.title} 
                                className="object-cover w-full h-full rounded-md"
                            />
                        </div>
                        <h3 className="mt-2 text-center text-gray-400">{movie.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedMovies;
