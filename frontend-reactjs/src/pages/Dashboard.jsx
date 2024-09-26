import React, { useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from "../components/footer";
import moviesData from '../data/movies.json';  // Import movie data
import PaginationAdmin from '../components/PaginationAdmin';
import '../css/style.css';

const AdminDramaDashboard = () => {
  const [movies, setMovies] = useState(moviesData);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const paginateNext = () => {
    if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Delete movie function
  const handleDelete = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  // Edit movie title function
  const handleEdit = (id) => {
    const newTitle = prompt("Edit Movie Title:");
    setMovies(movies.map(movie => (movie.id === id ? { ...movie, title: newTitle } : movie)));
  };

  // Search Bar function
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
    
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );    
    
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdmin />

      <div className="flex flex-col w-full">
        {/* Main Content */}
        <div className="flex-grow p-6 bg-gray-900">
          <h1 className="text-3xl font-semibold text-white mb-6">Movies Dashboard</h1>

          {/* Search Bar */}
          <div className="mb-6 flex items-center">
            <input
              type="text"
              placeholder="Movie Title"
              value={searchTerm}
              onChange={handleSearch}
              className="w-1/3 p-2 rounded bg-gray-700 text-white focus:outline-none"
            />
            <button className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
              Search
            </button>
          </div>

          {/* Movie Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Year</th>
                  <th className="p-3 text-left">Country</th>
                  <th className="p-3 text-left">Genres</th>
                  <th className="p-3 text-left">Rating</th>
                  <th className="p-3 text-left">Availability</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie).map((movie, index) => (
                  <tr key={movie.id} className="bg-gray-800 border-b border-gray-700">
                    <td className="p-3">{indexOfFirstMovie + index + 1}</td>
                    <td className="p-3">{movie.title}</td>
                    <td className="p-3">{movie.year}</td>
                    <td className="p-3">{movie.country}</td>
                    <td className="p-3">{movie.genres.join(", ")}</td>
                    <td className="p-3">{movie.rating}</td>
                    <td className="p-3">{movie.avaibility.join(", ")}</td>
                    <td className="p-3 flex">
                      <button
                        onClick={() => handleEdit(movie.id)}
                        className="text-orange-500 hover:text-orange-400 mr-2"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(movie.id)}
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
          <div className="flex justify-center items-center mt-4">
            <PaginationAdmin
              currentPage={currentPage}
              totalEntries={filteredMovies.length}
              entriesPerPage={moviesPerPage}
              onPageChange={(newPage) => setCurrentPage(newPage)}
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminDramaDashboard;
