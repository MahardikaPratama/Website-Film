import React, { useState, useEffect } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';
import PaginationAdmin from '../components/PaginationAdmin';
import actorDataService from '../services/actor.service'; // Import actor service
import '../css/style.css';

const CmsActor = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [actors, setActors] = useState([]); // State to hold actor data
    const [newActor, setNewActor] = useState({ country: '', actorName: '', birthDate: '', image: null });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const actorsPerPage = 5;

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await actorDataService.getAll();
                setActors(response.data); // Adjust according to your API response structure
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewActor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setNewActor((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("country", newActor.country);
        formData.append("actorName", newActor.actorName);
        formData.append("birthDate", newActor.birthDate);
        if (newActor.image) {
            formData.append("image", newActor.image);
        }

        try {
            await actorDataService.create(formData);
            setNewActor({ country: '', actorName: '', birthDate: '', image: null }); // Reset form
            // Fetch updated list of actors after adding a new one
            const response = await actorDataService.getAll();
            setActors(response.data);
        } catch (err) {
            setError(err);
        }
    };

    //Format Birth date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10); // Format to YYYY-MM-DD
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
                        <form onSubmit={handleSubmit} className="grid w-full max-w-full grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                            <div className="flex flex-col w-full">
                                <label htmlFor="country" className="block font-medium text-gray-300">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={newActor.country}
                                    onChange={handleChange}
                                    className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="actor-name" className="block font-medium text-gray-300">Actor Name</label>
                                <input
                                    type="text"
                                    id="actor-name"
                                    name="actorName"
                                    value={newActor.actorName}
                                    onChange={handleChange}
                                    className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="birth-date" className="block font-medium text-gray-300">Birth Date</label>
                                <input
                                    type="date"
                                    id="birth-date"
                                    name="birthDate"
                                    value={newActor.birthDate}
                                    onChange={handleChange}
                                    className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col col-span-2">
                                <label htmlFor="upload-image" className="block font-medium text-gray-300">Upload Image</label>
                                <input
                                    type="file"
                                    id="upload-image"
                                    onChange={handleFileChange}
                                    className="block w-full p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-orange-500"
                                />
                            </div>
                            <div className="flex justify-start col-span-2 mt-4">
                                <button type="submit" className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600">Submit</button>
                            </div>
                        </form>

                        {/* Actor Table */}
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
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">Loading actors...</td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="6" className="text-center text-red-500 py-4">Error fetching actors!</td>
                                        </tr>
                                    ) : (
                                        actors.slice((currentPage - 1) * actorsPerPage, currentPage * actorsPerPage).map((actor, index) => (
                                            <tr key={actor.id} className="bg-gray-800 odd:bg-gray-700">
                                                <td className="px-4 py-2 border-b border-gray-600">{index + 1}</td>
                                                <td className="px-4 py-2 border-b border-gray-600">{actor.country}</td>
                                                <td className="px-4 py-2 border-b border-gray-600">{actor.actor_name}</td>
                                                <td className="px-4 py-2 border-b border-gray-600">{formatDate(actor.birth_date)}</td> {/* Format date here */}
                                                <td className="px-4 py-2 border-b border-gray-600">{actor.foto_url && <img src={actor.foto_url} alt={actor.actor_name} className="object-cover w-16 h-16" />}
                                                </td>
                                                <td className="px-4 py-2 text-left border-b border-gray-600">
                                                    <button className="text-red-500 hover:text-red-600 mr-2">
                                                        <i className="fas fa-edit"></i> {/* Edit Icon */}
                                                    </button>
                                                    |
                                                    <button className="text-red-500 hover:text-red- ml-2">
                                                        <i className="fas fa-trash"></i> {/* Delete Icon */}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Component */}
                        <PaginationAdmin 
                            currentPage={currentPage} 
                            totalEntries={actors.length} 
                            entriesPerPage={actorsPerPage} 
                            onPageChange={(newPage) => setCurrentPage(newPage)} 
                        />
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default CmsActor;
