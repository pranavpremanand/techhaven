import { formatCreatedAt } from "@/utils/helper";
import Link from "next/link";

const TableRow = ({ orderId, date, customer, amount, isLinkVisible }) => {
  return (
    <tr>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        #{orderId}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatCreatedAt(date)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        ₹ {amount}
      </td>

      {isLinkVisible && (
        <td className="px-2 py-2 whitespace-nowrap text-sm text-white">
          <Link
            className="px-4 py-2 bg-primary hover:bg-black transition-all duration-200 rounded-sm"
            href={`/admin/orders/${orderId}`}
          >
            View
          </Link>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
