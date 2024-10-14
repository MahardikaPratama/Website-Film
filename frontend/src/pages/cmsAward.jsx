import React, { useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';  // Pastikan nama file sesuai
import PaginationAdmin from '../components/PaginationAdmin';
import '../css/style.css';

const CmsAward = () => {
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
                        {/* Form to add a new country */}
                        <form className="flex flex-col w-full p-4 mb-6 space-y-4">
                            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                                <div className="flex flex-col w-full md:w-1/2">
                                    <label htmlFor="country" className="block font-medium text-gray-300">Country</label>
                                    <input 
                                        type="text" 
                                        id="country" 
                                        name="country" 
                                        className="block w-full p-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-orange-500" 
                                    />
                                </div>
                                <div className="flex flex-col w-full md:w-1/2">
                                    <label htmlFor="year" className="block font-medium text-gray-300">Year</label>
                                    <input 
                                        type="text" 
                                        id="year" 
                                        name="year" 
                                        className="block w-full p-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-orange-500" 
                                    />
                                </div>
                                <div className="flex flex-col w-full md:w-1/2">
                                    <label htmlFor="awards" className="block font-medium text-gray-300">Award</label>
                                    <input 
                                        type="text" 
                                        id="awards" 
                                        name="awards"
                                        className="block w-full p-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-orange-500" 
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="h-10 px-4 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                                    style={{ marginTop: '25px' }}
                                >
                                    Submit
                                </button>
                            </div>

                        </form>
                    {/* Section for country management */}
                    <section className="container p-4 mx-full bg-gray-800 rounded-md shadow-md md:p-14">

                        {/* Table displaying countries */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-600"></th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Country</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Year</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Awards</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-800 odd:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">1</td>
                                        <td className="px-4 py-2 border-b border-gray-600">Japan</td>
                                        <td className="px-4 py-2 border-b border-gray-600">2024</td>
                                        <td className="px-4 py-2 border-b border-gray-600">Japanese Drama Awards Spring 2024</td>
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
                    </section>
                                            {/* Pagination Component */}
                                            <PaginationAdmin 
                            currentPage={1} 
                            totalEntries={100} 
                            entriesPerPage={10} 
                            onPageChange={(newPage) => console.log('Page changed to:', newPage)} 
                        />
                </main>

            </div>

            <Footer />
        </div>
    );
};

export default CmsAward;