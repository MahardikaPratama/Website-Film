import React, { useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';
import PaginationAdmin from '../components/PaginationAdmin';
import '../css/style.css';

const CmsActor = () => {
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
                        <form className="grid w-full max-w-full grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                            <div className="flex flex-col w-full">
                                <label htmlFor="country" className="block font-medium text-gray-300">Country</label>
                                <input type="text" id="country" name="country" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="actor-name" className="block font-medium text-gray-300">Actor Name</label>
                                <input type="text" id="actor-name" name="actor-name" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="birth-date" className="block font-medium text-gray-300">Birth Date</label>
                                <input type="date" id="birth-date" name="birth-date" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                            </div>
                            <div className="flex flex-col col-span-2">
                                <label htmlFor="upload-image" className="block font-medium text-gray-300">Upload Image</label>
                                <input type="file" id="upload-image" name="upload-image" className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500" />
                            </div>
                            <div className="flex justify-start col-span-2 mt-4">
                                <button type="submit" className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600">Submit</button>
                            </div>
                        </form>
        
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-600"></th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Countries</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Actor Name</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Birth Date</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Photos</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-800 odd:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">1</td>
                                        <td className="px-4 py-2 border-b border-gray-600">Japan</td>
                                        <td className="px-4 py-2 border-b border-gray-600">Ken Watanabe</td>
                                        <td className="px-4 py-2 border-b border-gray-600">1959-10-21</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <img src="https://images.mubicdn.net/images/cast_member/673079/cache-641696-1612491928/image-w856.jpg" alt="Ken Watanabe" className="object-cover w-16 h-16" />
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
                                        <td className="px-4 py-2 border-b border-gray-600">Japan</td>
                                        <td className="px-4 py-2 border-b border-gray-600">Takeshi Kitano</td>
                                        <td className="px-4 py-2 border-b border-gray-600">1947-01-18</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <img src="https://images.mubicdn.net/images/cast_member/673079/cache-641696-1612491928/image-w856.jpg" alt="Takeshi Kitano" className="object-cover w-16 h-16" />
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
                                        <td className="px-4 py-2 border-b border-gray-600">Korea</td>
                                        <td className="px-4 py-2 border-b border-gray-600">Lee Byung-hun</td>
                                        <td className="px-4 py-2 border-b border-gray-600">1970-07-12</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <img src="https://images.mubicdn.net/images/cast_member/673079/cache-641696-1612491928/image-w856.jpg" alt="Lee Byung-hun" className="object-cover w-16 h-16" />
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

export default CmsActor;
