import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Import icon dropdown

const DropdownSearch = ({ label, options, onChange, name }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const optionsWithDefault = [label, ...options];

    const filteredOptions = optionsWithDefault.filter(option =>
        option.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (option) => {
        setSelectedOption(option === label ? null : option);
        onChange({ target: { name, value: option === label ? '' : option } });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                className="w-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800 border border-gray-600 rounded-md flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption || label}
                <FaChevronDown className="ml-2 text-gray-400" />
            </button>

            {isOpen && (
                <div className="absolute mt-2 min-w-[200px] bg-gray-800 rounded-md shadow-lg z-10">
                    {/* Search Input */}
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md"
                        placeholder={`Search ${label}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Filtered Options */}
                    <div className="p-1 max-h-40 overflow-y-auto">
                        {filteredOptions.map((option, idx) => (
                            <div
                                key={idx}
                                className="px-4 py-2 text-gray-300 hover:bg-gray-600 cursor-pointer rounded-md"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownSearch;
