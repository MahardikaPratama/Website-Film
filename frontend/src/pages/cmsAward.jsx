import React, { useEffect, useState } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/footer';
import PaginationAdmin from '../components/PaginationAdmin';
import awardDataService from '../services/award.service'; // Import the Award Data Service
import countryDataService from '../services/country.service'; // Import the Country Data Service
import '../css/style.css';

const CmsAward = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [awards, setAwards] = useState([]);
    const [countries, setCountries] = useState([]); // State for country list
    const [formData, setFormData] = useState({ country: '', year: '', awards: '' });

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const fetchAwards = async () => {
        try {
            const response = await awardDataService.getAll();
            setAwards(response.data);
        } catch (error) {
            console.error("Error fetching awards:", error);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await countryDataService.getAll(); // Fetch country data
            setCountries(response.data); // Set the country list
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    useEffect(() => {
        fetchAwards();
        fetchCountries(); // Fetch countries on component mount
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await awardDataService.create(formData);
            setFormData({ country: '', year: '', awards: '' });
            fetchAwards();
        } catch (error) {
            console.error("Error creating award:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await awardDataService.delete(id);
            fetchAwards();
        } catch (error) {
            console.error("Error deleting award:", error);
        }
    };

    // Function to get country name by ID
    const getCountryName = (countryId) => {
        const country = countries.find(c => c.country_id === countryId); // Find the country by ID
        return country ? country.country_name : 'Unknown'; // Return the country name or 'Unknown'
    };

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-gray-900">
            <div className="flex flex-col flex-1 md:flex-row">
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
                    {/* Form to add a new award */}
                    <form className="flex flex-col w-full p-4 mb-6 space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                            <div className="flex flex-col w-full md:w-1/3">
                                <label htmlFor="country" className="block font-medium text-gray-300">Country</label>
                                <input 
                                    type="text" 
                                    id="country" 
                                    name="country" 
                                    value={formData.country} 
                                    onChange={handleChange} 
                                    className="block w-full p-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-orange-500" 
                                />
                            </div>
                            <div className="flex flex-col w-full md:w-1/3">
                                <label htmlFor="year" className="block font-medium text-gray-300">Year</label>
                                <input 
                                    type="text" 
                                    id="year" 
                                    name="year" 
                                    value={formData.year} 
                                    onChange={handleChange} 
                                    className="block w-full p-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-orange-500" 
                                />
                            </div>
                            <div className="flex flex-col w-full md:w-1/3">
                                <label htmlFor="awards" className="block font-medium text-gray-300">Award</label>
                                <input 
                                    type="text" 
                                    id="awards" 
                                    name="awards"
                                    value={formData.awards} 
                                    onChange={handleChange} 
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

                    {/* Section for award management */}
                    <section className="container p-4 mx-full bg-gray-800 rounded-md shadow-md md:p-14">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-300 bg-gray-800">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-600">#</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Country</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Year</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Awards</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {awards.map((award, index) => (
                                        <tr key={award.award_id} className="bg-gray-800 odd:bg-gray-700">
                                            <td className="px-4 py-2 border-b border-gray-600">{index + 1}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{getCountryName(award.country_id)}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{award.year}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{award.award_name}</td>
                                            <td className="px-4 py-2 text-left border-b border-gray-600">
                                                <button onClick={() => handleDelete(award.award_id)} className="text-red-500 hover:text-red-600 mr-2">
                                                    <i className="fas fa-trash"></i> {/* Delete Icon */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    {/* Pagination Component */}
                    <PaginationAdmin 
                        currentPage={1} 
                        totalEntries={awards.length} 
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
