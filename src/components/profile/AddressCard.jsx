"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const AddressCard = ({ address, onSetDefault, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={`p-4 rounded-lg border ${
        address.isDefault ? "bg-white text-black" : "bg-gray-700 text-white"
      }`}
    >
      <div className="space-y-2">
        <p className="font-semibold">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>
          {address.city}, {address.state}, {address.pinCode}
        </p>
        <p>{address.phone}</p>
        <p>{address.email}</p>
      </div>
      <div className="mt-4 flex gap-2">
        {!address.isDefault && (
          <button
            onClick={() => onSetDefault(address)}
            className="text-sm text-primary hover:underline"
          >
            Set as Default
          </button>
        )}
        {/* <button
          onClick={() => onEdit(address)}
          className="text-sm text-yellow-500 hover:underline"
        >
          Edit
        </button> */}
        {/* <button
          onClick={() => onDelete(address._id)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default AddressCard;
