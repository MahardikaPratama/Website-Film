import React, { useState, useEffect } from "react";
import SidebarAdmin from '../components/SidebarAdmin'; 
import FilterAdmin from '../components/FilterAdmin'; 
import PaginationAdmin from '../components/PaginationAdmin'; 
import PopupDrama from '../components/PopupDrama'; 
import Footer from "../components/footer";
import '../css/comment.css';
import movieDataService from "../services/movie.service"; // Import service untuk API call

const CmsMovies = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [movies, setMovies] = useState([]);  // State untuk menyimpan data movies
    const [selectedMovie, setSelectedMovie] = useState(null); // State untuk menyimpan movie yang akan di-edit
    const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
    const entriesPerPage = 5; // Jumlah film yang ditampilkan per halaman

    useEffect(() => {
        // Fetch data movies dari API
        const fetchMovies = async () => {
            try {
                const response = await movieDataService.getAllMovies();
                setMovies(response.data.movies); // Assuming response.data.movies is the correct path
            } catch (error) {
                console.error("Failed to fetch movies", error);
            }
        };

        fetchMovies();
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const validateMovie = (movie) => {
        setSelectedMovie(movie); // Simpan movie yang akan di-edit ke state
        showModal(); // Tampilkan modal untuk edit
    };

    const handleEditClick = (movie) => {
        setSelectedMovie(movie); // Simpan movie yang akan di-edit ke state
        showModal(); // Tampilkan modal untuk edit
    };

    const handleDeleteClick = async (movieId) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            try {
                await movieDataService.deleteMovie(movieId); // Panggil API untuk menghapus movie
                setMovies(movies.filter(m => m.movie_id !== movieId)); // Update state setelah delete
            } catch (error) {
                console.error("Failed to delete movie", error);
            }
        }
    };

    // Pagination logic
    const indexOfLastMovie = currentPage * entriesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - entriesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // const totalPages = Math.ceil(movies.length / entriesPerPage); // Total pages

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <div className="flex flex-col flex-1 md:flex-row">
                {/* Sidebar Component */}
                <SidebarAdmin 
                    isVisible={isSidebarVisible}
                    toggleSidebar={toggleSidebar}
                />

                <main className="flex-1 p-4 md:p-6">
                    <button id="hamburger" className="p-2 text-gray-400 md:hidden focus:outline-none" onClick={toggleSidebar}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <section className="container p-4 mx-auto bg-gray-800 rounded-md shadow-md md:p-6">
                        {/* Filter Component */}
                        <FilterAdmin />

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-600">#</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Title</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Genres</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Rating</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Views</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Status</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentMovies.map((movie, index) => (
                                        <tr key={movie.movie_id} className="bg-gray-800 odd:bg-gray-700">
                                            <td className="px-4 py-2 border-b border-gray-600">{index + 1 + indexOfFirstMovie}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{movie.title}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{movie.genres}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{movie.movie_rate}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{movie.views}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">                                        
                                                <button
                                                    className="text-green-500 hover:text-green-600 flex items-center" onClick={() => validateMovie(movie)}>
                                                    <i className="fas fa-check-circle mr-1"></i> Approved
                                                </button>
                                                {/* <button                                            
                                                    className="text-red-500 hover:text-red-600" onClick={() => validateMovie(movie)}>
                                                    <i className="fas fa-times-circle"></i>Unapproved
                                                </button> */}
                                            </td>
                                            <td className="px-4 py-2 text-left border-b border-gray-600">
                                                <button className="text-red-500 hover:text-red-600 mr-2" onClick={() => handleEditClick(movie)}>
                                                    <i className="fas fa-edit"></i> {/* Edit Icon */}
                                                </button>
                                                |
                                                <button className="text-red-500 hover:text-red-600 ml-2" onClick={() => handleDeleteClick(movie.movie_id)}>
                                                    <i className="fas fa-trash"></i> {/* Delete Icon */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Component */}
                        <PaginationAdmin 
                            currentPage={currentPage} 
                            totalEntries={movies.length}  // Total entries for pagination
                            entriesPerPage={entriesPerPage}
                            onPageChange={(newPage) => setCurrentPage(newPage)} // Update current page on page change
                        />
                    </section>
                    <section>
                        {/* Popup untuk Edit Movie */}
                        <PopupDrama isVisible={isModalVisible} hideModal={hideModal} drama={selectedMovie} />
                    </section>
                </main>
            </div>
            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default CmsMovies;



// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom'; 
// import SidebarAdmin from '../components/SidebarAdmin'; 
// import FilterAdmin from '../components/FilterAdmin'; 
// import PaginationAdmin from '../components/PaginationAdmin'; 
// import PopupDrama from '../components/PopupDrama'; 
// import Footer from "../components/footer";
// import movieDataService from "../services/movie.service"; // Import service untuk movie
// import '../css/comment.css';

