import React, { useRef, useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import Footer from "../components/footer";
import moviesData from "../data/movies.json"; // Import movie data
import PaginationAdmin from "../components/PaginationAdmin";
import "../css/style.css";

const AdminDramaDashboard = () => {
    const [movies, setMovies] = useState(moviesData);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 5;

    // Get current movies
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

    // Delete movie function
    const handleDelete = (id) => {
        setMovies(movies.filter((movie) => movie.id !== id));
    };

    // Edit movie title function
    const handleEdit = (id) => {
        const newTitle = prompt("Edit Movie Title:");
        setMovies(
            movies.map((movie) =>
                movie.id === id ? { ...movie, title: newTitle } : movie
            )
        );
    };

    // Search Bar function
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <div className="flex flex-col flex-1 md:flex-row">
                {/* Sidebar */}
                <SidebarAdmin />

                <div className="flex flex-col w-full">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between p-4 bg-gray-800">
                        <h1 className="text-3xl font-semibold text-white">
                            Movies Dashboard
                        </h1>
                        <input
                            type="text"
                            placeholder="Search Movie"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-1/3 p-2 text-white bg-gray-700 rounded focus:outline-none"
                        />
                    </div>

                    {/* Movie Table */}
                    <div className="p-6 bg-gray-900">
                        {/* Dashboard Stats */}
                        <div className="grid grid-cols-3 gap-6 p-6">
                            <div className="flex items-center p-4 text-left bg-gray-700 bg-opacity-50 rounded-md shadow-md">
                                <i className="mr-4 text-3xl text-orange-500 fas fa-film"></i>{" "}
                                {/* Icon film */}
                                <div>
                                    <h2 className="mb-1 text-base font-semibold text-white">
                                        Total Movies
                                    </h2>
                                    <p className="text-sm text-white">
                                        {movies.length}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 text-left bg-gray-700 bg-opacity-50 rounded-md shadow-md">
                                <i className="mr-4 text-3xl text-blue-500 fas fa-th-large"></i>{" "}
                                {/* Icon categories */}
                                <div>
                                    <h2 className="mb-1 text-base font-semibold text-white">
                                        Total Categories
                                    </h2>
                                    <p className="text-sm text-white">11</p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 text-left bg-gray-700 bg-opacity-50 rounded-md shadow-md">
                                <i className="mr-4 text-3xl text-green-500 fas fa-users"></i>{" "}
                                {/* Icon users */}
                                <div>
                                    <h2 className="mb-1 text-base font-semibold text-white">
                                        Total Users
                                    </h2>
                                    <p className="text-sm text-white">
                                        {useRef.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-white table-auto">
                                <thead>
                                    <tr className="bg-gray-800">
                                        <th className="p-3 text-left">#</th>
                                        <th className="p-3 text-left">
                                            Photos
                                        </th>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">
                                            Category
                                        </th>
                                        <th className="p-3 text-left">
                                            Language
                                        </th>
                                        <th className="p-3 text-left">Year</th>
                                        <th className="p-3 text-left">Hours</th>
                                        <th className="p-3 text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMovies
                                        .slice(
                                            indexOfFirstMovie,
                                            indexOfLastMovie
                                        )
                                        .map((movie, index) => (
                                            <tr
                                                key={movie.id}
                                                className="bg-gray-800 border-b border-gray-700"
                                            >
                                                <td className="p-3">
                                                    {indexOfFirstMovie +
                                                        index +
                                                        1}
                                                </td>
                                                <td className="p-3">
                                                    <img
                                                        src={movie.poster_url}
                                                        alt="Movie Poster"
                                                        className="object-cover w-16 h-16"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    {movie.title}
                                                </td>
                                                <td className="p-3">
                                                    {movie.category}
                                                </td>
                                                <td className="p-3">
                                                    {movie.language}
                                                </td>
                                                <td className="p-3">
                                                    {movie.year}
                                                </td>
                                                <td className="p-3">
                                                    {movie.hours}
                                                </td>
                                                <td className="flex p-3">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(movie.id)
                                                        }
                                                        className="mr-2 text-orange-500 hover:text-orange-400"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                movie.id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-400"
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center mt-4">
                            <PaginationAdmin
                                currentPage={currentPage}
                                totalEntries={filteredMovies.length}
                                entriesPerPage={moviesPerPage}
                                onPageChange={(newPage) =>
                                    setCurrentPage(newPage)
                                }
                            />
                        </div>
                    </div>
                    <Footer />
                    {/* Footer */}
                </div>
            </div>
        </div>
    );
};

export default AdminDramaDashboard;
