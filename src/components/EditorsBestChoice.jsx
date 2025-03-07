import Image from "next/image";
import Heading from "./Heading";
import RatingStars from "./StarRating";
import Link from "next/link";

const EditorsBestChoice = () => {
  return (
    <div className="section-py">
      <div className="wrapper">
        <Heading title="Editor's best choice" />
        <div className="pt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="grid md:grid-cols-2 gap-2 sm:gap-5 mb-6"
            >
              <Link
                href="/products/1"
                className="group hover:brightness-75 transition-all duration-300 aspect-square md:h-full w-full rounded-2xl bg-white overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="object-contain aspect-square"
                />
              </Link>
              <div className="space-y-2 flex flex-col justify-between py-1">
                <Link href="/products/1" className="text-lg link">
                  {item.title}
                </Link>
                <div className="sm:space-y-3">
                  <p className="text-primary text-lg">₹{item.price}</p>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={item.rating} size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorsBestChoice;

const products = [
  {
    id: 1,
    title: "Fitness and activity Tracker",
    image: "/images/editors-best-choice/1.webp",
    price: 3300,
    rating: 4,
  },
  {
    id: 2,
    title: "Xbox White Joystick",
    image: "/images/editors-best-choice/2.webp",
    price: 9800,
    rating: 5,
  },
  {
    id: 3,
    title: "Super Boost Speaker",
    image: "/images/editors-best-choice/3.webp",
    price: 3300,
    rating: 4,
  },
  {
    id: 4,
    title: "Smartphone 190 Megapixel",
    image: "/images/editors-best-choice/4.webp",
    price: 3300,
    rating: 4,
  },
  {
    id: 5,
    title: "Ice White Airpods",
    image: "/images/editors-best-choice/5.webp",
    price: 2300,
    rating: 4,
  },
  {
    id: 6,
    title: "Hazor Mouse Gaming",
    image: "/images/editors-best-choice/6.webp",
    price: 2100,
    rating: 4,
  },
  {
    id: 7,
    title: "Keyboard RGB and Mechanic",
    image: "/images/editors-best-choice/7.webp",
    price: 3300,
    rating: 4,
  },
  {
    id: 8,
    title: "Super Boost Headphones",
    image: "/images/editors-best-choice/8.webp",
    price: 3300,
    rating: 5,
  },
];
