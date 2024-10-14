import React, { useEffect, useRef, useState, useCallback  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faHeart,
    faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import "../css/comment.css";
import Footer from "../components/footer";
import MovieDataService from "../services/movie.service";
import ActorDataService from "../services/actor.service";
import CommentDataService from "../services/comment.service";
import userDataService from "../services/user.service";

const DetailPage = () => {
    const { id } = useParams();
    const idUrl = parseInt(id, 10);
    const carouselRef = useRef(null);
    const actorRef = useRef(null); 
    const navigate = useNavigate();

    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); 

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -300, 
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: 300, // Atur sesuai kecepatan scroll yang diinginkan
                behavior: "smooth",
            });
        }
    };

    const actorScrollLeft = () => {
        if (actorRef.current) {
            actorRef.current.scrollBy({
                left: -300, // Atur sesuai kecepatan scroll yang diinginkan
                behavior: "smooth",
            });
        }
    };

    const actorScrollRight = () => {
        if (actorRef.current) {
            actorRef.current.scrollBy({
                left: 300, // Atur sesuai kecepatan scroll yang diinginkan
                behavior: "smooth",
            });
        }
    };

    // Fetch movie by ID
    const {
        data: movieData,
        isLoading: isMovieLoading,
        error: movieError,
    } = useQuery(["movie", idUrl], () => MovieDataService.getMovieById(idUrl), {
        enabled: !!idUrl,
    });

    // Fetch actors by movie ID
    const {
        data: actorsData,
        isLoading: isActorsLoading,
        error: actorsError,
    } = useQuery(["actors", idUrl], () => ActorDataService.getByMovie(idUrl), {
        enabled: !!idUrl,
    });

    // Fetch comments by movie ID
    const {
        data: commentsData,
        isLoading: isCommentsLoading,
        error: commentsError,
    } = useQuery(
        ["comments", idUrl],
        () => CommentDataService.getByMovie(idUrl),
        { enabled: !!idUrl }
    );

    // Fetch similar movies by genre
    const {
        data: similarMoviesData,
        isLoading: isSimilarMoviesLoading,
        error: similarMoviesError,
    } = useQuery(
        ["similarMovies", idUrl],
        () => MovieDataService.getMovieBySameGenre(idUrl),
        { enabled: !!idUrl }
    );

    // Define fetchUserData before using it
    const fetchUserData = async () => {
        try {
            const response = await userDataService.getProfile();
            if (response.data) {
                setUserId(response.data.user_id);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        fetchUserData(); 
    }, []);

    const fetchWishlist = useCallback(async () => {
        if (userId) {
            try {
                const response = await MovieDataService.getWishlist(userId);
                if (response.data) {
                    const wishlist = response.data.map((movie) => movie.movie_id);
                    console.log("Wishlist:", wishlist);
                    setIsInWishlist(wishlist.includes(idUrl));
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        }
    }, [userId, idUrl]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchWishlist();
        }
    }, [isLoggedIn, fetchWishlist]);

    if (
        isMovieLoading ||
        isActorsLoading ||
        isCommentsLoading ||
        isSimilarMoviesLoading
    ) {
        return <div>Loading...</div>;
    }

    if (movieError || actorsError || commentsError || similarMoviesError) {
        return <div>Error loading data...</div>;
    }

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Bintang penuh
        const hasHalfStar = rating - fullStars >= 0.5; // Setengah bintang jika ada desimal >= 0.5
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Sisa bintang kosong

        return (
            <>
                {"★".repeat(fullStars)} {/* Bintang penuh */}
                {hasHalfStar && "☆"} {/* Setengah bintang */}
                {"☆".repeat(emptyStars)} {/* Bintang kosong */}
            </>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "dd MMMM yyyy, HH:mm");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!isLoggedIn) {
            setShowWarning(true); // Show warning message if not logged in
            return;
        }

        const commentData = {
            comment_rate: parseFloat(rating),
            detail_comment: commentText,
            user_id: userId,
            movie_id: idUrl,
        };

        console.log("Comment data:", commentData);
        
        try {
            await CommentDataService.create(commentData);
            setSuccessMessage("Comment submitted successfully!"); // Set success message
            setCommentText(""); // Clear comment text
            setRating(0); // Reset rating

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
    };

    const toggleWishlist = async () => {
        if (!isLoggedIn) {
            setShowWarning(true); // Menampilkan pesan peringatan jika belum login
            return;
        }

        try {
            await MovieDataService.addToWishlist(userId, idUrl);
            setIsInWishlist(true); 
            setSuccessMessage("Movie added to wishlist!"); 
            setShowWarning(false); 
        } catch (error) {
            console.error("Failed to add movie to wishlist:", error);
        }
    };

    return (
        <div className="text-gray-300 bg-gray-900">
            <header className="bg-gray-800 shadow">
                <div className="container px-6 py-4 mx-auto">
                    <h1 className="text-3xl font-bold text-white">DramaKu</h1>
                </div>
            </header>

            <main className="container px-6 py-10 mx-auto">
                <div className="p-6 bg-gray-800 shadow-md">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/4">
                            <div className="relative">
                                <img
                                    src={movieData?.data?.poster_url}
                                    alt="Drama Poster"
                                    className="object-cover w-full h-auto rounded-md"
                                />
                            </div>
                            <div className="flex justify-start mt-4">
                                <button 
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700"
                                    onClick={toggleWishlist}
                                >
                                    <FontAwesomeIcon icon={isInWishlist ? faHeartBroken : faHeart} />
                                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                </button>
                            </div>

                            {/* Pesan peringatan jika pengguna belum login */}
                            {showWarning && (
                                <div className="mt-2 text-red-500">
                                    Please log in to add movies to your wishlist.
                                </div>
                            )}

                            {/* Pesan sukses jika film berhasil ditambahkan */}
                            {successMessage && (
                                <div className="mt-2 text-green-500">
                                    {successMessage}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 lg:w-3/4 lg:pl-6 lg:mt-0">
                            <h1 className="text-4xl font-bold leading-tight text-white">
                                {movieData?.data?.title}
                            </h1>
                            <p className="mt-2 text-gray-400">
                                Other Title: {movieData?.data?.alternative_title}
                            </p>
                            <p className="mt-2 text-gray-400">
                                Year: {movieData?.data?.year}
                            </p>
                            <p className="mt-2 text-gray-400">
                                Synopsis: {movieData?.data?.synopsis}
                            </p>
                            <p className="mt-2 text-gray-400">
                                Genre: {movieData?.data?.genres}
                            </p>
                            <p className="mt-2 text-gray-400">
                                Rating: {movieData?.data?.movie_rate}/10
                            </p>
                            <p className="mt-2 text-gray-400">
                                Availability: {movieData?.data?.platforms}
                            </p>
                        </div>
                    </div>

                    {/* Actor Carousel */}
                    <div className="mt-10">
                        <h2 className="mb-4 text-2xl font-bold text-white">Actors</h2>
                        <div className="relative">
                            <button
                                onClick={actorScrollLeft}
                                className="carousel-btn left"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <button
                                onClick={actorScrollRight}
                                className="carousel-btn right"
                            >
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>

                            <div ref={actorRef} className="flex space-x-4 overflow-x-scroll hide-scrollbar" style={{ scrollBehavior: "smooth" }}>
                                {actorsData?.data?.length > 0 ? (
                                    actorsData.data.map((actor, i) => (
                                        <div key={i} className="flex-none w-32">
                                            <img
                                                src={actor.foto_url}
                                                alt={actor.actor_name}
                                                className="object-cover w-full h-40 rounded-md"
                                            />
                                            <p className="mt-2 text-center text-gray-400">{actor.actor_name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No actors found for this movie.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="flex items-center justify-center mt-10 bg-gray-200">
                        <div
                            className="w-full"
                            style={{ maxWidth: "1280px", aspectRatio: "16/9" }}
                        >
                            <iframe
                                className="w-full h-full"
                                src={movieData?.data?.link_trailer}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold text-white">
                            Comments
                        </h2>
                        <div className="comment-list">
                            {isCommentsLoading ? (
                                <p className="text-gray-400">
                                    Loading comments...
                                </p>
                            ) : commentsError ? (
                                <p className="text-gray-400">
                                    Error loading comments.
                                </p>
                            ) : Array.isArray(commentsData?.data) &&
                              commentsData?.data.length > 0 ? (
                                commentsData.data.map((comment, i) => (
                                    <div key={i} className="comment-item">
                                        <div className="comment-content">
                                            <div className="username">
                                                {comment.username}
                                            </div>
                                            <div className="comment-date">
                                                {formatDate(
                                                    comment.created_time
                                                )}
                                            </div>
                                            <div className="rating">
                                                {renderStars(
                                                    comment.comment_rate
                                                )}
                                            </div>
                                            <div className="comment-text">
                                                {comment.detail_comment}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">
                                    No comments available.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Comment Form */}
                    <div className="p-6 bg-gray-900 rounded-md shadow-md comment-form">
                        <h2 className="mb-4 text-2xl font-bold text-white">Add Your Comment</h2>
                        {successMessage && (
                            <div className="p-4 mb-4 text-green-800 bg-green-100 rounded-md">
                                {successMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <textarea
                                className="px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                rows="4"
                                placeholder="Write your comment here..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required
                            />
                            <div className="flex items-center">
                                <label className="mr-4 text-gray-400">Rate:</label>
                                {[...Array(5)].map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`text-2xl ${index < rating ? 'text-yellow-500' : 'text-gray-500'}`}
                                        onClick={() => setRating(index + 1)}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            {showWarning && (
                                <p className="text-red-500">You must be logged in to post a comment.</p>
                            )}
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                            >
                                Submit Comment
                            </button>
                        </form>
                    </div>


                    {/* Similar Movies */}
                    <div className="mt-10">
                        <h2 className="mb-4 text-2xl font-bold text-white">
                            Movies You Might Like
                        </h2>
                        <div className="relative">
                            {/* Tombol Panah Kiri */}
                            <button
                                onClick={scrollLeft}
                                className="absolute p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full carousel-btn left top-1/2 hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            
                            {/* Tombol Panah Kanan */}
                            <button
                                onClick={scrollRight}
                                className="absolute right-0 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full carousel-btn right top-1/2 hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>

                            <div
                                ref={carouselRef}
                                className="flex space-x-4 overflow-x-scroll hide-scrollbar"
                                style={{ scrollBehavior: "smooth" }}
                            >
                                {similarMoviesData?.data?.length > 0 ? (
                                    similarMoviesData.data.map((similar, i) => (
                                        <div key={i} className="flex-none w-32 group">
                                            <img
                                                src={similar.poster_url}
                                                alt={similar.title}
                                                className="object-cover w-full h-40 transition-transform duration-300 ease-in-out transform rounded-md group-hover:scale-105 group-hover:shadow-lg"
                                                onClick={() => navigate(`/${similar.movie_id}`)}
                                            />
                                            <p className="mt-2 text-center text-gray-400">
                                                {similar.title}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">
                                        No similar movies found.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DetailPage;