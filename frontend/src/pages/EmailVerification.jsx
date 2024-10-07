import React, { useState } from "react";

const EmailVerification = () => {
    const [isSent, setIsSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleResendVerification = () => {
        // Simulasi pengiriman ulang link verifikasi email
        setIsSent(true);
        setErrorMessage('');
        alert("Link verifikasi telah dikirim ulang ke email Anda.");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="flex flex-col w-full max-w-lg bg-gray-800 rounded-lg shadow-lg md:flex-row md:max-w-4xl">
                {/* Konten Verifikasi Email */}
                <div className="w-full p-6 md:w-1/2 md:px-8 lg:px-12">
                    <h2 className="mb-4 text-xl font-bold text-center text-white">Verifikasi Email</h2>
                    <p className="mb-4 text-sm text-center text-gray-300">
                        Kami telah mengirimkan link verifikasi ke email Anda. Silakan cek inbox dan klik link untuk memverifikasi akun Anda.
                    </p>
                    {isSent && (
                        <p className="mb-4 text-sm text-center text-green-400">
                            Link verifikasi telah dikirim ke email Anda. Silakan periksa kotak masuk Anda.
                        </p>
                    )}
                    {errorMessage && (
                        <p className="mb-4 text-sm text-center text-red-400">
                            {errorMessage}
                        </p>
                    )}
                    <div className="mb-3">
                        <button
                            type="button"
                            id="resendVerificationButton"
                            onClick={handleResendVerification}
                            className="w-full p-2 text-sm font-semibold text-white transition bg-orange-600 rounded-lg hover:bg-orange-700"
                        >
                            Kirim Ulang Link Verifikasi
                        </button>
                    </div>
                    <div className="text-center">
                        <a href="/login" className="text-sm text-blue-400 hover:underline">Kembali ke Login</a>
                    </div>
                </div>

                {/* Ilustrasi Gambar */}
                <div className="hidden w-full p-6 md:block md:w-1/2">
                    <img
                        src="https://th.bing.com/th/id/OIP.h8qCr42qmI2JNiJJSh5EBQHaEK?rs=1&pid=ImgDetMain"
                        alt="Ilustrasi Verifikasi Email"
                        className="object-contain w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
