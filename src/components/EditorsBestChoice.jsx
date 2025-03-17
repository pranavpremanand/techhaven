import Heading from "./Heading";
import ProductCardItem2 from "./ProductCardItem2";

const EditorsBestChoice = () => {
  return (
    <div className="section-py">
      <div className="wrapper">
        <Heading title="Editor's best choice" />
        <div className="pt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {products.map((item) => (
            <ProductCardItem2 key={item.id} item={item} />
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
