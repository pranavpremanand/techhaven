import { featuredProducts } from "@/content/constant";
import Link from "next/link";

// Simulated async function to fetch order details (Replace with real API/database call)
async function getOrderDetails(orderId) {
  const orders = [
    {
      id: "96459761",
      status: "Yet to be Delivered",
      date: "Dec 30, 2019 07:52",
      total: "$80",
      products: [
        {
          name: "Nike Shoes",
          price: "$50",
          quantity: 2,
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Adidas Shirt",
          price: "$30",
          quantity: 1,
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      id: "71667167",
      status: "Delivered",
      date: "Dec 7, 2019 23:26",
      total: "$70",
      products: [
        {
          name: "Puma Sneakers",
          price: "$40",
          quantity: 1,
          image: featuredProducts[0].image,
        },
        {
          name: "Reebok Shorts",
          price: "$30",
          quantity: 1,
          image: featuredProducts[1].image,
        },
      ],
    },
  ];

  return orders.find((order) => order.id === orderId) || null;
}

export default async function page({ params }) {
  const order = await getOrderDetails("71667167");
  //   const order = await getOrderDetails(params.id);

  if (!order) {
    return <p className="text-center text-red-500">Order not found.</p>;
  }

  return (
    <div className="wrapper header-height pt-7">
      <div className="bg-white/15 rounded-lg shadow-md p-5">
        <h2 className="text-xl font-medium mb-4">Order Details</h2>
        <div className="space-y-2">
          <p className="text-sm font-medium">Order ID: {order.id}</p>
          <p
            className={`text-sm ${
              order.status === "Delivered"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            Status: {order.status}
          </p>
          <p className="text-sm">Date: {order.date}</p>
          <p className="text-sm font-medium">Total: {order.total}</p>
        </div>

        <h3 className="text-lg font-medium mt-6">Products</h3>
        <div className="mt-2 border rounded-lg p-4 bg-white/10">
          {order.products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded-md object-contain"
                />
                <p className="text-sm">
                  {product.name} (x{product.quantity})
                </p>
              </div>
              <p className="text-sm font-medium">{product.price}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-5 mt-6 items-center">
          <button className="primary-btn !px-3 !py-2 hover:!translate-y-0">
            Download Invoice
          </button>
          <Link href="/profile/orders" className="link text-sm">
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}