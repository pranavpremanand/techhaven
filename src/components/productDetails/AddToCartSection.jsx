"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const AddToCartSection = () => {
  const [quantity, setQuantity] = useState(1);

  // decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // increment quantity
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }} className="grid sm:grid-cols-2 items-center gap-8">
      <div className="flex items-center gap-5">
        Quantity
        <div className="flex items-center gap-5">
          <button
            onClick={decrementQuantity}
            className="w-10 h-10 flex items-center justify-center rounded-md bg-primary text-white"
          >
            <FaMinus size={15} />
          </button>
          <span className="text-xl w-[1rem] text-center">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="w-10 h-10 flex items-center justify-center rounded-md bg-primary text-white"
          >
            <FaPlus size={15} />
          </button>
        </div>
      </div>
      <button className="primary-btn">Add to Cart</button>
    </motion.div>
  );
};

export default AddToCartSection;
