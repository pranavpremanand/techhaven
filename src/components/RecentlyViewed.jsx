import Heading from "./Heading";
import ProductCardItem from "./ProductCardItem";

const RecentlyViewed = () => {
  const products =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("products"))) ||
    [];

  if (products.length === 0) return null;
  return (
    <section className="section-py !pt-0 !pb-0">
      <div className="wrapper space-y-8">
        <Heading title="New Arrivals" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((item) => (
            <ProductCardItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
