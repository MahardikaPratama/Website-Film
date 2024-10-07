import React, { useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';  
import PaginationAdmin from '../components/PaginationAdmin';
import FilterAdmin from '../components/FilterAdmin';
import '../css/style.css';

const CmsComment = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isAllSelected, setIsAllSelected] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    // Toggle all checkboxes
    const handleSelectAll = () => {
        setIsAllSelected(!isAllSelected);
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
                        {/* Filter Component */}
                        <FilterAdmin />

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 text-left border-b border-gray-600"></th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Username</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Rate</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Drama</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Comments</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-800 odd:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 text-orange-500 form-checkbox"
                                                checked={isAllSelected}
                                                onChange={() => {}}
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-600">Nara</td>
                                        <td className="w-1/6 px-4 py-2 border-b border-gray-600">
                                            <i className="text-red-500 fas fa-star"></i>
                                            <i className="text-red-500 fas fa-star"></i>
                                            <i className="text-red-500 fas fa-star"></i>
                                            <i className="text-red-500 fas fa-star"></i>
                                            <i className="text-red-500 fas fa-star"></i>
                                        </td>
                                        <td className="w-1/4 px-4 py-2 border-b border-gray-600">[2024] Japan - Eye Love You</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <p>I love this drama. It taught me a lot about money and finance. Love is not everything. We need to face the reality too. Being stoic is the best.</p>
                                            <br />
                                            <p>What I love the most is the kindness. Having money is perfect.</p>
                                        </td>
                                        <td className="w-1/6 px-4 py-2 text-red-500 border-b border-gray-600">
                                            <i className="fas fa-times-circle"></i> Unapproved
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-800 odd:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 text-orange-500 form-checkbox"
                                                checked={isAllSelected}
                                                onChange={() => {}}
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-600">Luffy</td>
                                        <td className="w-1/6 px-4 py-2 border-b border-gray-600">
                                            <i className="text-red-500 fas fa-star"></i>
                                            <i className="text-red-500 fas fa-star"></i>
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-600">[2024] Japan - Eye Love You</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            Meh
                                        </td>
                                        <td className="px-4 py-2 text-green-500 border-b border-gray-600">
                                            <i className="fas fa-check-circle"></i> Approved
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

                        <div className="flex items-center mt-4 space-x-4">
                            <div>
                                <label
                                    className="font-semibold text-red-500 cursor-pointer"
                                    onClick={handleSelectAll}
                                >
                                    Select All
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center mt-4 space-x-4">
                            <div>
                                <button className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600">Approve</button>
                            </div>
                            <div>
                                <button className="px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600">Delete</button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default CmsComment;
