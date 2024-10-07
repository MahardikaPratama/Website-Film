import React, { useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';
import '../css/style.css';

const CmsDramaInput = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <div className="flex flex-col flex-1 md:flex-row">
                {/* Sidebar Component */}
                <SidebarAdmin 
                    isVisible={isSidebarVisible}
                    toggleSidebar={toggleSidebar}
                />

                <main className="flex-1 p-4 md:p-6">
                    <button
                        id="hamburger"
                        className="p-2 text-gray-400 md:hidden focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>

                    <section className="container p-4 mx-auto bg-gray-800 rounded-md shadow-md md:p-6">
                        <form className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
                            {/* Title and Alternative Title */}
                            <div className="flex flex-col w-full md:flex-row md:space-x-4 col-span-2">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="title" className="block font-medium text-gray-300">Title</label>
                                    <input type="text" id="title" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="alternative-title" className="block font-medium text-gray-300">Alternative Title</label>
                                    <input type="text" id="alternative-title" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                                </div>
                            </div>

                            {/* Year and Country */}
                            <div className="flex flex-col w-full md:flex-row md:space-x-4 col-span-2">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="year" className="block font-medium text-gray-300">Year</label>
                                    <select id="year" name="year" className="w-full px-3 py-2 mt-1 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600">
                                        <option disabled value="">Select Year</option>
                                        {[...Array(25).keys()].map(i => {
                                            const year = 2000 + i;
                                            return <option key={year} value={year}>{year}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="country" className="block font-medium text-gray-300">Country</label>
                                    <select id="country" name="country" className="w-full px-3 py-2 mt-1 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600">
                                        <option disabled value="">Select Country</option>
                                        <option value="Japan">Japan</option>
                                        <option value="China">China</option>
                                        <option value="Korea">Korea</option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* Synopsis */}
                            <div className="flex flex-col w-full col-span-2">
                                <label htmlFor="synopsis" className="block font-medium text-gray-300">Synopsis</label>
                                <textarea id="synopsis" rows="3" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500"></textarea>
                            </div>

                            {/* Availability and Status */}
                            <div className="flex flex-col w-full md:flex-row md:space-x-4 col-span-2">
                                <div className="flex flex-col w-full h-full">
                                    <label htmlFor="availability" className="block font-medium text-gray-300">Availability</label>
                                    <input type="text" id="availability" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500 flex-1"/>
                                </div>
                                <div className="flex flex-col w-full h-full">
                                    <label htmlFor="status" className="block font-medium text-gray-300">Status</label>
                                    <select id="status" name="status" className="w-full px-3 py-2 mt-1 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 flex-1">
                                        <option disabled value="">Select Status</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Upcoming">Upcoming</option>
                                    </select>
                                </div>
                            </div>

                            {/* Genres */}
                            <div className="w-full col-span-2">
                                <label htmlFor="genres" className="block text-sm font-medium text-gray-300">Genres</label>
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                    {/* All 16 Genre Checkboxes */}
                                    {["Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", "Historical", "Horror", "Romance", "Sci-Fi", "Slice of Life", "Thriller", "War", "Western", "Mystery", "Documentary"].map(genre => (
                                        <label key={genre} className="inline-flex items-center text-gray-300">
                                            <input type="checkbox" name="genres[]" value={genre} className="w-4 h-4 mr-2 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500" />
                                            {genre}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        
                            {/* Cover Image */}
                            <div className="flex flex-col w-full col-span-2">
                                <label htmlFor="cover-image" className="block font-medium text-gray-300">Cover Image</label>
                                <input type="file" id="cover-image" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                            </div>
                        
                            {/* Add Actors (Up to 9) */}
                            <div className="flex flex-col w-full col-span-2">
                                <label htmlFor="actors" className="block font-medium text-gray-300">Actors (Up to 9)</label>
                                <input type="text" id="actors" placeholder="Search Actor Names" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                            </div>
                        
                            {/* Actors Grid (Repeat for up to 9 actors) */}
                            <div id="actors-grid" className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-3 lg:grid-cols-4 col-span-2">
                                {/* Actor cards, repeat as needed */}
                                {Array(9).fill(null).map((_, index) => (
                                    <div key={index} className="relative p-2 bg-gray-800 rounded-md shadow-md">
                                        <div className="w-12 h-16 mx-auto bg-gray-400 rounded">
                                            <img src="https://cdn.myanimelist.net/images/characters/9/72533.jpg" alt={`Actor ${index + 1}`} className="w-12 h-16 mx-auto rounded" />
                                        </div>
                                        <p className="mt-2 text-sm text-center text-gray-300">Actor {index + 1}</p>
                                        <button className="absolute top-0 right-0 p-1 text-sm text-gray-400 hover:text-red-500">x</button>
                                    </div>
                                ))}
                            </div>
                        
                            {/* Link Trailer and Award */}
                            <div className="flex flex-col w-full md:flex-row md:space-x-4 col-span-2">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="trailer" className="block font-medium text-gray-300">Link Trailer</label>
                                    <input type="text" id="trailer" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="awards" className="block font-medium text-gray-300">Awards</label>
                                    <input type="text" id="awards" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="w-full mt-4 col-span-2">
                                <button type="submit" className="w-full py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600">Submit</button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default CmsDramaInput;
