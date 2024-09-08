import React, { useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin'; 
import FilterAdmin from '../components/FilterAdmin'; 
import PaginationAdmin from '../components/PaginationAdmin'; 
import PopupDrama from '../components/PopupDrama'; 
import Footer from "../components/footer";
import '../css/comment.css';

const CmsDrama = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <div className="flex flex-col flex-1 md:flex-row">
                {/* Sidebar Component */}
                <SidebarAdmin 
                    isVisible={isSidebarVisible}
                    toggleSidebar={toggleSidebar}
                />

                <main className="flex-1 p-4 md:p-6">
                    <button id="hamburger" className="p-2 text-gray-400 md:hidden focus:outline-none" onClick={toggleSidebar}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <section className="container p-4 mx-auto bg-gray-800 rounded-md shadow-md md:p-6">
                        {/* Filter Component */}
                        <FilterAdmin />

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-600">#</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Drama</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Actors</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Genres</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Synopsis</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Status</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-800 odd:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">1</td>
                                        <td className="px-4 py-2 border-b border-gray-600">[2024] Japan - Eye Love You</td>
                                        <td className="px-4 py-2 border-b border-gray-600">Takuya Kimura, Takeuchi Yuko, Neinen Reina</td>
                                        <td className="px-4 py-2 border-b border-gray-600">Romance, Adventures, Comedy</td>
                                        <td className="px-4 py-2 border-b border-gray-600">
                                            <p>I love this drama. It taught me a lot about money and finance. Love is not everything. We need to face the reality too. Being stoic is the best.</p>
                                        </td>
                                        <td className="w-1/6 px-4 py-2 border-b border-gray-600 unapproved">
                                        <button
                                            className="text-red-500 hover:text-red-600"
                                            onClick={showModal}
                                        >
                                            <i className="fas fa-times-circle"></i> Unapproved
                                        </button>

                                        </td>
                                        <td className="w-1/6 px-4 py-2 text-left border-b border-gray-600">
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
                    <section>
                        <PopupDrama isVisible={isModalVisible} hideModal={hideModal} />
                    </section>
                </main>
            </div>
            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default CmsDrama;
