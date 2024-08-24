// import React from "react";
// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";
// import { homeCarouselData } from "./HomeCaroselData";
// import { useNavigate } from "react-router-dom";

// const handleDragStart = (e) => e.preventDefault();

// const HomeCarousel = () => {
//   const navigate = useNavigate();
//   const item = homeCarouselData.map((item) => (
//     <img
//       className="cursor-pointer"
//       onClick={() => navigate(item.path)}
//       src={item.image}
//       alt=""
//       onDragStart={handleDragStart}
//       role="presentation"
//     />
//   ));
//   return (
//     <AliceCarousel
//       mouseTracking
//       items={item}
//       autoPlay
//       infinite
//       autoPlayInterval={2000}
//       disableButtonsControls
//     />

//   );
// };

// export default HomeCarousel;

import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";
import "../Carousel/Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const navigate = useNavigate();
  const item = homeCarouselData.map((item) => (
    <img
      className="cursor-pointer"
      onClick={() => navigate(item.path)}
      src={item.image}
      alt=""
      onDragStart={handleDragStart}
      role="presentation"
    />
  ));
  return (
    <>
      <AliceCarousel
        mouseTracking
        items={item}
        autoPlay
        infinite //imgaes move automatically
        autoPlayInterval={2000} //autoplay interval is in miliseconds
        disableButtonsControls
      />

      <h1 id="handcraft">Handcrafted In India</h1>
    </>
  );
};

export default HomeCarousel;
