import React, { useState, useEffect, useCallback } from 'react';
import DropdownSearch from './DropdownSearch';
import genreDataService from '../services/genre.service';
import awardDataService from '../services/award.service';
import platformDataService from '../services/platform.service';

const FilterSortOptions = ({ onFilterChange, onSortChange }) => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [genres, setGenres] = useState([]);
    const [awards, setAwards] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    // Fetch genres, awards, and platforms
    const fetchGenres = useCallback(async () => {
        try {
            const response = await genreDataService.getAll();
            setGenres(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchAwards = useCallback(async () => {
        try {
            const response = await awardDataService.getAll();
            setAwards(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchPlatforms = useCallback(async () => {
        try {
            const response = await platformDataService.getAll();
            setPlatforms(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchGenres();
        fetchAwards();
        fetchPlatforms();
    }, [fetchGenres, fetchAwards, fetchPlatforms]);  

    const handleFilterButtonClick = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const filterOptions = {
        sort: [
            { value: "title-asc", label: "Alphabetical (A-Z)" },
            { value: "title-desc", label: "Alphabetical (Z-A)" },
            { value: "rating-asc", label: "Rating (Low to High)" },
            { value: "rating-desc", label: "Rating (High to Low)" },
            { value: "year-asc", label: "Year (Old to New)" },
            { value: "year-desc", label: "Year (New to Old)" }
        ]
    };

    const handleClearFilterButtonClick = () => {
        onFilterChange({ target: { name: 'year', value: '' } });
        onFilterChange({ target: { name: 'genre_name', value: '' } });
        onFilterChange({ target: { name: 'release_status', value: '' } });
        onFilterChange({ target: { name: 'platform_name', value: '' } });
        onFilterChange({ target: { name: 'award', value: '' } });
        onSortChange({ target: { name: 'sort', value: '' } });
    };


    return (
        <div className="w-full p-4">
            {/* Filter and Sort Buttons */}
            <button
                id="filter-button"
                className={`p-2 text-gray-400 md:hidden focus:outline-none ${isFilterVisible ? 'hidden' : ''}`}
                onClick={handleFilterButtonClick}
            >
                <i className="text-2xl fas fa-filter"></i>
            </button>

            <button
                id="clear-filter-button"
                className={`relative p-2 text-gray-400 focus:outline-none ${isFilterVisible ? '' : 'hidden'}`}
                onClick={handleClearFilterButtonClick}
            >
                <i className="text-2xl fas fa-filter"></i>
                <i className="absolute top-0 right-0 text-xs text-gray-500 fas fa-times" style={{ transform: 'rotate(45deg)' }}></i>
            </button>

            {/* Filter and Sort Options */}
            <div className={`flex-col mb-4 space-y-4 filter-content md:flex lg:space-y-0 lg:flex-row lg:space-x-4 ${isFilterVisible ? '' : 'hidden'}`}>
                {/* Filter Options */}
                <div className="flex flex-col w-full space-y-2 lg:flex-row lg:items-center lg:space-x-2 lg:w-auto">
                    <span className="w-full text-gray-300 lg:w-auto">Filtered by:</span>
                    <div className="grid w-full grid-cols-2 gap-2 lg:flex lg:space-x-2">
                        {/* Dropdown Year */}
                        <DropdownSearch
                            label="Year"
                            options={[...Array(25).keys()].map(i => 2000 + i)}
                            onChange={onFilterChange}
                            name="year"
                            className="w-full lg:w-auto"
                        />
                        {/* Dropdown Genre */}
                        <DropdownSearch
                            label="Genre"
                            options={genres.map(genre => genre.genre_name)}
                            onChange={onFilterChange}
                            name="genre_name"
                            className="w-full lg:w-auto"
                        />
                        {/* Dropdown Status */}
                        <DropdownSearch
                            label="Status"
                            options={["ONGOING", "COMPLETED", "UPCOMING"]}
                            onChange={onFilterChange}
                            name="release_status"
                            className="w-full lg:w-auto"
                        />
                        {/* Dropdown Availability */}
                        <DropdownSearch
                            label="Availability"
                            options={platforms.map(platform => platform.platform_name)}
                            onChange={onFilterChange}
                            name="platform_name"
                            className="w-full lg:w-auto"
                        />
                        {/* Dropdown Award */}
                        <DropdownSearch
                            label="Award"
                            options={awards.map(award => award.award_name)}
                            onChange={onFilterChange}
                            name="award"
                            className="w-full lg:w-auto"
                        />
                    </div>
                </div>

                {/* Sort Options */}
                <div className="flex flex-col w-full space-y-2 lg:flex-row lg:items-center lg:space-x-2 lg:w-auto">
                    <span className="text-gray-300">Sorted by:</span>
                    <DropdownSearch
                        label="Sort"
                        options={filterOptions.sort.map(option => option.label)}
                        onChange={onSortChange}
                        name="sort"
                        className="w-full lg:w-auto"
                    />
                </div>
            </div>
        </div>

    );
};

export default FilterSortOptions;
