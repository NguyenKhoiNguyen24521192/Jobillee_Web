import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button.jsx';
import JobilleeLogo from './JobilleeLogo.jsx';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('VN');
  const location = useLocation();

  const navItems = [
    { label: 'TRANG CHỦ', path: '/' },
    { label: 'VỀ JOBILLEE', path: '/about' },
    { label: 'THỰC ĐƠN', path: '/menu' },
    { label: 'KHUYẾN MÃI', path: '/promotions' },
    { label: 'DỊCH VỤ', path: '/services' },
    { label: 'TIN TỨC', path: '/news' },
    { label: 'CỬA HÀNG', path: '/stores' },
    { label: 'LIÊN HỆ', path: '/contact' },
    { label: 'TUYỂN DỤNG', path: '/careers' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Yellow Bar */}
      <div className="bg-[rgb(var(--jobillee-yellow))] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Globe className="h-4 w-4 text-[rgb(var(--jobillee-dark))]" />
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('VN')}
                className={`text-sm font-semibold transition-all duration-200 ${
                  language === 'VN' 
                    ? 'text-[rgb(var(--jobillee-dark))]' 
                    : 'text-gray-600 hover:text-[rgb(var(--jobillee-dark))]'
                }`}
              >
                VN
              </button>
              <span className="text-gray-600">|</span>
              <button
                onClick={() => setLanguage('EN')}
                className={`text-sm font-semibold transition-all duration-200 ${
                  language === 'EN' 
                    ? 'text-[rgb(var(--jobillee-dark))]' 
                    : 'text-gray-600 hover:text-[rgb(var(--jobillee-dark))]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
          <Link to="/login">
            <Button 
              size="sm"
              className="bg-[rgb(var(--jobillee-dark))] hover:bg-[rgb(var(--jobillee-dark))]/90 text-white text-xs font-semibold transition-all duration-200 active:scale-95"
            >
              ĐĂNG NHẬP / ĐĂNG KÝ
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Red Header */}
      <div className="bg-[rgb(var(--jobillee-red))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <JobilleeLogo className="h-12 w-12" color="white" />
              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                JOBILLEE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg ${
                    isActive(item.path)
                      ? 'bg-[rgb(var(--jobillee-pink))]/30 text-white'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-lg ${
                    isActive(item.path)
                      ? 'bg-[rgb(var(--jobillee-pink))]/30 text-white'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;