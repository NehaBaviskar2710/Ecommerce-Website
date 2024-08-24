//src/components/HomeSectioncard/HomeSectionCard.jsx
import React from "react";

import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = () => {
    navigate(`${product?.path}`);
    handleScrollToTop();
  };
  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3"
    >
      {/* h=height w=width */}
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product?.image || product?.imageUrl}
          alt={product?.title}
        />
      </div>

      <div className="p-4 ">
        {/* <h3 className="text-lg font-medium text-gray-900">
          {product?.brand || product?.title}
        </h3> */}
        <p className="mt-2 text-md text-500">{product?.title}</p>
      </div>
    </div>
  );
};

export default HomeProductCard;
