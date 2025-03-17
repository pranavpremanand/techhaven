import ProductCardItem2 from "@/components/ProductCardItem2";
import { featuredProducts } from "@/content/constant";

const page = () => {
  return (
    <div className="space-y-5">
      <h2 className="text-[1.05rem] font-medium">Wishlist</h2>
      <div className="grid grid-cols-3 gap-5">
        {featuredProducts.slice(0, 3).map((item) => (
          <ProductCardItem2 key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default page;
