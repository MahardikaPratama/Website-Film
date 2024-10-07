import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Card = ({ title, year, genres, rating, views, imageURL, status, onClick }) => {
    const [isWishlisted, setIsWishlisted] = useState(false); // State untuk status wishlist

    // Fungsi untuk memformat jumlah views
    const formatViews = (views) => {
        if (views >= 1e6) {
            return `${(views / 1e6).toFixed(1)}M`; // Menampilkan juta
        } else if (views >= 1e3) {
            return `${(views / 1e3).toFixed(1)}k`; // Menampilkan ribu
        } else {
            return views; // Menampilkan angka asli jika kurang dari seribu
        }
    };

    // Menentukan warna status
    const statusColor = (() => {
        switch (status) {
            case 'ONGOING':
                return 'bg-green-600';
            case 'COMPLETED':
                return 'bg-blue-600';
            case 'UPCOMING':
                return 'bg-red-600';
            default:
                return 'bg-gray-600';
        }
    })();

    const handleWishlistClick = (e) => {
        e.stopPropagation(); // Mencegah klik mengaktifkan onClick pada card
        setIsWishlisted(!isWishlisted); // Toggle status wishlist
    };

    return (
        <div 
            className="relative p-4 transition-transform transform bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:scale-105 hover:bg-gray-700"
            onClick={onClick}
        >
            {/* Gambar poster */}
            <div className="relative">
                <img
                    src={imageURL}
                    alt={`Poster of ${title}`}
                    className="object-cover w-full h-72 rounded-md mb-4"
                    loading="lazy" 
                />
                {/* Indikator status */}
                <div className={`absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white ${statusColor} rounded-md shadow-md`}>
                    {status}
                </div>
                {/* Tombol Wishlist */}
                <button 
                    className={`absolute bottom-2 right-2 p-1 transition-colors duration-300 rounded-full border-2 bg-gray-800 bg-opacity-70 ${isWishlisted ? 'border-red-500 bg-red-500 text-white' : 'border-gray-400 text-gray-400 hover:border-red-500 hover:text-red-500'}`}
                    onClick={handleWishlistClick}
                    title="Add to Wishlist" // Teks saat dihover
                >
                    <FaHeart className={`text-md ${isWishlisted ? 'text-white' : 'text-gray-400'}`} />
                </button>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">{title}</h3>
            <p className="text-sm text-gray-400 mb-1">{year}</p>
            <p className="text-sm text-gray-400 mb-2 line-clamp-1">{genres}</p>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-400">Rating: {rating}/10</p>
                <p className="text-sm text-gray-500">{formatViews(views)} views</p>
            </div>
        </div>
    );
};

export default Card;
