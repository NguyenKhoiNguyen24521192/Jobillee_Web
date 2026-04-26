import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('chicken');

  const categories = [
    { id: 'chicken', name: 'Gà Rán' },
    { id: 'pasta', name: 'Mỳ Ý' },
    { id: 'burger', name: 'Burger' },
    { id: 'sides', name: 'Món Phụ' },
    { id: 'dessert', name: 'Tráng Miệng' },
    { id: 'drinks', name: 'Đồ Uống' }
  ];

  const menuItems = {
    chicken: [
      { name: 'Gà Giòn Vui Vẻ (2 miếng)', price: '45.000đ', description: 'Gà rán giòn tan với công thức độc quyền' },
      { name: 'Gà Giòn Vui Vẻ (4 miếng)', price: '85.000đ', description: 'Combo 4 miếng gà rán giòn ngon' },
      { name: 'Gà Sốt Cay', price: '52.000đ', description: 'Gà rán phủ sốt cay đặc biệt' },
      { name: 'Gà Sốt BBQ', price: '52.000đ', description: 'Gà rán phủ sốt BBQ thơm ngon' },
      { name: 'Combo Gia Đình', price: '189.000đ', description: '8 miếng gà + 2 khoai tây + 2 nước ngọt' }
    ],
    pasta: [
      { name: 'Mỳ Ý Sốt Bò Băm', price: '42.000đ', description: 'Mỳ Ý sốt cà chua với bò băm thơm ngon' },
      { name: 'Mỳ Ý Sốt Kem', price: '42.000đ', description: 'Mỳ Ý sốt kem béo ngậy' },
      { name: 'Mỳ Ý Hải Sản', price: '55.000đ', description: 'Mỳ Ý với hải sản tươi ngon' }
    ],
    burger: [
      { name: 'Burger Gà Giòn', price: '38.000đ', description: 'Burger với gà rán giòn tan' },
      { name: 'Burger Bò Phô Mai', price: '45.000đ', description: 'Burger bò với phô mai tan chảy' },
      { name: 'Burger Tôm', price: '42.000đ', description: 'Burger với tôm tươi ngon' }
    ],
    sides: [
      { name: 'Khoai Tây Chiên', price: '25.000đ', description: 'Khoai tây chiên giòn rụm' },
      { name: 'Gà Popcorn', price: '32.000đ', description: 'Gà viên nhỏ giòn tan' },
      { name: 'Salad Rau Củ', price: '28.000đ', description: 'Salad rau củ tươi mát' }
    ],
    dessert: [
      { name: 'Bánh Táo', price: '18.000đ', description: 'Bánh táo nướng thơm ngon' },
      { name: 'Kem Sundae', price: '15.000đ', description: 'Kem vani với topping đa dạng' },
      { name: 'Bánh Chocolate', price: '22.000đ', description: 'Bánh chocolate tan chảy' }
    ],
    drinks: [
      { name: 'Pepsi', price: '15.000đ', description: 'Nước ngọt có ga' },
      { name: 'Trà Đào', price: '18.000đ', description: 'Trà đào cam sả' },
      { name: 'Nước Cam', price: '20.000đ', description: 'Nước cam tươi' }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Thực đơn - Jobillee Vietnam</title>
        <meta name="description" content="Khám phá thực đơn đa dạng của Jobillee với gà rán giòn tan, mỳ Ý, burger và nhiều món ngon khác. Đặt hàng ngay!" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[300px] bg-gradient-to-r from-[rgb(var(--jobillee-red))] to-[rgb(var(--jobillee-red))]/80">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                THỰC ĐƠN
              </h1>
              <p className="text-xl md:text-2xl">
                Khám phá hương vị tuyệt vời
              </p>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-20 bg-[rgb(var(--jobillee-cream))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 font-semibold transition-all duration-200 active:scale-95 ${
                    activeCategory === category.id
                      ? 'bg-[rgb(var(--jobillee-red))] hover:bg-[rgb(var(--jobillee-red))]/90 text-white'
                      : 'bg-white hover:bg-gray-100 text-[rgb(var(--jobillee-dark))]'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems[activeCategory].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-[rgb(var(--jobillee-dark))]">
                      {item.name}
                    </h3>
                    <span className="text-xl font-bold text-[rgb(var(--jobillee-red))]">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <Button 
                    className="w-full bg-[rgb(var(--jobillee-red))] hover:bg-[rgb(var(--jobillee-red))]/90 text-white font-semibold transition-all duration-200 active:scale-98"
                  >
                    Thêm vào giỏ
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default MenuPage;