import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import userDataService from '../services/user.service';

const LoginPage = () => {
    //Hook untuk navigasi
    const navigate = useNavigate();
    // State untuk mengatur visibilitas password
    const [showPassword, setShowPassword] = useState(false);
    // Fungsi untuk mengubah visibilitas password saat checkbox diubah
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // Fungsi untuk menangani tombol login ke cms-drama
    const handleLogin = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            // Panggil method login dari userDataService
            const response = await userDataService.login({ email, password });

            // Simpan token ke localStorage jika login berhasil
            localStorage.setItem('token', response.data.token); 
            
            // Navigasi ke halaman CMS
            navigate('/cms-drama');
        } catch (error) {
            // Menampilkan pesan error jika login gagal
            if (error.response && error.response.status === 401) {
                alert('Login failed. Please check your credentials.');
            } else {
                alert('An error occurred. Please try again later.');
            }
        }
    };


    return (
        // Wrapper utama untuk halaman login, menempatkan konten di tengah layar
        <div className="flex items-center justify-center min-h-screen text-gray-300 bg-gray-900">
            {/* Kontainer utama untuk form login dan gambar ilustrasi */}
            <div className="flex flex-col w-full max-w-lg bg-gray-800 rounded-lg shadow-lg md:flex-row md:max-w-4xl">
                
                {/* Bagian form login */}
                <div className="w-full p-6 md:w-1/2 md:px-8 lg:px-12">
                    <h2 className="mb-4 text-xl font-bold text-center text-white">Login</h2>
                    
                    {/* Form untuk login */}
                    <form className="px-4">
                        
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
                                    id="password" 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    placeholder="Password" 
                                    required
                                    className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                                />
                                
                                {/* Checkbox untuk menampilkan atau menyembunyikan password */}
                                <div className="flex mt-4">
                                    <input 
                                        id="togglePasswordCheckbox" 
                                        type="checkbox" 
                                        checked={showPassword} 
                                        onChange={togglePasswordVisibility}
                                        className="shrink-0 mt-0.5 border-gray-700 rounded text-orange-500 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-gray-800" 
                                    />
                                    <label htmlFor="togglePasswordCheckbox" className="ml-3 text-sm text-gray-400">Show password</label>
                                </div>
                            </div>
                        </div>                

                        {/* Tombol login */}
                        <div className="mb-3">
                            <button 
                                type="button" 
                                id="loginButton"
                                className="w-full p-2 text-sm font-semibold text-white transition bg-orange-600 rounded-lg hover:bg-orange-700"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                        
                        {/* Separator antara login biasa dan login dengan Google */}
                        <div className="flex items-center justify-center mb-3">
                            <div className="w-full border-t border-gray-200"></div>
                            <span className="mx-2 text-xs text-gray-300">OR</span>
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        
                        {/* Tombol login dengan Google */}
                        <div className="mb-3">
                            <button 
                                type="button" 
                                id="googleLogin"
                                className="flex items-center justify-center w-full p-2 text-sm font-semibold text-black transition bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                <img 
                                    src="https://pluspng.com/img-png/google-adwords-logo-vector-png-google-favicon-2015-vector-google-developers-logo-vector-512.png" 
                                    alt="Google Logo" 
                                    className="w-4 h-4 mr-2" 
                                />
                                Login with Google
                            </button>
                        </div>
                        
                        {/* Link untuk reset password */}
                        <div className="text-center">
                            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
                        </div>
                        
                        {/* Link untuk register akun baru */}
                        <div className="mt-2 text-center">
                            <span className="text-sm text-gray-400">Don't have an account?</span>
                            <a href="/register" className="text-sm text-blue-600 hover:underline">Register</a>
                        </div>            
                    </form>
                </div>

                {/* Ilustrasi Gambar */}
                <div className="hidden w-full p-6 md:block md:w-1/2">
                    <img 
                        src="https://th.bing.com/th/id/OIP.h8qCr42qmI2JNiJJSh5EBQHaEK?rs=1&pid=ImgDetMain" 
                        alt="Ilustrasi Login" 
                        className="object-contain w-full h-full" 
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
