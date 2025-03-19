"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddressCard from "@/components/profile/AddressCard";
import AddressForm from "@/components/profile/AddressForm";
import {
  createUserAddress,
  getUserAddresses,
  setDefaultAddress,
} from "@/utils/api";

const page = () => {
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const res = await getUserAddresses();
      if (res.data.address) {
        setAddresses(res.data.address.addresses);
      }
    } catch (err) {
      toast.error("Failed to fetch addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Set default address
  const handleSetDefault = async (data) => {
    try {
      await setDefaultAddress({ addressId: data._id, ...data });
      toast.success("Default address updated");
      fetchAddresses(); // Refresh addresses
    } catch (err) {
      toast.error("Failed to set default address");
    }
  };

  // Add new address
  const handleAddAddress = async (data) => {
    try {
      await createUserAddress(data);
      toast.success("Address added successfully");
      setIsAdding(false);
      fetchAddresses(); // Refresh addresses
    } catch (err) {
      toast.error("Failed to add address");
    }
  };

  // Edit address
  const handleEditAddress = async (data) => {
    try {
      //   await updateAddress(editingAddress._id, data);
      toast.success("Address updated successfully");
      setEditingAddress(null);
      fetchAddresses(); // Refresh addresses
    } catch (err) {
      toast.error("Failed to update address");
    }
  };

  // Delete address
  const handleDeleteAddress = async (id) => {
    try {
      //   await deleteAddress(id);
      toast.success("Address deleted successfully");
      fetchAddresses(); // Refresh addresses
    } catch (err) {
      toast.error("Failed to delete address");
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Manage Addresses</h1>

      {/* Add New Address Button */}
      <button onClick={() => setIsAdding(true)} className="primary-btn">
        Add New Address
      </button>

      {/* Add New Address Form */}
      {isAdding && (
        <AddressForm
          onSubmit={handleAddAddress}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {/* Edit Address Form */}
      {editingAddress && (
        <AddressForm
          onSubmit={handleEditAddress}
          onCancel={() => setEditingAddress(null)}
          defaultValues={editingAddress}
        />
      )}

      {/* Display Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            onSetDefault={handleSetDefault}
            onEdit={setEditingAddress}
            onDelete={handleDeleteAddress}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
