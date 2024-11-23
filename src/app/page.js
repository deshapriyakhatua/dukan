import Image from "next/image";
import styles from "./page.module.css";
import SimpleCarousel from "@/components/home/simpleCarousel/SimpleCarousel";
import SingleBanner from "@/components/home/singleBanner/SingleBanner";
import ProductsSection from "@/components/home/productsSection/ProductsSection";
import CarouselTextImage from "@/components/home/carouselTextImage/CarouselTextImage";
import BannerCards from "@/components/home/bannerCards/BannerCards";
import SingleBannerProduct from "@/components/home/singleBannerProduct/SingleBannerProduct";
import StyledBanner from "@/components/home/styledBanner/StyledBanner";
import GridBanners from "@/components/home/gridBanners/GridBanners";
import BannerTag from "@/components/home/bannerTag/BannerTag";
import BannerProduct from "@/components/home/bannerProduct/BannerProduct";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <SimpleCarousel />
      <SingleBanner />
      <ProductsSection />
      <BannerProduct />
      <CarouselTextImage />
      <BannerCards />
      <SingleBannerProduct />
      <ProductsSection />
      <StyledBanner />
      <GridBanners />
      <BannerTag />
      <ProductsSection />
    </div>
  );
}
