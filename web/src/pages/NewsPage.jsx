import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';

function NewsPage() {
  const newsArticles = [
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/069f4ea5fc086935a53944c08576d803.png',
      title: 'Ra mắt combo gia đình mới - Tiết kiệm hơn, ngon hơn',
      description: 'Jobillee tự hào giới thiệu combo gia đình mới với giá ưu đãi đặc biệt. Bao gồm 8 miếng gà rán, 2 phần khoai tây lớn, 2 nước ngọt và 1 món tráng miệng.',
      date: '15/04/2026'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/f08319569cfa954a05cad939a4079a2b.png',
      title: 'Khuyến mãi tháng 4 - Giảm giá lên đến 30%',
      description: 'Chào mừng tháng 4, Jobillee dành tặng khách hàng chương trình khuyến mãi hấp dẫn với mức giảm giá lên đến 30% cho các combo và món ăn yêu thích.',
      date: '10/04/2026'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/284eca44fa6db807fc3fc627d9657ec5.png',
      title: 'Khai trương cửa hàng thứ 50 tại Hà Nội',
      description: 'Jobillee chính thức khai trương cửa hàng thứ 50 tại số 123 Đường Láng, Hà Nội. Nhiều ưu đãi đặc biệt dành cho khách hàng trong tuần khai trương.',
      date: '05/04/2026'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/0f7a44313a54339ff0ba16dd765eb263.png',
      title: 'Món mới: Mỳ Ý sốt bò băm - Hương vị Ý đích thực',
      description: 'Khám phá món mỳ Ý sốt bò băm mới với công thức đặc biệt, kết hợp hương vị truyền thống Ý và khẩu vị người Việt.',
      date: '01/04/2026'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/6ff5ddda09795af25ef5702fbab7fc89.png',
      title: 'Jobillee Kids Club - Câu lạc bộ dành cho bé yêu',
      description: 'Chương trình Jobillee Kids Club chính thức ra mắt với nhiều hoạt động thú vị, quà tặng hấp dẫn và ưu đãi đặc biệt cho các bé.',
      date: '28/03/2026'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/cc77e2b7-31d8-4f71-b490-d96eab13f289/f08319569cfa954a05cad939a4079a2b.png',
      title: 'Cam kết chất lượng - An toàn thực phẩm',
      description: 'Jobillee cam kết sử dụng 100% nguyên liệu tươi ngon, đảm bảo vệ sinh an toàn thực phẩm theo tiêu chuẩn quốc tế.',
      date: '20/03/2026'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tin tức - Jobillee Vietnam</title>
        <meta name="description" content="Cập nhật tin tức mới nhất về Jobillee: khuyến mãi, món mới, sự kiện và các hoạt động của chuỗi nhà hàng." />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[300px] bg-gradient-to-r from-[rgb(var(--jobillee-red))] to-[rgb(var(--jobillee-red))]/80">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                TIN TỨC
              </h1>
              <p className="text-xl md:text-2xl">
                Cập nhật mới nhất từ Jobillee
              </p>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article, index) => (
                <NewsCard
                  key={index}
                  image={article.image}
                  title={article.title}
                  description={article.description}
                  date={article.date}
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

export default NewsPage;