// const CmsDrama = () => {
//     const [isSidebarVisible, setSidebarVisible] = useState(false);
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [movies, setMovies] = useState([]); // State untuk menyimpan data film
//     const [currentPage, setCurrentPage] = useState(1); // State untuk pagination
//     const [totalMovies, setTotalMovies] = useState(0); // State untuk jumlah total film
//     const entriesPerPage = 10; // Jumlah film per halaman

//     // Fungsi untuk toggle sidebar
//     const toggleSidebar = () => {
//         setSidebarVisible(!isSidebarVisible);
//     };

//     // Fungsi untuk menampilkan dan menyembunyikan modal
//     const showModal = () => setModalVisible(true);
//     const hideModal = () => setModalVisible(false);
//     const { id } = useParams();
//     const idUrl = parseInt(id, 10);
//     const [movie, setMovie] = useState(null);
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state

//     // Fungsi untuk mengambil data film dari database
//     // const fetchMovies = (page) => {
//     //     movieDataService.getAllMovies(page, entriesPerPage)
//     //         .then(response => {
//     //             setMovies(response.data.movies); // Simpan data film di state
//     //             setTotalMovies(response.data.total); // Simpan total film untuk pagination
//     //         })
//     //         .catch(error => {
//     //             console.error("Terjadi kesalahan saat mengambil data film:", error);
//     //         });
//     // };

//     useEffect(() => {
//         const fetchMovies = async () => {
//             try {
//                 const response = await movieDataService.getAllMovies(currentPage, entriesPerPage);
//                 console.log('Movies data:', response.data.movies);
//                 setMovies(response.data.movies); // Simpan data film
//                 setTotalMovies(response.data.total); // Set total film untuk pagination
//             } catch (error) {
//                 console.error("Error fetching movies:", error);
//                 setError("Failed to load movie data.");
//             }
//         };
//         fetchMovies();
//     }, [currentPage]);
    

//     // Gunakan useEffect untuk mengambil data film ketika komponen dimuat pertama kali
//     // useEffect(() => {
//     //     fetchMovies(currentPage);
//     // }, [currentPage]); // Akan dijalankan setiap kali currentPage berubah

//     return (
//         <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
//             <div className="flex flex-col flex-1 md:flex-row">
//                 <SidebarAdmin 
//                     isVisible={isSidebarVisible}
//                     toggleSidebar={toggleSidebar}
//                 />

//                 <main className="flex-1 p-4 md:p-6">
//                     <button id="hamburger" className="p-2 text-gray-400 md:hidden focus:outline-none" onClick={toggleSidebar}>
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//                         </svg>
//                     </button>

//                     <section className="container p-4 mx-auto bg-gray-800 rounded-md shadow-md md:p-6">
//                         <FilterAdmin />

//                         <div className="overflow-x-auto">
//                             <table className="min-w-full text-gray-300 bg-gray-800">
//                                 <thead>
//                                     <tr className="bg-gray-700">
//                                         <th className="px-4 py-2 border-b border-gray-600">#</th>
//                                         <th className="px-4 py-2 text-left border-b border-gray-600">Movies</th>
//                                         <th className="px-4 py-2 text-left border-b border-gray-600">Actors</th>
//                                         <th className="px-4 py-2 text-left border-b border-gray-600">Genres</th>
//                                         <th className="px-4 py-2 text-left border-b border-gray-600">Synopsis</th>
//                                         <th className="px-4 py-2 text-left border-b border-gray-600">Status</th>
//                                         <th className="px-4 py-2 text-left border-b border-gray-600">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {movies.map((movie, index) => (
//                                         <tr key={movie.id} className="bg-gray-800 odd:bg-gray-700">
//                                             <td className="px-4 py-2 border-b border-gray-600">{index + 1}</td>
//                                             <td className="px-4 py-2 border-b border-gray-600">{movie.title}</td>
//                                             {/* <td className="px-4 py-2 border-b border-gray-600">{movie.actors.join(', ')}</td> */}
//                                             {/* <td className="px-4 py-2 border-b border-gray-600">{movie.genres.join(', ')}</td> */}
//                                             <td className="px-4 py-2 border-b border-gray-600">{movie.synopsis}</td>
//                                             <td className="w-1/6 px-4 py-2 border-b border-gray-600">{movie.approval_status}</td>
//                                             <td className="w-1/6 px-4 py-2 text-left border-b border-gray-600">
//                                                 <button className="text-red-500 hover:text-red-600 mr-2">
//                                                     <i className="fas fa-edit"></i>
//                                                 </button>
//                                                 |
//                                                 <button className="text-red-500 hover:text-red-600 ml-2">
//                                                     <i className="fas fa-trash"></i>
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
                        
//                         <PaginationAdmin 
//                             currentPage={currentPage} 
//                             totalEntries={totalMovies} 
//                             entriesPerPage={entriesPerPage} 
//                             onPageChange={(newPage) => setCurrentPage(newPage)} 
//                         />
//                     </section>

//                     <section>
//                         <PopupDrama isVisible={isModalVisible} hideModal={hideModal} />
//                     </section>
//                 </main>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default CmsDrama;
