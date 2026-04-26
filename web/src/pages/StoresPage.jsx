import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Clock } from 'lucide-react';

function StoresPage() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const stores = [
    {
      name: 'Jobillee Nguyễn Huệ',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      phone: '028-3822-1234',
      hours: '8:00 - 22:00',
      city: 'hcm',
      district: 'q1'
    },
    {
      name: 'Jobillee Lê Lợi',
      address: '65 Lê Lợi, Quận 1, TP.HCM',
      phone: '028-3822-5678',
      hours: '8:00 - 22:00',
      city: 'hcm',
      district: 'q1'
    },
    {
      name: 'Jobillee Võ Văn Tần',
      address: '234 Võ Văn Tần, Quận 3, TP.HCM',
      phone: '028-3933-4567',
      hours: '8:00 - 22:00',
      city: 'hcm',
      district: 'q3'
    },
    {
      name: 'Jobillee Hoàng Kiếm',
      address: '45 Tràng Tiền, Hoàn Kiếm, Hà Nội',
      phone: '024-3826-1234',
      hours: '8:00 - 22:00',
      city: 'hn',
      district: 'hk'
    },
    {
      name: 'Jobillee Cầu Giấy',
      address: '78 Xuân Thủy, Cầu Giấy, Hà Nội',
      phone: '024-3754-5678',
      hours: '8:00 - 22:00',
      city: 'hn',
      district: 'cg'
    }
  ];

  const filteredStores = stores.filter(store => {
    if (selectedCity && store.city !== selectedCity) return false;
    if (selectedDistrict && store.district !== selectedDistrict) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Cửa hàng - Jobillee Vietnam</title>
        <meta name="description" content="Tìm cửa hàng Jobillee gần bạn. Hơn 100 cửa hàng trên toàn quốc với địa chỉ, số điện thoại và giờ mở cửa." />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[300px] bg-gradient-to-r from-[rgb(var(--jobillee-orange))] to-[rgb(var(--jobillee-yellow))]">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="text-[rgb(var(--jobillee-dark))]">
              <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                CỬA HÀNG
              </h1>
              <p className="text-xl md:text-2xl">
                Tìm Jobillee gần bạn
              </p>
            </div>
          </div>
        </section>

        {/* Store Locator */}
        <section className="py-20 bg-[rgb(var(--jobillee-cream))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <h2 className="text-3xl font-bold text-[rgb(var(--jobillee-red))] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Tìm cửa hàng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tỉnh thành" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                    <SelectItem value="hn">Hà Nội</SelectItem>
                    <SelectItem value="dn">Đà Nẵng</SelectItem>
                    <SelectItem value="ct">Cần Thơ</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quận huyện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="q1">Quận 1</SelectItem>
                    <SelectItem value="q3">Quận 3</SelectItem>
                    <SelectItem value="hk">Hoàn Kiếm</SelectItem>
                    <SelectItem value="cg">Cầu Giấy</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-[rgb(var(--jobillee-red))] hover:bg-[rgb(var(--jobillee-red))]/90 text-white font-bold transition-all duration-200 active:scale-98"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>

            {/* Store List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-[rgb(var(--jobillee-dark))] mb-4">
                    {store.name}
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-[rgb(var(--jobillee-red))] flex-shrink-0 mt-0.5" />
                      <p>{store.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-[rgb(var(--jobillee-red))] flex-shrink-0" />
                      <a href={`tel:${store.phone}`} className="hover:text-[rgb(var(--jobillee-red))]">
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[rgb(var(--jobillee-red))] flex-shrink-0" />
                      <p>{store.hours}</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[rgb(var(--jobillee-red))] hover:bg-[rgb(var(--jobillee-red))]/90 text-white font-semibold transition-all duration-200 active:scale-98"
                  >
                    Xem chỉ đường
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

export default StoresPage;