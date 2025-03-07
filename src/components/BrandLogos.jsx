"use client";

// import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { motion } from "framer-motion";

// const animation = { duration: 20000, easing: (t) => t };

const logos = [
  "/images/brandlogos/1.png",
  "/images/brandlogos/2.png",
  "/images/brandlogos/3.png",
  "/images/brandlogos/4.png",
  "/images/brandlogos/5.png",
  "/images/brandlogos/6.png",
];

const BrandLogos = () => {
  // const [sliderRef] = useKeenSlider({
  //   loop: true,
  //   renderMode: "performance",
  //   drag: false,
  //   slides: {
  //     perView: 2,
  //     origin: "center",
  //     spacing: 20,
  //   },
  //   breakpoints: {
  //     "(min-width: 1024px)": {
  //       slides: {
  //         perView: 6,
  //         origin: "center",
  //         spacing: 20,
  //       },
  //     },
  //   },
  //   created(s) {
  //     s.moveToIdx(5, true, animation);
  //   },
  //   updated(s) {
  //     s.moveToIdx(s.track.details.abs + 5, true, animation);
  //   },
  //   animationEnded(s) {
  //     s.moveToIdx(s.track.details.abs + 5, true, animation);
  //   },
  // });
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      // ref={sliderRef}
      // keen-slider
      className="bg-white py-6"
    >
      <div className="wrapper grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-2 md:grid-cols-6 items-center">
        {logos.map((image, i) => (
          // keen-slider__slide
          <div key={i} className="w-full flex justify-center">
            <Image
              src={image}
              alt="Logo"
              width={90}
              height={50}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BrandLogos;
