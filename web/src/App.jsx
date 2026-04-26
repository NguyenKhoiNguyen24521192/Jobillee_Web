import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import PromotionsPage from './pages/PromotionsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import StoresPage from './pages/StoresPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CareersPage from './pages/CareersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;