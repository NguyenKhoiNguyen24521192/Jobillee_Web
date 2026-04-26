import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Store, PartyPopper, Users, ShoppingBag } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Carousel from '../components/Carousel.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import NewsCard from '../components/NewsCard.jsx';
import { Button } from '../components/ui/button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';

function HomePage() {
  const navigate = useNavigate();

  const menuProducts = [
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/f08319569cfa954a05cad939a4079a2b.png',
      title: 'Gà giòn vui vẻ',
      buttonText: 'GÀ GIÒN VUI VẺ'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/284eca44fa6db807fc3fc627d9657ec5.png',
      title: 'Gà sốt cay',
      buttonText: 'GÀ SỐT CAY'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/0f7a44313a54339ff0ba16dd765eb263.png',
      title: 'Mỳ Ý sốt bò băm',
      buttonText: 'MỲ Ý SỐT BÒ BẰM'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/069f4ea5fc086935a53944c08576d803.png',
      title: 'Món tráng miệng',
      buttonText: 'MÓN TRĂNG MIỆNG'
    }
  ];

  const services = [
    {
      icon: Store,
      title: 'LẤY TẠI CỬA HÀNG',
      description: 'Đặt hàng trước và lấy tại cửa hàng gần nhất, tiết kiệm thời gian chờ đợi.'
    },
    {
      icon: PartyPopper,
      title: 'ĐẶT TIỆC SINH NHẬT',
      description: 'Tổ chức tiệc sinh nhật vui vẻ với thực đơn đa dạng và không gian ấm cúng.'
    },
    {
      icon: Users,
      title: 'JOBILLEE KIDS CLUB',
      description: 'Câu lạc bộ dành cho trẻ em với nhiều hoạt động thú vị và quà tặng hấp dẫn.'
    },
    {
      icon: ShoppingBag,
      title: 'ĐƠN HÀNG LỚN',
      description: 'Phục vụ đơn hàng lớn cho sự kiện, tiệc công ty với giá ưu đãi đặc biệt.'
    }
  ];

  const newsArticles = [
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/069f4ea5fc086935a53944c08576d803.png',
      title: 'Ra mắt combo gia đình mới',
      description: 'Thưởng thức bữa ăn trọn vẹn cùng gia đình với combo ưu đãi đặc biệt.',
      date: '15/04/2026'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/f08319569cfa954a05cad939a4079a2b.png',
      title: 'Khuyến mãi tháng 4',
      description: 'Giảm giá lên đến 30% cho các món ăn yêu thích trong tháng 4.',
      date: '10/04/2026'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/284eca44fa6db807fc3fc627d9657ec5.png',
      title: 'Cửa hàng mới tại Hà Nội',
      description: 'Jobillee chính thức khai trương cửa hàng thứ 50 tại Hà Nội.',
      date: '05/04/2026'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/0f7a44313a54339ff0ba16dd765eb263.png',
      title: 'Món mới: Mỳ Ý sốt bò băm',
      description: 'Khám phá hương vị mới lạ với món mỳ Ý sốt bò băm đặc biệt.',
      date: '01/04/2026'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Jobillee Vietnam - Nhà hàng gà rán & thức ăn nhanh</title>
        <meta name="description" content="Jobillee Vietnam - Chuỗi nhà hàng gà rán và thức ăn nhanh hàng đầu Việt Nam. Giao hàng tận nơi, đặt hàng online, khuyến mãi hấp dẫn." />
      </Helmet>

      <Header />

      <main>
        {/* Hero Carousel Section */}
        <section>
          <Carousel />
        </section>

        {/* Menu Section */}
        <section className="bg-[rgb(var(--jobillee-red))] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              {/* Left Panel */}
              <div className="lg:col-span-1 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  ĂN GÌ<br />HÔM NAY
                </h2>
                <p className="text-lg opacity-90">
                  Khám phá thực đơn đa dạng của Jobillee
                </p>
              </div>

              {/* Product Cards */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {menuProducts.map((product, index) => (
                  <ProductCard
                    key={index}
                    image={product.image}
                    title={product.title}
                    buttonText={product.buttonText}
                    onClick={() => navigate('/menu')}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-[rgb(var(--jobillee-cream))] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--jobillee-red))] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  JOBILLEE,<br />XIN CHÀO
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Jobillee Việt Nam tự hào là chuỗi nhà hàng gà rán và thức ăn nhanh hàng đầu, 
                  mang đến cho khách hàng những món ăn ngon, chất lượng cao với giá cả phải chăng.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Với hơn 50 cửa hàng trên toàn quốc, chúng tôi cam kết phục vụ bạn những 
                  khoảnh khắc ẩm thực tuyệt vời cùng gia đình và bạn bè.
                </p>
                <Button 
                  size="lg"
                  onClick={() => navigate('/about')}
                  className="bg-[rgb(var(--jobillee-red))] hover:bg-[rgb(var(--jobillee-red))]/90 text-white font-bold px-8 transition-all duration-200 active:scale-95"
                >
                  ĐẶT HÀNG
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/284eca44fa6db807fc3fc627d9657ec5.png"
                  alt="Jobillee delicious fried chicken"
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-[rgb(var(--jobillee-cream))] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--jobillee-red))] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                DỊCH VỤ
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                TẬN HƯỞNG NHỮNG KHOẢNH KHẮC TRONG VEN CÙNG JOBILLEE
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  onClick={() => navigate('/services')}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Store Locator Section */}
        <section className="bg-[rgb(var(--jobillee-orange))] py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12" style={{ fontFamily: 'Outfit, sans-serif' }}>
              TÌM CỬA HÀNG
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn tỉnh thành" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                    <SelectItem value="hn">Hà Nội</SelectItem>
                    <SelectItem value="dn">Đà Nẵng</SelectItem>
                    <SelectItem value="ct">Cần Thơ</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn quận huyện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1">Quận 1</SelectItem>
                    <SelectItem value="q2">Quận 2</SelectItem>
                    <SelectItem value="q3">Quận 3</SelectItem>
                    <SelectItem value="q4">Quận 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                size="lg"
                onClick={() => navigate('/stores')}
                className="w-full bg-[rgb(var(--jobillee-red))] hover:bg-[rgb(var(--jobillee-red))]/90 text-white font-bold transition-all duration-200 active:scale-98"
              >
                TÌM KIẾM
              </Button>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--jobillee-red))] text-center mb-12" style={{ fontFamily: 'Outfit, sans-serif' }}>
              TIN TỨC
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsArticles.map((article, index) => (
                <NewsCard
                  key={index}
                  image={article.image}
                  title={article.title}
                  description={article.description}
                  date={article.date}
                  onClick={() => navigate('/news')}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;