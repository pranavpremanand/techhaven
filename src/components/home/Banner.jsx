"use client";

import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../Header";
import ReactPlayer from "react-player";
import { createUrlParam } from "@/utils/helper";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        {/* min-h-[90vh] sm:min-h-[80vh] */}
        <div ref={sliderRef} className="keen-slider md:min-h-[80vh]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="keen-slider__slide relative">
              <div className="relative text-white inset-0 h-full w-full">
                {isClient && (
                  <ReactPlayer
                    url="/videos/banner.mp4"
                    loop
                    muted
                    width="100%"
                    height="100%"
                    playsinline
                    playing
                    className="absolute top-0 left-0 w-full h-full object-cover object-top sm:object-top"
                    pip={false}
                    config={{
                      file: {
                        attributes: {
                          style: {
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          },
                          controlsList: "nodownload noplaybackrate",
                          disablePictureInPicture: true,
                          playsInline: true,
                        },
                      },
                    }}
                  />
                )}
                {/* <Image
                  src="/images/home-banner.webp"
                  width={1920}
                  height={1080}
                  alt="hero"
                  className="absolute top-0 left-0 w-full h-full object-cover object-top sm:object-top"
                  priority
                /> */}
                {/* bg-white/60 md:bg-white/15  */}
                <div className="absolute top-0 left-0 w-full h-full"></div>
                <div className="wrapper h-full flex items-center relative">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl space-y-4 py-8"
                  >
                    <p className="text-lg text-primary font-bold">
                      HOT PRODUCTS
                    </p>
                    {/* <h1 className="text1">Welcome to ARK For Ease</h1> */}
                    <p className="font-semibold text2 text-[#c6c6c6] leading-tight">
                      Your One-Stop Shop for the Latest Electronics,
                      Accessories, and Gadgets
                    </p>
                    {/* <p className="">Start from</p>
                    <h2 className="text2 font-medium pb-3">₹2990</h2> */}
                    <Link
                      href="/products/electronics-and-gadgets"
                      className="w-[12rem] primary-btn uppercase"
                    >
                      Shop Now
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center py-8 gap-2"
      >
        {[1, 2, 3].map((i, index) => (
          <div
            key={i}
            className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "w-[3rem] bg-white" : "w-3 bg-primary"
            }`}
            onClick={() => instanceRef.current?.moveToIdx(index)} // Navigate to the clicked slide
          />
        ))}
      </motion.div>

      <div className="wrapper w-full lg:hidden block">
        <CategoriesSlider />
      </div>
    </section>
  );
};

export default Banner;

// categories slider
const CategoriesSlider = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 3,
        spacing: 10,
      },
      breakpoints: {
        "(max-width: 370px)": {
          slides: {
            perView: 1,
            spacing: 15,
          },
        },
        "(min-width: 371px)": {
          slides: {
            perView: 2,
            spacing: 15,
          },
        },
        "(min-width: 650px)": {
          slides: {
            perView: 3,
            spacing: 15,
          },
        },
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
          }, 1000);
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
    <div
      // ref={sliderRef}
      className="pb-3 grid grid-cols-2 gap-3"
      // keen-slider
    >
      {categories.map((category, i) => {
        const isLastItem = i === categories.length - 1;
        const isLastItemEven = isLastItem && i % 2 === 0;
        return (
          <Link
            key={category.name}
            href={`${category.url}`}
            // keen-slider__slide
            className={`${
              isLastItemEven && "col-span-2 w-1/2 mx-auto"
            } p-2 bg-[#242424] rounded-md text-center w-full h-full mx-auto flex items-center justify-center link text-sm min-h-[4rem]`}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
};
