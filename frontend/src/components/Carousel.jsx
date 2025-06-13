import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  
  const images = [
    //"https://m.media-amazon.com/images/I/71z3cgVnDIL._SX3000_.jpg",  // Electronics Sale
    "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg",  // Fashion Deals
    //"https://m.media-amazon.com/images/I/71cvXpO2dHL._SX3000_.jpg",  // Home & Kitchen
    "https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg",  // Mobile Phones Offer
    "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg"   // Laptop Discounts
  ];
  

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-[400px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index}`} className="w-full h-[400px] object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
