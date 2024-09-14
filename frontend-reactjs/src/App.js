import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import CmsDrama from './pages/cmsDrama';
import CmsCountry from './pages/cmsCountry';
import CmsAward from './pages/cmsAward';
import CmsGenre from './pages/cmsGenre';
import CmsActor from './pages/cmsActor';
import CmsComment from './pages/cmsComment';
import CmsUsers from './pages/cmsUsers';
import CmsDramaInput from './pages/cmsDramaInput';
import './css/index.css';
import '../src/css/comment.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/cms-drama" element={<CmsDrama />} />
        <Route path="/cms-country" element={<CmsCountry />} />
        <Route path="/cms-awards" element={<CmsAward />} />
        <Route path="/cms-genres" element={<CmsGenre />} />
        <Route path="/cms-actors" element={<CmsActor />} />
        <Route path="/cms-comments" element={<CmsComment />} />
        <Route path="/cms-users" element={<CmsUsers />} />
        <Route path="/cms-drama-input" element={<CmsDramaInput />} />
      </Routes>
    </Router>
  );
}

export default App;
