import Image from "next/image";
import Link from "next/link";

const FeaturedProductCardItem = ({ item }) => {
  return (
    <div className="group bg-primary rounded-2xl space-y-3 overflow-hidden">
      <div className="aspect-square flex justify-center items-center relative">
        <Image
          src={item.image}
          objectFit="cover"
          className="group-hover:scale-100 scale-90 group-hover:translate-y-3 transition-all duration-300 z-[1] relative"
          alt={item.title}
          width={350}
          height={350}
        />
        <div className="absolute h-full w-full inset-0 bg-white rounded-2xl aspect-square group-hover:scale-50 transition-all duration-300 z-0" />
      </div>
      <div className="p-5 flex flex-col items-center space-y-2">
        <p className="text-lg text-center">{item.title}</p>
        <p className="pb-3">
          <del className="text-gray-300">{item.price}</del> -{" "}
          <span className="text-white">{item.offerPrice}</span>
        </p>
        <Link
          href="/"
          className="uppercase underline underline-offset-4 text-white hover:text-black transition-all duration-300 tracking-wide"
        >
          Add to cart
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProductCardItem;
