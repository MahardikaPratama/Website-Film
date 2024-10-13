import React, { useEffect, useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';
import PaginationAdmin from '../components/PaginationAdmin';
import countryDataService from '../services/country.service'; // Import CountryDataService
import '../css/style.css';

const CmsCountry = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [countries, setCountries] = useState([]); // State untuk menyimpan daftar negara
    const [newCountry, setNewCountry] = useState(""); // State untuk input negara
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 5;

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    // Ambil data negara saat komponen dimuat
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await countryDataService.getAll();
            setCountries(response.data);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    // Tambah negara
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newCountry) return; // Jangan lakukan apa-apa jika input kosong
        try {
            await countryDataService.create({ name: newCountry });
            setNewCountry(""); // Kosongkan input setelah submit
            fetchCountries(); // Ambil ulang data negara
        } catch (error) {
            console.error("Error adding country:", error);
        }
    };

    // Mengedit negara (logika dapat diubah sesuai kebutuhan)
    const handleEdit = async (id, updatedName) => {
        try {
            await countryDataService.update(id, { name: updatedName });
            fetchCountries(); // Ambil ulang data setelah update
        } catch (error) {
            console.error("Error updating country:", error);
        }
    };

    // Menghapus negara
    const handleDelete = async (id) => {
        try {
            await countryDataService.delete(id);
            fetchCountries(); // Ambil ulang data setelah penghapusan
        } catch (error) {
            console.error("Error deleting country:", error);
        }
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
                        <form className="flex items-center mb-6 space-x-4" onSubmit={handleSubmit}>
                            <label htmlFor="country" className="block font-medium text-gray-300">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={newCountry}
                                onChange={(e) => setNewCountry(e.target.value)} // Update state saat input berubah
                                className="block w-full p-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md md:w-1/3 focus:ring focus:ring-orange-500"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                            >
                                Submit
                            </button>
                        </form>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-600"></th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Countries</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {countries.slice((currentPage - 1) * countriesPerPage, currentPage * countriesPerPage).map((country, index) => (
                                        <tr key={country.id} className="bg-gray-800 odd:bg-gray-700">
                                            <td className="px-4 py-2 border-b border-gray-600">{(currentPage - 1) * countriesPerPage + index + 1}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">
                                                <input
                                                    type="text"
                                                    defaultValue={country.country_name}
                                                    onBlur={(e) => handleEdit(country.id, e.target.value)} // Edit saat input kehilangan fokus
                                                    className="w-full bg-transparent border-none md:w-1/5 focus:ring-0"
                                                />
                                                <label className="inline-flex items-center ml-2">
                                                    <input
                                                        type="radio"
                                                        name="default"
                                                        value={country.id}
                                                        className="text-orange-500 form-radio"
                                                    />
                                                    <span className="ml-2 text-gray-300">Default</span>
                                                </label>
                                            </td>
                                            <td className="px-4 py-2 text-left border-b border-gray-600">
                                                <button onClick={() => handleEdit(country.id, country.name)} className="text-red-500 hover:text-red-600 mr-2">
                                                    <i className="fas fa-edit"></i> {/* Edit Icon */}
                                                </button>
                                                |
                                                <button onClick={() => handleDelete(country.id)} className="text-red-500 hover:text-red- ml-2">
                                                    <i className="fas fa-trash"></i> {/* Delete Icon */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Component */}
                        <PaginationAdmin 
                            currentPage={currentPage} 
                            totalEntries={countries.length} 
                            entriesPerPage={countriesPerPage} 
                            onPageChange={(newPage) => setCurrentPage(newPage)} 
                        />
                    </section>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default CmsCountry;
