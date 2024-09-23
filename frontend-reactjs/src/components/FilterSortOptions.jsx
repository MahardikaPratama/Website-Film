import React, { useState } from 'react';
import DropdownSearch from './DropdownSearch';

const FilterSortOptions = ({ onFilterChange, onSortChange, onSubmit }) => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const handleFilterButtonClick = () => {
        setIsFilterVisible(true);
    };

    const handleClearFilterButtonClick = () => {
        setIsFilterVisible(false);
        onFilterChange({ target: { name: 'year', value: '' } });
        onFilterChange({ target: { name: 'genre', value: '' } });
        onFilterChange({ target: { name: 'status', value: '' } });
        onFilterChange({ target: { name: 'availability', value: '' } });
        onFilterChange({ target: { name: 'award', value: '' } });
        onSortChange({ target: { name: 'sort', value: '' } });
    };

    const filterOptions = {
        year: [...Array(25).keys()].map(i => 2000 + i),
        genre: ["Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", "Historical", "Horror", "Romance", "Sci-Fi", "Slice of Life", "Thriller", "War", "Western", "Mystery", "Documentary"],
        status: ["Ongoing", "Completed", "Upcoming"],
        availability: ["Netflix", "Iqiyi", "Crunchyroll"],
        award: ["Awarded", "Not Awarded"],
        sort: [
            { value: "title-asc", label: "Alphabetical (A-Z)" },
            { value: "title-desc", label: "Alphabetical (Z-A)" },
            { value: "rating-asc", label: "Rating (Low to High)" },
            { value: "rating-desc", label: "Rating (High to Low)" },
            { value: "year-asc", label: "Year (Old to New)" },
            { value: "year-desc", label: "Year (New to Old)" }
        ]
    };

    return (
        <div>
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
                <div className="flex flex-col w-full space-y-2 lg:flex-row lg:items-center lg:space-x-2 lg:w-auto">
                    <span className="w-1/3 text-gray-300">Filtered by:</span>
                    <div className="grid w-full grid-cols-2 gap-2 lg:flex lg:space-x-2">
                        {/* Dropdown Year */}
                        <DropdownSearch
                            label="Year"
                            options={filterOptions.year}
                            onChange={onFilterChange}
                            name="year"
                        />
                        {/* Dropdown Genre */}
                        <DropdownSearch
                            label="Genre"
                            options={filterOptions.genre}
                            onChange={onFilterChange}
                            name="genre"
                        />
                        {/* Dropdown Status */}
                        <DropdownSearch
                            label="Status"
                            options={filterOptions.status}
                            onChange={onFilterChange}
                            name="status"
                        />
                        {/* Dropdown Availability */}
                        <DropdownSearch
                            label="Availability"
                            options={filterOptions.availability}
                            onChange={onFilterChange}
                            name="availability"
                        />
                        {/* Dropdown Award */}
                        <DropdownSearch
                            label="Award"
                            options={filterOptions.award}
                            onChange={onFilterChange}
                            name="award"
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full space-y-2 lg:flex-row lg:items-center lg:space-x-2 lg:w-auto">
                    <span className="text-gray-300">Sorted by:</span>
                    <DropdownSearch
                        label="Sort"
                        options={filterOptions.sort.map(option => option.label)}
                        onChange={onSortChange}
                        name="sort"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className={`justify-start ${isFilterVisible ? '' : 'hidden'} mb-4 md:flex`}>
                <button 
                    type="button" 
                    className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5" 
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default FilterSortOptions;
