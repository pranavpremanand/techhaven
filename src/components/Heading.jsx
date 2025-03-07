"use client";

import { motion } from "framer-motion";

const Heading = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="wrapper grid grid-cols-[1fr,4fr,1fr] sm:grid-cols-[1fr,1fr,1fr] items-center gap-4"
    >
      <div className="h-[1px] w-full bg-white rounded-full"></div>
      <h3 className="text3 font-semibold uppercase text-center">{title}</h3>
      <div className="h-[1px] w-full bg-white rounded-full"></div>
    </motion.div>
  );
};

export default Heading;
