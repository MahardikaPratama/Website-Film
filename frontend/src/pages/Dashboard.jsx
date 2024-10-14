import React, { useEffect, useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from "../components/footer";
import movieDataService from '../services/movie.service';  // Import movie service
import PaginationAdmin from '../components/PaginationAdmin';
import '../css/style.css';

const AdminDramaDashboard = () => {
    const [movies, setMovies] = useState([]); // Movies data
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 5;

    // Get current movies
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

    // Delete movie function
    const handleDelete = (id) => {
        setMovies(movies.filter(movie => movie.movie_id !== id)); // Adjust ID with movie_id
    };

    // Edit movie title function
    const handleEdit = (id) => {
        const newTitle = prompt("Edit Movie Title:");
        setMovies(movies.map(movie => (movie.movie_id === id ? { ...movie, title: newTitle } : movie))); // Adjust ID with movie_id
    };

    // Search Bar function
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter movies based on search term
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch movies and countries on component mount
    const fetchMovies = async () => {
        try {
            const response = await movieDataService.getAllMovies();
            setMovies(response.data.movies); // Get movies from response
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchMovies();
        setIsLoading(false);
    }, []);

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <div className="flex flex-col flex-1 md:flex-row">
                <SidebarAdmin />

                <div className="flex flex-col w-full">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center bg-gray-800 p-4">
                        <h1 className="text-3xl font-semibold text-white">Movies Dashboard</h1>
                        <input
                            type="text"
                            placeholder="Search Movie"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-1/3 p-2 rounded bg-gray-700 text-white focus:outline-none"
                        />
                    </div>

                    {/* Movie Table */}
                    <div className="p-6 bg-gray-900">
                        {isLoading ? (
                            <div className="text-center text-white">Loading movies...</div>
                        ) : error ? (
                            <div className="text-center text-red-500">Error fetching movies!</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full text-white">
                                    <thead>
                                        <tr className="bg-gray-800">
                                            <th className="p-3 text-left">No</th>
                                            <th className="p-3 text-left">Poster</th>
                                            <th className="p-3 text-left">Name</th>
                                            <th className="p-3 text-left">Category</th>
                                            <th className="p-3 text-left">Country</th>
                                            <th className="p-3 text-left">Year</th>
                                            <th className="p-3 text-left">Hours</th>
                                            <th className="p-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie).map((movie, index) => (
                                            <tr key={movie.movie_id} className="bg-gray-800 border-b border-gray-700">
                                                <td className="p-3">{indexOfFirstMovie + index + 1}</td>
                                                <td className="p-3">
                                                    <img src={movie.poster_url} alt="Movie Poster" className="h-16 w-16 object-cover" />
                                                </td>
                                                <td className="p-3">{movie.title}</td>
                                                <td className="p-3">{movie.category}</td>
                                                <td className="p-3">{movie.country_name}</td> {/* Get country directly from movie data */}
                                                <td className="p-3">{movie.year}</td>
                                                <td className="p-3">{movie.hours}</td>
                                                <td className="p-3 flex">
                                                    <button
                                                        onClick={() => handleEdit(movie.movie_id)} // Adjust ID with movie_id
                                                        className="text-orange-500 hover:text-orange-400 mr-2"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(movie.movie_id)} // Adjust ID with movie_id
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
                        )}

                        {/* Pagination */}
                        <div className="flex justify-center items-center mt-4">
                            <PaginationAdmin
                                currentPage={currentPage}
                                totalEntries={filteredMovies.length}
                                entriesPerPage={moviesPerPage}
                                onPageChange={(newPage) => setCurrentPage(newPage)}
                                showPagination={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDramaDashboard;

// import React, { useRef, useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
// import SidebarAdmin from '../components/SidebarAdmin';
// import Footer from "../components/footer";
// import movieDataService from '../services/movie.service';  // Import movie service
// import PaginationAdmin from '../components/PaginationAdmin';
// import '../css/style.css';

// const AdminDramaDashboard = () => {
//     const [movies, setMovies] = useState([]); // Movies data
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Pagination state
//     const [currentPage, setCurrentPage] = useState(1);
//     const moviesPerPage = 5;

//     // Get current movies
//     const indexOfLastMovie = currentPage * moviesPerPage;
//     const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

//     // Delete movie function
//     const handleDelete = (id) => {
//         setMovies(movies.filter(movie => movie.movie_id !== id)); // Adjust ID with movie_id
//     };

//     // Edit movie title function
//     const handleEdit = (id) => {
//         const newTitle = prompt("Edit Movie Title:");
//         setMovies(movies.map(movie => (movie.movie_id === id ? { ...movie, title: newTitle } : movie))); // Adjust ID with movie_id
//     };

//     // Search Bar function
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     // Filter movies based on search term
//     const filteredMovies = movies.filter(movie =>
//         movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     useEffect(() => {
//         // Fetch movies on component mount
//         const fetchMovies = async () => {
//             try {
//                 const response = await movieDataService.getAllMovies();
//                 console.log(response); // Add this line to inspect the response
//                 setMovies(response.data.movies); // Ensure that 'movies' is correctly structured
//             } catch (err) {
//                 console.error(err); // Log the error for debugging
//                 setError(err); // Set error state
//             }
//         };

//         fetchMovies();
//         setIsLoading(false);
//     }, []);

//     return (
//         <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
//             <div className="flex flex-col flex-1 md:flex-row">
//                 <SidebarAdmin />

//                 <div className="flex flex-col w-full">
//                     {/* Top Bar */}
//                     <div className="flex justify-between items-center bg-gray-800 p-4">
//                         <h1 className="text-3xl font-semibold text-white">Movies Dashboard</h1>
//                         <input
//                             type="text"
//                             placeholder="Search Movie"
//                             value={searchTerm}
//                             onChange={handleSearch}
//                             className="w-1/3 p-2 rounded bg-gray-700 text-white focus:outline-none"
//                         />
//                     </div>

//                     {/* Movie Table */}
//                     <div className="p-6 bg-gray-900">
//                         {isLoading ? (
//                             <div className="text-center text-white">Loading movies...</div>
//                         ) : error ? (
//                             <div className="text-center text-red-500">Error fetching movies!</div>
//                         ) : (
//                             <div className="overflow-x-auto">
//                                 <table className="table-auto w-full text-white">
//                                     <thead>
//                                         <tr className="bg-gray-800">
//                                             <th className="p-3 text-left">No</th>
//                                             <th className="p-3 text-left">Poster</th>
//                                             <th className="p-3 text-left">Name</th>
//                                             <th className="p-3 text-left">Category</th>
//                                             <th className="p-3 text-left">Country</th>
//                                             <th className="p-3 text-left">Year</th>
//                                             <th className="p-3 text-left">Hours</th>
//                                             <th className="p-3 text-left">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie).map((movie, index) => (
//                                             <tr key={movie.movie_id} className="bg-gray-800 border-b border-gray-700">
//                                                 <td className="p-3">{indexOfFirstMovie + index + 1}</td>
//                                                 <td className="p-3">
//                                                     <img src={movie.poster_url} alt="Movie Poster" className="h-16 w-16 object-cover" />
//                                                 </td>
//                                                 <td className="p-3">{movie.title}</td>
//                                                 <td className="p-3">{movie.category}</td>
//                                                 <td className="p-3">{movie.country_name}</td> {/* Use movie.country_name directly */}
//                                                 <td className="p-3">{movie.year}</td>
//                                                 <td className="p-3">{movie.hours}</td>
//                                                 <td className="p-3 flex">
//                                                     <button
//                                                         onClick={() => handleEdit(movie.movie_id)} // Adjust ID with movie_id
//                                                         className="text-orange-500 hover:text-orange-400 mr-2"
//                                                     >
//                                                         <i className="fas fa-edit"></i>
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleDelete(movie.movie_id)} // Adjust ID with movie_id
//                                                         className="text-red-500 hover:text-red-400"
//                                                     >
//                                                         <i className="fas fa-trash-alt"></i>
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}

//                         {/* Pagination */}
//                         <div className="flex justify-center items-center mt-4">
//                             <PaginationAdmin
//                                 currentPage={currentPage}
//                                 totalEntries={filteredMovies.length}
//                                 entriesPerPage={moviesPerPage}
//                                 onPageChange={(newPage) => setCurrentPage(newPage)}
//                                 showPagination={true}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default AdminDramaDashboard;
