import React, { useState } from 'react';

const FilterAdmin = () => {
    const [filterStatus, setFilterStatus] = useState('None');
    const [numberOfShows, setNumberOfShows] = useState('10');

    const handleStatusChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const handleNumberOfShowsChange = (event) => {
        setNumberOfShows(event.target.value);
    };

    return (
        <div className="flex flex-col mb-4 lg:flex-row lg:space-x-4 lg:items-center lg:justify-start">
            {/* Filter Container */}
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
                {/* Filter Label */}
                <span className="text-gray-300 lg:whitespace-nowrap">Filtered by:</span>
                {/* Select Filter Status */}
                <select
                    className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto"
                    value={filterStatus}
                    onChange={handleStatusChange}
                >
                    <option value="None">None</option>
                    <option value="Unapproved">Unapproved</option>
                    <option value="Approved">Approved</option>
                </select>
            </div>
        
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
                {/* Shows Label */}
                <span className="text-gray-300 lg:whitespace-nowrap">Shows:</span>
                {/* Select Number of Shows */}
                <select
                    className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg p-2.5 hover:bg-gray-700 w-full lg:w-auto"
                    value={numberOfShows}
                    onChange={handleNumberOfShowsChange}
                >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                </select>
            </div>
        </div>
    );
};

export default FilterAdmin;
