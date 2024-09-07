// src/components/FilterSortOptions.js
import React from 'react';

const FilterSortOptions = ({ onSortChange }) => {
    return (
        <div className="flex flex-col mb-4 space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">
            <div className="flex flex-col w-full space-y-2 lg:flex-row lg:items-center lg:space-x-2 lg:w-auto">
                <span className="w-1/3 text-gray-300">Filtered by:</span>
                <div className="grid w-full grid-cols-2 gap-2 lg:flex lg:space-x-2">
                <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto">
                        <option selected>Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                    <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto">
                        <option selected>Genre</option>
                        <option value="Action">Action</option>
                        <option value="Romance">Romance</option>
                    </select>
                    <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto">
                        <option selected>Status</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto">
                        <option selected>Availability</option>
                        <option value="Netflix">Netflix</option>
                        <option value="Iqiyi">Iqiyi</option>
                    </select>
                    <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto">
                        <option selected>Award</option>
                        <option value="Awarded">Awarded</option>
                        <option value="Not Awarded">Not Awarded</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col w-full space-y-2 lg:flex-row lg:items-center lg:space-x-2 lg:w-auto">
                <span className="text-gray-300">Sorted by:</span>
                <select
                    className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto"
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="title-asc">Alphabetical (A-Z)</option>
                    <option value="title-desc">Alphabetical (Z-A)</option>
                    <option value="year-asc">Year (Old to New)</option>
                    <option value="year-desc">Year (New to Old)</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSortOptions;
