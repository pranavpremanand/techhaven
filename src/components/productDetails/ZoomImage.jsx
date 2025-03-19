"use client";
import React, { useState } from "react";

const ZoomImage = ({ image }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: "0%", y: "0%" });
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = normal, 2 = zoomed in
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  const handleMouseMove = (event) => {
    if (zoomLevel === 1 && isHovered) {
      const { currentTarget } = event;
      const rect = currentTarget.getBoundingClientRect();

      // Calculate the cursor position relative to the container
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      setZoomPosition({ x: `${x}%`, y: `${y}%` });
      setIsZoomVisible(true);
    }
  };

  const handleMouseOut = () => {
    if (zoomLevel === 1) {
      setIsZoomVisible(false);
    }
  };

//   const handleClick = () => {
//     if (zoomLevel === 1) {
//       // Zoom in
//       setZoomLevel(2);
//       setIsZoomVisible(true);
//     } else {
//       // Zoom out
//       setZoomLevel(1);
//       setIsZoomVisible(false);
//     }
//   };

  const handleMouseEnter = () => {
    if (zoomLevel === 1) {
      setIsHovered(true);
      setIsZoomVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (zoomLevel === 1) {
      setIsHovered(false);
      setIsZoomVisible(false);
    }
  };

  return (
    <div
      id="imageZoom"
      className="relative cursor-zoom-in"
      style={{
        "--zoom-x": zoomPosition.x,
        "--zoom-y": zoomPosition.y,
        "--display": isZoomVisible ? "block" : "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    //   onClick={handleClick}
    >
      {/* Main Image */}
      <img
        src={image}
        alt="Zoomable Image"
        className="w-full h-full object-contain object-[0_0]"
      />

      {/* Zoom Overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-black bg-cover bg-no-repeat"
        style={{
          backgroundImage: `var(--url, url('${image}'))`,
          backgroundSize: zoomLevel === 2 ? "100%" : "150%",
          backgroundPosition:
            zoomLevel === 2 ? "center" : `var(--zoom-x) var(--zoom-y)`,
          opacity: isZoomVisible ? 1 : 0,
        }}
      />
    </div>
  );
};

export default ZoomImage;
