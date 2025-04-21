import Link from "next/link";

// OrderCard component for mobile view
const OrderCard = ({ orderId, date, customer, amount, isLinkVisible }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="font-medium text-gray-900">{customer}</p>
          <p className="text-sm text-gray-500">#{orderId}</p>
        </div>
        <span className="text-sm font-medium text-gray-900">{amount}</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">{date}</div>
      {isLinkVisible && (
        <div className="mt-4 flex justify-end">
          <Link
            href={`/admin/orders//${orderId}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
