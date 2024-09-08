import React, { useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';
import PaginationAdmin from '../components/PaginationAdmin';
import '../css/style.css';

const CmsGenre = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <div className="flex flex-col flex-1 md:flex-row">
                {/* Sidebar Component */}
                <SidebarAdmin 
                    isVisible={isSidebarVisible}
                    toggleSidebar={toggleSidebar}
                />

                <main className="flex-1 p-4 md:p-6">
                    <button
                        id="hamburger"
                        className="p-2 text-gray-400 md:hidden focus:outline-none"
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
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>

                    {/* Section for country management */}
                    <section className="container p-4 mx-auto bg-gray-800 rounded-md shadow-md md:p-6">
                        {/* Form to add a new country */}
                        <form className="flex items-center mb-6 space-x-4">
                            <label htmlFor="country" className="block font-medium text-gray-300">Country</label>
                            <input 
                                type="text" 
                                id="country" 
                                name="country" 
                                className="block w-full p-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md md:w-1/3 focus:ring focus:ring-orange-500" 
                            />
                            <button type="submit" className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600">Submit</button>
                        </form>

                        {/* Table displaying countries */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-600"></th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Country</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-800 odd:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">1</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <input 
                                                type="text" 
                                                value="Japan" 
                                                className="w-full bg-transparent border-none md:w-1/5 focus:ring-0" 
                                            />
                                            <label className="inline-flex items-center ml-2">
                                                <input 
                                                    type="radio" 
                                                    name="default" 
                                                    value="1" 
                                                    className="text-orange-500 form-radio" 
                                                />
                                                <span className="ml-2 text-gray-300">Default</span>
                                            </label>
                                        </td>
                                        <td className="px-4 py-2 text-left border-b border-gray-600">
                                            <button href="#" className="text-red-500 hover:text-red-600 mr-2">
                                                <i className="fas fa-edit"></i> {/* Edit Icon */}
                                            </button>
                                            |
                                            <button href="#" className="text-red-500 hover:text-red- ml-2">
                                                <i className="fas fa-trash"></i> {/* Delete Icon */}
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-800">
                                        <td className="px-4 py-2 border-b border-gray-600">2</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <input 
                                                type="text" 
                                                value="Korea" 
                                                className="w-full bg-transparent border-none md:w-1/5 focus:ring-0" 
                                            />
                                            <label className="inline-flex items-center ml-2">
                                                <input 
                                                    type="radio" 
                                                    name="default" 
                                                    value="2" 
                                                    className="text-orange-500 form-radio" 
                                                />
                                                <span className="ml-2 text-gray-300">Default</span>
                                            </label>
                                        </td>
                                        <td className="px-4 py-2 text-left border-b border-gray-600">
                                            <button href="#" className="text-red-500 hover:text-red-600 mr-2">
                                                <i className="fas fa-edit"></i> {/* Edit Icon */}
                                            </button>
                                            |
                                            <button href="#" className="text-red-500 hover:text-red- ml-2">
                                                <i className="fas fa-trash"></i> {/* Delete Icon */}
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-800 odd:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">3</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <input 
                                                type="text" 
                                                value="China" 
                                                className="w-full bg-transparent border-none md:w-1/5 focus:ring-0" 
                                            />
                                            <label className="inline-flex items-center ml-2">
                                                <input 
                                                    type="radio" 
                                                    name="default" 
                                                    value="3" 
                                                    className="text-orange-500 form-radio" 
                                                />
                                                <span className="ml-2 text-gray-300">Default</span>
                                            </label>
                                        </td>
                                        <td className="px-4 py-2 text-left border-b border-gray-600">
                                            <button href="#" className="text-red-500 hover:text-red-600 mr-2">
                                                <i className="fas fa-edit"></i> {/* Edit Icon */}
                                            </button>
                                            |
                                            <button href="#" className="text-red-500 hover:text-red- ml-2">
                                                <i className="fas fa-trash"></i> {/* Delete Icon */}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Component */}
                        <PaginationAdmin 
                            currentPage={1} 
                            totalEntries={100} 
                            entriesPerPage={10} 
                            onPageChange={(newPage) => console.log('Page changed to:', newPage)} 
                        />
                    </section>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default CmsGenre;
