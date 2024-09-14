import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const RegisterPage = () => {
    // State untuk mengatur visibilitas password dan confirm password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Fungsi untuk mengubah visibilitas password saat checkbox diubah
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Fungsi untuk mengubah visibilitas confirm password saat checkbox diubah
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        // Wrapper utama untuk halaman register, menempatkan konten di tengah layar
        <div className="flex items-center justify-center min-h-screen text-gray-300 bg-gray-900">
            {/* Kontainer utama untuk form register dan gambar ilustrasi */}
            <div className="flex flex-col w-full max-w-lg bg-gray-800 rounded-lg shadow-lg md:flex-row md:max-w-4xl">
                
                {/* Bagian form register */}
                <div className="w-full p-6 md:w-1/2 md:px-8 lg:px-12">
                    <h2 className="mb-4 text-xl font-bold text-center text-white">Register</h2>
                    
                    {/* Form untuk register */}
                    <form>
                        {/* Input untuk nama lengkap */}
                        <div className="mb-3">
                            <label htmlFor="name" className="block mb-1 text-sm font-semibold text-gray-400">Full Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="Full Name" 
                                required
                                className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                            />
                        </div>

                        {/* Input untuk email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-400">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Email" 
                                required
                                className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                            />
                        </div>

                        {/* Input untuk password dengan toggle visibilitas */}
                        <div className="mb-3">
                            <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-400">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    name="password" 
                                    placeholder="Password" 
                                    required
                                    className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                                />
                            </div>
                            <div className="flex items-center mt-4">
                                <input 
                                    id="togglePasswordCheckbox" 
                                    type="checkbox" 
                                    checked={showPassword} 
                                    onChange={togglePasswordVisibility}
                                    className="shrink-0 mt-0.5 border-gray-700 rounded text-orange-500 focus:ring-orange-500" 
                                />
                                <label htmlFor="togglePasswordCheckbox" className="ml-3 text-sm text-gray-400">Show password</label>
                            </div>
                        </div>

                        {/* Input untuk konfirmasi password dengan toggle visibilitas */}
                        <div className="mb-3">
                            <label htmlFor="confirm-password" className="block mb-1 text-sm font-semibold text-gray-400">Confirm Password</label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    id="confirm-password" 
                                    name="confirm-password" 
                                    placeholder="Confirm Password" 
                                    required
                                    className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                                />
                            </div>
                            <div className="flex items-center mt-4">
                                <input 
                                    id="toggleConfirmPasswordCheckbox" 
                                    type="checkbox" 
                                    checked={showConfirmPassword} 
                                    onChange={toggleConfirmPasswordVisibility}
                                    className="shrink-0 mt-0.5 border-gray-700 rounded text-orange-500 focus:ring-orange-500" 
                                />
                                <label htmlFor="toggleConfirmPasswordCheckbox" className="ml-3 text-sm text-gray-400">Show password</label>
                            </div>
                        </div>

                        {/* Tombol register */}
                        <div className="mb-3">
                            <button 
                                type="submit"
                                className="w-full p-2 text-sm font-semibold text-white transition bg-orange-600 rounded-lg hover:bg-orange-700"
                            >
                                Register
                            </button>
                        </div>

                        {/* Separator antara register biasa dan register dengan Google */}
                        <div className="flex items-center justify-center mb-3">
                            <div className="w-full border-t border-gray-200"></div>
                            <span className="mx-2 text-xs text-gray-300">OR</span>
                            <div className="w-full border-t border-gray-200"></div>
                        </div>

                        {/* Tombol register dengan Google */}
                        <div className="mb-3">
                            <button 
                                type="button"
                                className="flex items-center justify-center w-full p-2 text-sm font-semibold text-black transition bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                <img 
                                    src="https://pluspng.com/img-png/google-adwords-logo-vector-png-google-favicon-2015-vector-google-developers-logo-vector-512.png" 
                                    alt="Google Logo" 
                                    className="w-4 h-4 mr-2" 
                                />
                                Register with Google
                            </button>
                        </div>

                        {/* Link untuk login jika sudah memiliki akun */}
                        <div className="text-center">
                            <span className="text-sm text-gray-400">Already have an account?</span>
                            <a href="/login" className="text-sm text-blue-600 hover:underline">Login</a>
                        </div>
                    </form>
                </div>

                {/* Ilustrasi Gambar */}
                <div className="hidden w-full p-6 md:block md:w-1/2">
                    <img 
                        src="https://th.bing.com/th/id/OIP.h8qCr42qmI2JNiJJSh5EBQHaEK?rs=1&pid=ImgDetMain" 
                        alt="Ilustrasi Register" 
                        className="object-contain w-full h-full" 
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
