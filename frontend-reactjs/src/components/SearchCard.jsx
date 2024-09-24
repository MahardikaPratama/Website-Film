// src/components/SearchCard.js
import React from "react";

const SearchCard = ({ title, year, genres, rating, views, imageUrl, status }) => {

    let statusColor;
    switch (status) {
        case 'ongoing':
            statusColor = 'bg-green-600';
            break;
        case 'completed':
            statusColor = 'bg-blue-600';
            break;
        case 'upcoming':
            statusColor = 'bg-red-600';
            break;
        default:
            statusColor = 'bg-gray-600';
            break;
    }

    return (
        <div className="relative flex items-center p-4 space-x-4 bg-gray-800 rounded-lg shadow hover:scale-105 hover:bg-gray-700 hover:shadow-lg">
            <div className={`absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white ${statusColor} rounded-md`}>
                {status}
            </div>
            <img
                src={imageUrl}
                alt={`Poster of ${title}`}
                className="object-cover w-24 h-32 rounded-md"
            />
            <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-gray-400">{year}</p>
                <p className="text-gray-400">{genres}</p>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-400">Rate {rating}/10</p>
                    <p className="text-sm text-gray-500">{views} views</p>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
