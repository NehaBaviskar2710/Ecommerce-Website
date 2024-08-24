import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { shop_by_category } from "../Data/Home/ShopByCategory";
import { trending_now } from "../Data/Home/TrendingNow";
import { new_collections } from "../Data/Home/NewCollections";
import { new_arrivals } from "../Data/Home/NewArrivals";
import { shop_by_material } from "../Data/Home/ShopByMaterial";
import { shop_by_art } from "../Data/Home/ShopByArt";

const Homepage = () => {

  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
      <HomeProductSection data={shop_by_category} section={"Shop By Category"} />
        <HomeProductSection data={trending_now} section={"Trending Now"} />
        <HomeProductSection data={new_collections} section={"New Collections"} />
        <HomeProductSection data={new_arrivals} section={"New Arrivals"} />
        <HomeProductSection data={shop_by_art} section={"Shop By Art"} />
        <HomeProductSection data={shop_by_material} section={"Shop By Material"} />
      </div>

      
    </div>
  );
};

export default Homepage;
