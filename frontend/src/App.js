import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import CmsDrama from './pages/cmsDrama';
import CmsCountry from './pages/cmsCountry';
import CmsAward from './pages/cmsAward';
import CmsGenre from './pages/cmsGenre';
import CmsActor from './pages/cmsActor';
import CmsComment from './pages/cmsComment';
import CmsUsers from './pages/cmsUsers';
import CmsDramaInput from './pages/cmsDramaInput';
import EmailVerification from './pages/EmailVerification';
import EmailVerified from './pages/EmailVerified';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute'; 
import './css/index.css';
import '../src/css/comment.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Hanya admin yang bisa mengakses dashboard dan CMS */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} requiredRole="ADMIN" />} />
        <Route path="/cms-drama" element={<PrivateRoute element={<CmsDrama />} requiredRole="ADMIN" />} />
        <Route path="/cms-country" element={<PrivateRoute element={<CmsCountry />} requiredRole="ADMIN" />} />
        <Route path="/cms-awards" element={<PrivateRoute element={<CmsAward />} requiredRole="ADMIN" />} />
        <Route path="/cms-genres" element={<PrivateRoute element={<CmsGenre />} requiredRole="ADMIN" />} />
        <Route path="/cms-actors" element={<PrivateRoute element={<CmsActor />} requiredRole="ADMIN" />} />
        <Route path="/cms-comments" element={<PrivateRoute element={<CmsComment />} requiredRole="ADMIN" />} />
        <Route path="/cms-users" element={<PrivateRoute element={<CmsUsers />} requiredRole="ADMIN" />} />
        <Route path="/cms-drama-input" element={<PrivateRoute element={<CmsDramaInput />} requiredRole="ADMIN" />} />

        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
