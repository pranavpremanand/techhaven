"use client";

import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { motion } from "framer-motion";
import ZoomImage from "./ZoomImage";
import { productImages } from "@/content/constant";

const SliderWithThumbnails = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const [thumbnailRef, thumbnail] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 3,
      spacing: 10,
      origin: "center",
    },
    breakpoints: {
      "(min-width: 450px)": {
        slides: {
          perView: 3,
          spacing: 15,
          origin: "center",
        },
      },
    },
  });

  useEffect(() => {
    if (thumbnail.current) {
      thumbnail.current.moveToIdx(currentSlide);
    }
  }, [currentSlide, thumbnail]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full"
    >
      {/* Main Slider */}
      <div ref={sliderRef} className="keen-slider w-full">
        {productImages.images.map((image, index) => (
          <div
            key={index}
            className="keen-slider__slide rounded-xl overflow-visible sm:aspect-video lg:aspect-auto flex justify-center bg-primary/10"
          >
            <ZoomImage image={image}/>
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-4 sm:gap-6 w-full">
        <button
          onClick={() => slider.current?.prev()}
          className="bg-white text-primary p-2 rounded-md w-10 h-10 flex justify-center items-center"
        >
          <PiCaretLeftBold size={20} />
        </button>
        <div ref={thumbnailRef} className="keen-slider w-full">
          {productImages.images.map((image, index) => (
            <div
              key={index}
              className={`keen-slider__slide aspect-square overflow-hidden rounded-lg cursor-pointer ${
                currentSlide === index ? "border border-primary" : ""
              }`}
              onClick={() => slider.current?.moveToIdx(index)}
            >
              <img
                src={image}
                alt={image}
                className="object-contain aspect-square"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => slider.current?.next()}
          className="bg-white text-primary p-2 rounded-md w-10 h-10 flex justify-center items-center"
        >
          <PiCaretRightBold size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default SliderWithThumbnails;