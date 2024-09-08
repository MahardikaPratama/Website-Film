// Sidebar.js
import React from "react";

const Sidebar = ({ isVisible, toggleSidebar, onCountryFilter, currentFilter  }) => {

    return (
        <aside
            id="sidebar"
            className={`fixed inset-y-0 left-0 z-40 flex flex-col w-64 md:h-auto bg-gray-800 shadow-lg md:relative md:w-1/5 md:shadow-none transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
            <div className="relative flex-1 p-6 overflow-y-auto">
                <button
                    id="close-sidebar"
                    className="absolute p-2 text-gray-400 top-4 right-4 md:hidden focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
                <div className="flex items-center mb-4">
                    <img src="https://i.pinimg.com/originals/2c/ae/fe/2caefe0fe73204830ee22868604390d5.png" alt="DramaKu Logo" className="w-8 h-8 mr-2 bg-white border rounded-full"/>
                    <h2 className="text-2xl font-bold text-white">DramaKu</h2>
                </div>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => onCountryFilter('')}
                            className={`flex items-center px-4 py-2 text-gray-300 rounded-md ${currentFilter  === '' ? 'bg-gray-700' : 'hover:bg-gray-700'} w-full text-left`}                            
                        >
                            <i className="mr-4 fas fa-film"></i>
                            All Dramas
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onCountryFilter('Japan')}
                            className={`flex items-center px-4 py-2 text-gray-300 rounded-md ${currentFilter  === 'Japan' ? 'bg-gray-700' : 'hover:bg-gray-700'} w-full text-left`}
                        >
                            <img src="https://media.istockphoto.com/id/537287287/id/vektor/bendera-jepang.jpg?s=612x612&w=0&k=20&c=BZEGVwtP918iV-Kw8J7DshVP8ZUvapxq47ezKz03LKU=" alt="Japan Flag" className="w-6 h-4 mr-2"/>
                            Japan
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onCountryFilter('China')}
                            className={`flex items-center px-4 py-2 text-gray-300 rounded-md ${currentFilter  === 'China' ? 'bg-gray-700' : 'hover:bg-gray-700'} w-full text-left`}
                        >
                            <img src="https://media.istockphoto.com/id/537287169/id/vektor/bendera-cina.jpg?s=612x612&w=0&k=20&c=uGupXdzW8jt3glSFmZTO8dY9rdXHITdJHsgxeX6ryIU=" alt="China Flag" className="w-6 h-4 mr-2"/>
                            China
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onCountryFilter('Korea')}
                            className={`flex items-center px-4 py-2 text-gray-300 rounded-md ${currentFilter  === 'Korea' ? 'bg-gray-700' : 'hover:bg-gray-700 bg-gray-800'} w-full text-left`}
                        >
                            <img src="https://media.istockphoto.com/id/1132287785/id/vektor/bendera-korea-selatan.jpg?s=612x612&w=0&k=20&c=7hymvujlLAAgdYiRc52VhLOeKBGM6Z6eJcjQNzc6fhI=" alt="Korea Flag" className="w-6 h-4 mr-2"/>
                            Korea
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
