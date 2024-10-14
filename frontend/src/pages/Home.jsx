import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query"; 
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
    const [searchedTerm, setSearchedTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
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
    const [countryFilter, setCountryFilter] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery(
        ['movies', { searchTerm, filterOptions, sortOption, currentPage }],
        async () => {
            console.log("Fetching movies with:", { searchTerm, filterOptions, sortOption, currentPage });
            if (searchTerm) {
                const response = await MovieDataService.searchMovies(searchTerm, currentPage, entriesPerPage);
                console.log("Search response:", response.data);
                return response.data;
            } else {
                const response = await MovieDataService.filterSortMovies(filterOptions, sortOption, currentPage, entriesPerPage);
                console.log("Filter/Sort response:", response);
                return response.data;
            }
        },
        {
            keepPreviousData: true,
        }
    );

    const movies = useMemo(() => {
        console.log("Movies state:", data); 
        return Array.isArray(data) ? data : (data?.movies || []);
    }, [data]);

    console.log("Movies:", movies);

    const totalEntries = data?.totalCount || 0;
    console.log("Total entries:", totalEntries);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchedTerm('');
        } else {
            setSearchedTerm(searchTerm);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (searchTerm) {
            setSearchResults(movies);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, movies]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === '') {
            setSearchedTerm('');
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions(prevState => ({
            ...prevState,
            [name]: value
        }));
        setCurrentPage(1);
    };

    const handleCountryFilter = (selectedCountry) => {
        setFilterOptions(prevState => ({
            ...prevState,
            country_name: selectedCountry
        }));
        setCountryFilter(selectedCountry);
        setCurrentPage(1);
    };

    const handleDramaClick = (id) => {
        navigate(`/movies/${id}`);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <SidebarNavbar
                onCountryFilter={handleCountryFilter}
                currentFilter={countryFilter}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                searchResults={searchResults}
            />
            <div className="flex flex-col flex-1 p-4 md:flex-row sm:ml-64">
                <main className="flex-1 p-6 space-y-6 rounded-lg mt-14">
                    <Carousel />
                    <FilterSortOptions
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange}
                    />
                    {searchedTerm && (
                        <section className="flex justify-center mb-4">
                            <p className="italic text-gray-400">
                                Searched/Tagged with "{searchedTerm}"
                            </p>
                        </section>
                    )}
                    {isLoading ? (
                        <div className="flex justify-center mt-10">
                            <p className="text-gray-400">Loading...</p>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center mt-10">
                            <p className="text-red-400">Error fetching movies!</p>
                        </div>
                    ) : searchedTerm ? (
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
                            {movies.map((item, index) => (
                                <Card
                                    key={index}
                                    title={item.title}
                                    year={item.year}
                                    genres={item.genres}
                                    rating={item.movie_rate}
                                    views={item.views}
                                    imageURL={item.poster_url}
                                    status={item.release_status}
                                    onClick={() => handleDramaClick(item.movie_id)}
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