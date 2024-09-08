import React, { useState, useRef } from 'react';
import '../css/comment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; 

const PopupDrama = ({ isVisible, hideModal }) => {
    // Conditional className based on visibility
    const modalClass = isVisible ? 'block' : 'hidden';
    const carouselRef = useRef(null);

    const [scrollPosition] = useState(0);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div id="movieApprovalModal" className={`fixed inset-0 items-start justify-center bg-black bg-opacity-50 z-[9999] overflow-y-auto ${modalClass}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Background backdrop */}
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                    <div className="relative overflow-hidden text-left transition-all transform bg-gray-900 rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-3xl">
                        <button
                            className="absolute top-4 right-4 text-2xl text-white"
                            onClick={hideModal}
                        >
                            &times;
                        </button>
                        <div className="modal-header">
                            <div className="flex justify-center gap-5 mt-4">
                                <button className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                    Approve
                                </button>
                                <button className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/4">
                                    <div className="h-64 bg-gray-200 lg:h-auto">
                                        <img
                                            src="https://cdn.myanimelist.net/images/anime/1208/94745.jpg"
                                            alt="Drama Poster"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 lg:w-3/4 lg:pl-6 lg:mt-0">
                                    <h1 className="text-4xl font-bold leading-tight text-white">Title of the drama 1 that makes two lines</h1>
                                    <p className="mt-2 text-gray-400">Other Title: Title 2, Title 3, Title 4</p>
                                    <p className="text-gray-400">Year: Spring 2024</p>
                                    <p className="mt-4 text-gray-400">
                                        Synopsis: somewhere unholy. I don't read it thoroughly. But when I read it, I'm so genuine. I need to stop genres and articles. That's what I want.
                                    </p>
                                    <p className="mt-2 text-gray-400">Genre: Genre 1, Genre 2, Genre 3</p>
                                    <p className="mt-2 text-gray-400">Rating: 9.8/10</p>
                                    <p className="mt-2 text-gray-400">Availability: Netflix / Crunchyroll</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="mb-4 text-2xl font-bold text-white">Actors</h2>
                                <div className="relative">
                                    {/* Scroll buttons */}
                                    <button
                                        className="absolute left-0 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full shadow-md top-1/2 hover:bg-gray-700 z-20"
                                        onClick={scrollLeft}
                                    >
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </button>
                                    <button
                                        className="absolute right-0 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full shadow-md top-1/2 hover:bg-gray-700 z-20"
                                        onClick={scrollRight}
                                    >
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </button>


                                    <div
                                        ref={carouselRef}
                                        className="flex py-2 px-2 space-x-4 overflow-x-hidden"
                                        style={{ transform: `translateX(${scrollPosition}px)` }}
                                    >
                                        <div className="flex-none w-32">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src="https://cdn.myanimelist.net/images/characters/9/72533.jpg"
                                                    alt="Actor 1"
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-gray-400">Elric, Alphonse</p>
                                        </div>
                                        <div className="flex-none w-32">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src="https://cdn.myanimelist.net/images/characters/9/72533.jpg"
                                                    alt="Actor 2"
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-gray-400">Elric, Edward</p>
                                        </div>
                                        <div className="flex-none w-32">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src="https://cdn.myanimelist.net/images/characters/9/72533.jpg"
                                                    alt="Actor 3"
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-gray-400">Mustang, Roy</p>
                                        </div>
                                        <div className="flex-none w-32">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src="https://cdn.myanimelist.net/images/characters/9/72533.jpg"
                                                    alt="Actor 4"
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-gray-400">Rockbell, Winry</p>
                                        </div>
                                        <div className="flex-none w-32">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src="https://cdn.myanimelist.net/images/characters/9/72533.jpg"
                                                    alt="Actor 5"
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-gray-400">Hughes, Maes</p>
                                        </div>
                                        <div className="flex-none w-32">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src="https://cdn.myanimelist.net/images/characters/9/72533.jpg"
                                                    alt="Actor 6"
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-gray-400">Armstrong, Alex Louis</p>
                                        </div>
                                        <div className="flex-none w-32">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src="https://cdn.myanimelist.net/images/characters/9/72533.jpg"
                                                    alt="Actor 7"
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-gray-400">Tucker, Shou</p>
                                        </div>
                                        <div className="flex-none w-32">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src="https://cdn.myanimelist.net/images/characters/9/72533.jpg"
                                                    alt="Actor 8"
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-gray-400">Curtis, Izumi</p>
                                        </div>
                                        <div className="flex-none w-32">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src="https://cdn.myanimelist.net/images/characters/9/72533.jpg"
                                                    alt="Actor 9"
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-gray-400">Bradley, King</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center mt-10 bg-gray-200 h-96">
                                <div className="w-full h-full">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/elyXcwunIYA?si=Ezk9nZnUBenKH4Ch"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupDrama;
