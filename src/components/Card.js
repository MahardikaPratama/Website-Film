import React from "react";

const Card = ({ title, year, genres, rating, views, imageURL }) => {
    return (
        <div className="p-4 transition transform bg-gray-800 rounded-lg shadow list-drama hover:scale-105 hover:bg-gray-700 hover:shadow-lg">
            <img
                src={imageURL}
                alt={`Poster of ${title}`}
                className="object-cover w-full h-32 mb-4 rounded-md"
            />
            <h3 className="text-lg text-white font-bold">{title}</h3>
            <p className="text-gray-400">{year}</p>
            <p className="text-gray-400">{genres}</p>
            <div className="flex items-center justify-between">
                <p className="text-gray-400">Rate {rating}</p>
                <p className="text-sm text-gray-500">{views} views</p>
            </div>
        </div>
    );
};

export default Card;
