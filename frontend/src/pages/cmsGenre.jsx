import React, { useState, useEffect } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';
import PaginationAdmin from '../components/PaginationAdmin';
import genreDataService from '../services/genre.service'; // Import the genre service
import '../css/style.css';

const CmsGenre = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [genres, setGenres] = useState([]); // State to hold genre data
    const [newGenre, setNewGenre] = useState(''); // State for new genre input
    const [currentPage, setCurrentPage] = useState(1);
    const genresPerPage = 5;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await genreDataService.getAll();
                setGenres(response.data); // Adjust according to your API response structure
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const handleChange = (e) => {
        setNewGenre(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newGenre) return; // Prevent submitting empty genres

        try {
            await genreDataService.create({ genre: newGenre });
            setNewGenre(''); // Reset the input field

            // Fetch updated list of genres after adding a new one
            const response = await genreDataService.getAll();
            setGenres(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await genreDataService.delete(id);
            const response = await genreDataService.getAll();
            setGenres(response.data); // Update the genre list after deletion
        } catch (err) {
            setError(err);
        }
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

                    {/* Section for Genre management */}
                    <section className="container p-4 mx-auto bg-gray-800 rounded-md shadow-md md:p-6">
                        {/* Form to add a new Genre */}
                        <form onSubmit={handleSubmit} className="flex items-center mb-6 space-x-4">
                            <label htmlFor="Genre" className="block font-medium text-gray-300">Genre</label>
                            <input 
                                type="text" 
                                id="Genre" 
                                value={newGenre}
                                onChange={handleChange}
                                className="block w-full p-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md md:w-1/3 focus:ring focus:ring-orange-500" 
                                required
                            />
                            <button type="submit" className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600">Submit</button>
                        </form>

                        {/* Table displaying Genres */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-600"></th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Genre</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">Loading genres...</td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="3" className="text-center text-red-500 py-4">Error fetching genres!</td>
                                        </tr>
                                    ) : (
                                        genres.slice((currentPage - 1) * genresPerPage, currentPage * genresPerPage).map((genre, index) => (
                                            <tr key={genre.id} className="bg-gray-800 odd:bg-gray-700">
                                                <td className="px-4 py-2 border-b border-gray-600">{index + 1}</td>
                                                <td className="px-4 py-2 border-b border-gray-600">{genre.genre_name}</td>
                                                <td className="px-4 py-2 text-left border-b border-gray-600">
                                                    <button className="text-red-500 hover:text-red-600 mr-2" onClick={() => handleDelete(genre.id)}>
                                                        <i className="fas fa-trash"></i> {/* Delete Icon */}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Component */}
                        <PaginationAdmin 
                            currentPage={currentPage} 
                            totalEntries={genres.length} 
                            entriesPerPage={genresPerPage} 
                            onPageChange={(newPage) => setCurrentPage(newPage)} 
                        />
                    </section>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default CmsGenre;
