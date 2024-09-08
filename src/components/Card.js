import React from "react";

const Card = ({ title, year, genres, rating, views, imageURL, status, onClick }) => {
    const genresString = genres.join(', ');

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
        <div 
            className="p-4 transition transform bg-gray-800 rounded-lg shadow list-drama hover:scale-105 hover:bg-gray-700 hover:shadow-lg cursor-pointer"
            onClick={onClick} // Add click handler here
        >
            <div className={`absolute top-0 right-0 px-2 py-1 mt-2 mr-2 text-xs font-bold text-white ${statusColor} rounded-md`}>
                {status}
            </div>
            <img
                src={imageURL}
                alt={`Poster of ${title}`}
                className="object-cover w-full h-32 mb-4 rounded-md"
            />
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-gray-400">{year}</p>
            <p className="text-gray-400">{genresString}</p>
            <div className="flex items-center justify-between">
                <p className="text-gray-400">Rate {rating}/10</p>
                <p className="text-sm text-gray-500">{views} views</p>
            </div>
        </div>
    );
};

export default Card;
