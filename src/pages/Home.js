import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import FilterSortOptions from "../components/FilterSortOptions";
import SearchCard from "../components/SearchCard";
import { useNavigate } from "react-router-dom";
import '../css/style.css';
import moviesData from '../data/movies.json';
import Footer from "../components/footer";

const Home = () => {
    // State untuk mengontrol visibilitas sidebar
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    // State untuk menyimpan nilai input pencarian
    const [searchTerm, setSearchTerm] = useState('');
    // State untuk menyimpan hasil pencarian
    const [searchResults, setSearchResults] = useState([]);
    // State untuk menyimpan term pencarian yang telah dikirim
    const [searchedTerm, setSearchedTerm] = useState('');
    // State untuk menyimpan data film
    const [movies] = useState(moviesData);
    // Hook untuk navigasi
    const navigate = useNavigate();
    
    // Fungsi untuk toggle visibilitas sidebar
    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    // Fungsi untuk menangani klik pada card drama
    const handleDramaClick = () => {
        navigate("/detail");
    };

    // Fungsi untuk menangani perubahan input pencarian
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Jika input kosong, reset hasil pencarian dan searchedTerm
        if (value.trim() === '') {
            setSearchedTerm('');
            setSearchResults([]);
        }
    };

    // Fungsi untuk menangani pengiriman form pencarian
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // Cek jika searchTerm kosong
        if (searchTerm.trim() === '') {
            setSearchedTerm('');
            setSearchResults([]);
            return;
        }

        // Set nilai searchedTerm saat submit
        setSearchedTerm(searchTerm);

        // Filter hasil pencarian berdasarkan title film
        const filteredResults = movies.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(filteredResults);
    };


    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <div className="flex flex-col flex-1 md:flex-row">
                {/* Sidebar */}
                <Sidebar
                    isVisible={isSidebarVisible}
                    toggleSidebar={toggleSidebar}
                />
                <main className="flex-1 p-6">
                    {/* Header dengan tombol untuk toggle sidebar dan login */}
                    <div className="flex items-center justify-between mb-4 md:justify-end">
                        <button id="hamburger" className="p-2 text-gray-400 md:hidden focus:outline-none" onClick={toggleSidebar}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        <button id="login-button" type="button" className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Login
                        </button>
                    </div>

                    {/* Form Pencarian */}
                    <div className="flex justify-center mb-4">
                        <form className="flex items-center w-full max-w-lg" onSubmit={handleSearchSubmit}>
                            <label htmlFor="default-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="block w-full p-4 pl-10 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Search Drama..."
                                    required
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Filter and Sort Options */}
                    <FilterSortOptions />

                    {/* Submit Button */}
                    <div className="flex justify-start mb-4">
                        <button type="button" className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Submit
                        </button>
                    </div>

                    {/* Menampilkan keyword pencarian setelah tombol Search diklik */}
                    {searchedTerm && (
                        <section className="flex justify-center mb-4">
                            <p className="italic text-gray-400">
                                Searched/Tagged with "{searchedTerm}"
                            </p>
                        </section>
                    )}

                    {/* Menampilkan konten default atau hasil pencarian */}
                    {searchedTerm && searchResults.length > 0 ? (
                        searchResults.map((item, index) => (
                            <section className="grid max-w-4xl grid-cols-1 gap-4 p-6 mx-auto" key={index}>
                                <SearchCard
                                    title={item.title}
                                    year={item.year}
                                    genres={item.genres}
                                    rating={item.rating}
                                    views={item.views}
                                    imageUrl={item.coverImage}
                                    status={item.status}
                                    onClick={handleDramaClick}
                                />
                            </section>
                        ))
                        ) : searchedTerm ? (
                            // Tampilan ketika tidak ada hasil pencarian
                            <div className="flex flex-col items-center justify-center mt-10">
                                <p className="text-lg font-medium text-gray-400">
                                    No results found for <span className="text-orange-600">"{searchedTerm}"</span>
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Try searching with different keywords or check the spelling.
                                </p>
                            </div>
                    ) : (
                        // Tampilan default jika tidak ada pencarian
                        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {movies.map((movie, index) => (
                                <Card
                                    key={index}
                                    title={movie.title}
                                    year={movie.year}
                                    genres={movie.genres}
                                    rating={movie.rating}
                                    views={movie.views}
                                    imageURL={movie.coverImage}
                                    status={movie.status}
                                    onClick={handleDramaClick}
                                />
                            ))}
                        </section>
                    )}
                </main>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
