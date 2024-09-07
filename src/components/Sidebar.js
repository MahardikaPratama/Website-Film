// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isVisible, toggleSidebar }) => {
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
                <h2 className="mb-4 text-2xl text-white font-bold">DramaKu</h2>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/"
                            className="block px-4 py-2 text-gray-300 bg-gray-700 rounded-md"
                        >
                            Japan
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className="block px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700"
                        >
                            Korea
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className="block px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700"
                        >
                            China
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
