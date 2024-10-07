import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const SearchCard = ({ title, year, genres, rating, views, imageUrl, status }) => {
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

    // Fungsi untuk mengatur warna status
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

    // Handle klik wishlist
    const handleWishlistClick = (e) => {
        e.stopPropagation(); // Mencegah klik mengaktifkan aksi utama pada card
        setIsWishlisted(!isWishlisted); // Toggle status wishlist
    };

    return (
        <div className="relative flex flex-col items-center p-4 space-y-4 transition-transform transform bg-gray-800 rounded-lg shadow-lg cursor-pointer sm:flex-row sm:space-y-0 sm:space-x-4 hover:scale-105 hover:bg-gray-700 hover:shadow-lg">
            {/* Gambar Poster dengan tombol wishlist di dalamnya */}
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={`Poster of ${title}`}
                    className="object-contain w-full mb-2 rounded-md sm:w-28 h-36 sm:mb-0"
                    loading="lazy"
                />
                {/* Tombol Wishlist di sudut kanan bawah gambar */}
                <button
                    className={`absolute bottom-2 right-3 p-1 transition-colors duration-300 rounded-full border-2 bg-gray-800 bg-opacity-70 ${isWishlisted ? 'border-red-500 bg-red-500 text-white' : 'border-gray-400 text-gray-400 hover:border-red-500 hover:text-red-500'}`}
                    onClick={handleWishlistClick}
                    title="Add to Wishlist"
                >
                    <FaHeart className={`text-md ${isWishlisted ? 'text-white' : 'text-gray-400'}`} />
                </button>
            </div>
            
            {/* Informasi Film */}
            <div className="flex-1 w-full">
                <h3 className="mb-1 text-lg font-semibold text-white line-clamp-1">{title}</h3>
                <p className="mb-1 text-sm text-gray-400">{year}</p>
                <p className="mb-1 text-sm text-gray-400 line-clamp-1">{genres}</p>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Rating: {rating}/10</p>
                    <p className="text-sm text-gray-500">{formatViews(views)} views</p>
                </div>
            </div>
            
            {/* Indikator Status */}
            <div className={`absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white ${statusColor} rounded-md`}>
                {status}
            </div>
        </div>
    );
};

export default SearchCard;
