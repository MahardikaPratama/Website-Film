import React, { useState } from 'react';

const FilterSortOptions = ({ onFilterChange, onSortChange, onSubmit }) => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const handleFilterButtonClick = () => {
        setIsFilterVisible(true);
    };

    const handleClearFilterButtonClick = () => {
        setIsFilterVisible(false);
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
                        <select 
                            className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto"
                            name="year" 
                            onChange={onFilterChange}
                        >
                            <option value="">Year</option>
                            {[...Array(25).keys()].map(i => {
                                const year = 2000 + i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                        <select 
                            className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto"
                            name="genre" 
                            onChange={onFilterChange}
                        >
                            <option value="">Genre</option>
                            {["Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", "Historical", "Horror", "Romance", "Sci-Fi", "Slice of Life", "Thriller", "War", "Western", "Mystery", "Documentary"].map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                        <select 
                            className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto"
                            name="status" 
                            onChange={onFilterChange}
                        >
                            <option value="">Status</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                        <select 
                            className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto"
                            name="avaibility" 
                            onChange={onFilterChange}
                        >
                            <option value="">Availability</option>
                            <option value="Netflix">Netflix</option>
                            <option value="Iqiyi">Iqiyi</option>
                            <option value="Crunchyroll">Crunchyroll</option>
                        </select>
                        <select 
                            className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto"
                            name="award" 
                            onChange={onFilterChange}
                        >
                            <option value="">Award</option>
                            <option value="Awarded">Awarded</option>
                            <option value="Not Awarded">Not Awarded</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col w-full space-y-2 lg:flex-row lg:items-center lg:space-x-2 lg:w-auto">
                    <span className="text-gray-300">Sorted by:</span>
                    <select 
                        className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto"
                        name="sort" 
                        onChange={onSortChange}
                    >
                        <option value="title-asc">Alphabetical (A-Z)</option>
                        <option value="title-desc">Alphabetical (Z-A)</option>
                        <option value="rating-asc">Rating (Low to High)</option>
                        <option value="rating-desc">Rating (High to Low)</option>
                        <option value="year-asc">Year (Old to New)</option>
                        <option value="year-desc">Year (New to Old)</option>
                    </select>
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
