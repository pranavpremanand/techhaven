"use client";

import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        origin: "center",
      },
      initial: 0, // Set the initial slide index
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel); // Update currentSlide on slide change
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <section className="header-height">
      <div className="">
        <div
          ref={sliderRef}
          className="keen-slider min-h-[90vh] sm:min-h-[80vh]"
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="keen-slider__slide relative">
              <Image
                src="/images/home-banner.webp"
                width={1920}
                height={1080}
                alt="hero"
                className="absolute top-0 left-0 w-full h-full object-cover object-top sm:object-top"
                priority
              />
              <div className="absolute bg-white/60 md:bg-white/20 text-black inset-0 h-full w-full">
                <div className="wrapper h-full flex items-center">
                  <div className="max-w-lg space-y-2">
                    <p className="text-lg text-primary font-bold">
                      HOT PRODUCTS
                    </p>
                    <h1 className="text1">Welcome to Techhaven</h1>
                    <p className="font-bold text-lg text-[#404040]">
                      Your One-Stop Shop for the Latest Electronics,
                      Accessories, and Gadgets
                    </p>
                    <p className="">Start from</p>
                    <h2 className="text2 font-medium pb-3">₹2990</h2>
                    <Link
                      href="/products"
                      className="w-[12rem] primary-btn uppercase"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center py-8 gap-2">
        {[1, 2, 3].map((i, index) => (
          <div
            key={i}
            className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "w-[3rem] bg-white" : "w-3 bg-primary"
            }`}
            onClick={() => instanceRef.current?.moveToIdx(index)} // Navigate to the clicked slide
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
