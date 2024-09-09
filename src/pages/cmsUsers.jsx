import React, { useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';
import PaginationAdmin from '../components/PaginationAdmin';
import '../css/style.css';

const CmsUsers = () => {
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

                    <section className="container p-4 mx-auto bg-gray-800 rounded-md shadow-md md:p-6">
                        {/* Form to add a new user */}
                        <form className="grid w-full max-w-3xl grid-cols-2 gap-4 p-4 mb-6">
                            <div className="flex flex-col w-full">
                                <label htmlFor="username" className="block font-medium text-gray-300">Username</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" 
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="email" className="block font-medium text-gray-300">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" 
                                />
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-start col-span-2 mt-4">
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                
                        {/* Table displaying users */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-600"></th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Username</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Email</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-800 odd:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">1</td>
                                        <td className="px-4 py-2 border-b border-gray-600">anita1</td>
                                        <td className="px-4 py-2 border-b border-gray-600">anita@gmail.com</td>
                                        <td className="px-4 py-2 text-left border-b border-gray-600">
                                            <button href="#" className="text-red-500 hover:text-red-600 mr-2">
                                                <i className="fas fa-envelope"></i>
                                            </button> |
                                            <button href="#" className="text-red-500 hover:text-red-600 ml-2">
                                                <i className="fas fa-edit"></i>
                                            </button> |
                                            <button href="#" className="text-red-500 hover:text-red-600 ml-2">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-800">
                                        <td className="px-4 py-2 border-b border-gray-600">2</td>
                                        <td className="px-4 py-2 border-b border-gray-600">borang</td>
                                        <td className="px-4 py-2 border-b border-gray-600">bora@yahoo.com</td>
                                        <td className="px-4 py-2 text-left border-b border-gray-600">
                                        <button href="#" className="text-red-500 hover:text-red-600 mr-2">
                                                <i className="fas fa-envelope"></i>
                                            </button> |
                                            <button href="#" className="text-red-500 hover:text-red-600 ml-2">
                                                <i className="fas fa-edit"></i>
                                            </button> |
                                            <button href="#" className="text-red-500 hover:text-red-600 ml-2">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-800 odd:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">3</td>
                                        <td className="px-4 py-2 border-b border-gray-600">ayano17</td>
                                        <td className="px-4 py-2 border-b border-gray-600">ayano@gmail.com</td>
                                        <td className="px-4 py-2 text-left border-b border-gray-600">
                                            <button href="#" className="text-red-500 hover:text-red-600 mr-2">
                                                <i className="fas fa-envelope"></i>
                                            </button> |
                                            <button href="#" className="text-red-500 hover:text-red-600 ml-2">
                                                <i className="fas fa-edit"></i>
                                            </button> |
                                            <button href="#" className="text-red-500 hover:text-red-600 ml-2">
                                                <i className="fas fa-trash"></i>
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

export default CmsUsers;
