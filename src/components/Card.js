import React from "react";

const Card = ({ title, year, genres, rating, views, imageURL, onClick }) => {
    return (
        <div
            className="p-4 transition-transform bg-gray-800 rounded-lg shadow-lg hover:scale-105 hover:bg-gray-700 hover:shadow-2xl cursor-pointer"
            onClick={onClick}
        >
            <img
                src={imageURL}
                alt={`Poster of ${title}`}
                className="object-cover w-full h-48 mb-4 rounded-lg"
            />
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{year}</p>
            <p className="mt-1 text-sm text-gray-400">{genres}</p>
            <div className="flex items-center justify-between mt-3">
                <p className="text-gray-400">Rating: {rating}</p>
                <p className="text-sm text-gray-500">{views} views</p>
            </div>
        </div>
    );
};

export default Card;
