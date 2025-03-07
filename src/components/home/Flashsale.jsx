"use client";

import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Flashsale = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set the target end date for the countdown
  const targetDate = new Date("2025-03-25T23:59:59").getTime();

  // State to store the remaining time
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update the state
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If the countdown is over, clear the interval
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);
  return (
    <section className="section-py">
      <Heading title="Flash Sale today" />
      <div className="wrapper mt-9 grid sm:grid-cols-2 lg:grid-cols-[25%,1fr,1fr,1fr] gap-7">
        <div className="rounded-2xl overflow-hidden relative lg:h-[110%] aspect-[3/4] sm:aspect-auto">
          <div className="absolute bg-white/20 inset-0 w-full h-full flex flex-col justify-between gap-6 p-4">
            <h5 className="text-3xl font-semibold text-center pt-14 lg:pt-8">
              Up to 30% Off!
            </h5>
            <div className="space-y-3">
              <p className="text-center">Sale Ends In :</p>
              <div className="grid grid-cols-[1fr,auto,1fr,auto,1fr] items-center gap-2">
                {timeLeft.days > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="bg-black w-full aspect-square text-center flex flex-col items-center justify-center rounded-xl p-3">
                      <h4 className="text-xl font-bold">{timeLeft.days}</h4>
                      <p>Days</p>
                    </div>
                  </div>
                )}
                {timeLeft.days > 0 && (
                  <div className="space-y-2">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="bg-black w-full aspect-square text-center flex flex-col items-center justify-center rounded-xl p-3">
                    <h4 className="text-xl font-bold">{timeLeft.hours}</h4>
                    <p>Hrs</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-black w-full aspect-square text-center flex flex-col items-center justify-center rounded-xl p-3">
                    <h4 className="text-xl font-bold">{timeLeft.minutes}</h4>
                    <p>Mins</p>
                  </div>
                </div>
                {/* {timeLeft.days === 0 && (
                  <div className="space-y-2">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )} */}
                {/* {timeLeft.days === 0 && ( */}
                <div className="flex items-center gap-2 col-span-5">
                  <div className="bg-black w-full py-2 text-center flex flex-col items-center justify-center rounded-xl">
                    <h4 className="text-xl font-bold">{timeLeft.seconds}</h4>
                    <p>Sec</p>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
          {isClient && (
            <ReactPlayer
              url="/videos/flashsale-counter.mp4"
              loop
              muted
              width="100%"
              height="100%"
              playsinline
              playing
              className="w-full"
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
        </div>
        {products.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer hover:bg-primary group"
          >
            <Link
              href="/products/1"
              className="aspect-[3/3.2] w-full overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={450}
                className="object-cover w-full h-full group-hover:scale-110 transition-all duration-300"
              />
            </Link>
            <div className="p-5 flex flex-col items-center space-y-2">
              <p className="text-lg text-center">{item.title}</p>
              <p>
                <del>₹{item.price}</del> -{" "}
                <span className="text-primary group-hover:text-black">
                ₹{item.offerPrice}
                </span>
              </p>
              <div className="w-full pt-2">
                <div className="w-full flex justify-between">
                  <p>Available: {item.available}</p>
                  <p>Sold: {item.sold}</p>
                </div>
                <div className="mt-2 h-3 w-full bg-white rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-primary group-hover:bg-black"
                    style={{ width: `${80}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Flashsale;

const products = [
  {
    title: "Smartwatch",
    image: "/images/flashsale/1.webp",
    price: 2900,
    offerPrice: 1950,
    available: 18,
    sold: 20,
  },
  {
    title: "MacBook  M1",
    image: "/images/flashsale/2.png",
    price: 2900,
    offerPrice: 1950,
    available: 18,
    sold: 20,
  },
  {
    title: "Wireless Headphones",
    image: "/images/flashsale/3.webp",
    price: 2900,
    offerPrice: 1950,
    available: 18,
    sold: 20,
  },
];
