"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";

const slides = [
  {
    title: "Latest Smartphones",
    description: "Explore the newest smartphones from top brands",
    image: "slide1.jpeg",
  },
  {
    title: "High-Performance Laptops",
    description: "Work and game with powerful laptops",
    image: "slide2.jpg",
  },
  {
    title: "Noise-Cancelling Headphones",
    description: "Experience music like never before",
    image: "slide3.jpg",
  },
];

export default function HomeSlider() {
  const router = useRouter();

  return (
    <div className="w-full h-[650px] relative group">
      {/* Custom navigation arrows */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 z-20 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg border border-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </div>

      <div className="swiper-button-next-custom absolute right-4 top-1/2 z-20 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg border border-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full rounded-2xl overflow-hidden shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-[650px] flex items-center justify-center text-white"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Subtle black gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>

              {/* Additional subtle gradients for depth */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 text-center px-6 max-w-3xl">
                <h2 className="text-5xl font-bold mb-6 tracking-tight animate-fade-in-up">
                  {slide.title}
                </h2>

                <p className="text-xl mb-8 font-light max-w-2xl mx-auto opacity-95 leading-relaxed">
                  {slide.description}
                </p>

                <button
                  onClick={() => router.push("/products")}
                  className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
                >
                  <span>Shop Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination */}
      <div className="custom-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2"></div>

      <style jsx global>{`
        .custom-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .custom-bullet-active {
          background: white;
          transform: scale(1.3);
        }

        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
        }

        .swiper-pagination-bullet-active {
          background: white;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
