import React from "react";
import Hero from "../../components/Layout/Hero";
import FeaturedImg from "../../components/products/FeaturedImg";
import BestSellerImg from "../../components/products/BestSellerImg";
import BottomProductLinks from "../../components/products/BottomProductLinks";
import BestSeller from "../../components/products/BestSeller";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedImg />
      <BestSellerImg />
      <BestSeller />
      <BottomProductLinks />
    </div>
  );
};

export default Home;
