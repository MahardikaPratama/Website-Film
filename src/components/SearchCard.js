// src/components/SearchCard.js
import React from "react";

const SearchCard = ({ title, year, genres, rating, views, imageUrl }) => {
    return (
        <div className="flex items-center p-4 space-x-4 bg-gray-800 rounded-lg shadow hover:scale-105 hover:bg-gray-700 hover:shadow-lg">
            <img
                src={imageUrl}
                alt={`Poster of ${title}`}
                className="object-cover w-24 h-32 rounded-md"
            />
            <div className="flex-1">
                <h3 className="text-lg text-white font-bold">{title}</h3>
                <p className="text-gray-400">{year}</p>
                <p className="text-gray-400">{genres}</p>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-400">Rate {rating}</p>
                    <p className="text-sm text-gray-500">{views} views</p>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
