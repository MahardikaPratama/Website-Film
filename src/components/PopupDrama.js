import React from 'react';
import '../css/modal.css'; // Ensure the CSS file is imported

const PopupDrama = ({ isVisible, hideModal }) => {
    // Conditional className based on visibility
    const modalClass = isVisible ? 'block' : 'hidden';

    const [scrollPosition, setScrollPosition] = React.useState(0);

    const scrollLeft = () => {
        setScrollPosition((prev) => prev - 200);
    };

    const scrollRight = () => {
        setScrollPosition((prev) => prev + 200);
    };

    return (
        <div id="movieApprovalModal" className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center ${modalClass}`}>
            <div className="modal-content bg-gray-900 relative p-6 rounded-lg">
                <button
                    className="close-modal-btn absolute top-2 right-2 text-2xl text-white"
                    onClick={hideModal}
                >
                    &times;
                </button>

                <div className="modal-header mb-4 text-center">
                    <button className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Approve
                    </button>
                    <button className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
                        Delete
                    </button>
                </div>

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
                        <h1 className="text-4xl font-bold leading-tight text-white">
                            Title of the drama 1 that makes two lines
                        </h1>
                        <p className="mt-2 text-gray-400">Other Title: Title 2, Title 3, Title 4</p>
                        <p className="text-gray-400">Year: Spring 2024</p>
                        <p className="mt-4 text-gray-400">
                            Synopsis: somewhere unholy. I don't read it thoroughly. But when I read it, I'm so genuine. I need to stop genres and
                            articles. That's what I want.
                        </p>
                        <p className="mt-2 text-gray-400">Genre: Genre 1, Genre 2, Genre 3</p>
                        <p className="mt-2 text-gray-400">Rating: 9.8/10</p>
                        <p className="mt-2 text-gray-400">Availability: Netflix / Crunchyroll</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="mb-4 text-2xl font-bold text-white">Actors</h2>
                    <div className="relative">
                        <button
                            className="absolute left-0 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full shadow-md top-1/2 hover:bg-gray-700"
                            onClick={scrollLeft}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                            className="absolute right-0 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full shadow-md top-1/2 hover:bg-gray-700"
                            onClick={scrollRight}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>

                        <div
                            id="actor-carousel"
                            className="flex py-2 space-x-4 overflow-x-auto"
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
                            {/* Repeat actor divs as needed */}
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
    );
};

export default PopupDrama;
