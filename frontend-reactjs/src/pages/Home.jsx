import React, { useState, useEffect, useCallback } from "react";
import PaginationHome from '../components/PaginationHome';
import SidebarNavbar from "../components/SidebarNavbar";
import Card from "../components/Card";
import FilterSortOptions from "../components/FilterSortOptions";
import SearchCard from "../components/SearchCard";
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import Footer from "../components/footer";
import Carousel from "../components/Carousel";
import MovieDataService from "../services/movie.service";

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [countryFilter, setCountryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [entriesPerPage] = useState(10);
    
    const [filterOptions, setFilterOptions] = useState({
        year: '',
        genre_name: '',
        release_status: '',
        platform_name: '',
        award: '',
        country_name: ''
    });

    const [sortOption, setSortOption] = useState('');

    const navigate = useNavigate();

    const fetchMovies = useCallback(async () => {
        try {
            const response = await MovieDataService.getAllMovies(currentPage, entriesPerPage);
            setMovies(response.data);
            setTotalEntries(response.data.length || 0);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }, [currentPage, entriesPerPage]);

    const fetchFilterSortMovies = useCallback(async () => {
        try {
            const response = await MovieDataService.filterSortMovies(filterOptions, sortOption, currentPage, entriesPerPage);
            setMovies(response.data);
            setTotalEntries(response.data.length || 0);
        } catch (error) {
            console.error("Error fetching filter and sort movies:", error);
        }
    }, [filterOptions, sortOption, currentPage, entriesPerPage]);

    const fetchSearchResults = useCallback(async () => {
        if (searchTerm.trim() === '') {
            setSearchedTerm('');
            setSearchResults([]);
            return;
        }

        setSearchedTerm(searchTerm);
        try {
            const response = await MovieDataService.searchMovies(searchTerm, currentPage, entriesPerPage);
            setSearchResults(response.data);
            setTotalEntries(response.data.length || 0);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        }
    }, [searchTerm, currentPage, entriesPerPage]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            fetchMovies();
        } else {
            fetchSearchResults();
        }
    }, [searchTerm, fetchMovies, fetchSearchResults]);

    // filter by country
    useEffect(() => {
        if (countryFilter === '') {
            fetchMovies();
        } else {
            fetchFilterSortMovies();
        }
    }, [countryFilter, fetchMovies, fetchFilterSortMovies]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.trim() === '') {
            setSearchedTerm('');
            setSearchResults([]);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDramaClick = (id) => {
        console.log("Navigating to Detail Page with ID:", id);
        navigate(`/detail/${id}`);
    };

    const handleCountryFilter = (country) => {
        setCountryFilter(country);
        setFilterOptions(prevState => ({
            ...prevState,
            country_name: country
        }));
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <SidebarNavbar
                onCountryFilter={handleCountryFilter}
                currentFilter={countryFilter}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange} />
            <div className="flex flex-col flex-1 p-4 md:flex-row sm:ml-64">
                <main className="flex-1 p-6 space-y-6 rounded-lg mt-14">
                    <Carousel />

                    <FilterSortOptions
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange} />

                    {searchedTerm && (
                        <section className="flex justify-center mb-4">
                            <p className="italic text-gray-400">
                                Searched/Tagged with "{searchedTerm}"
                            </p>
                        </section>
                    )}

                    {searchedTerm ? (
                        searchResults.length > 0 ? (
                            <section className="grid max-w-4xl grid-cols-1 gap-4 p-0 mx-auto">
                                {searchResults.map((item, index) => (
                                    <SearchCard
                                        key={index}
                                        title={item.title}
                                        year={item.year}
                                        genres={item.genres}
                                        rating={item.movie_rate}
                                        views={item.views}
                                        imageUrl={item.poster_url}
                                        status={item.release_status}
                                        onClick={() => handleDramaClick(item.movie_id)}
                                    />
                                ))}
                            </section>
                        ) : (
                            <div className="flex flex-col items-center justify-center mt-10">
                                <p className="text-lg font-medium text-gray-400">
                                    No results found for <span className="text-orange-600">"{searchedTerm}"</span>
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Try searching with different keywords or check the spelling.
                                </p>
                            </div>
                        )
                    ) : (
                        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {movies.map((movie, index) => (
                                <Card
                                    key={index}
                                    title={movie.title}
                                    year={movie.year}
                                    genres={movie.genres}
                                    rating={movie.movie_rate}
                                    views={movie.views}
                                    imageURL={movie.poster_url}
                                    status={movie.release_status}
                                    onClick={() => handleDramaClick(movie.movie_id)}
                                />
                            ))}
                        </section>
                    )}

                    <PaginationHome
                        currentPage={currentPage}
                        totalEntries={totalEntries}
                        entriesPerPage={entriesPerPage}
                        onPageChange={handlePageChange}
                    />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
