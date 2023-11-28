import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from "@mui/material";
import { products } from "./productdata";
import "./slide.css";
import { getProducts } from "../../api";
import { useNavigate } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slide = ({ title }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const result = await getProducts();
      setProducts(result.data);
    };
    getAllProducts();
  }, []);
  return (
    <div className="products_section">
      <div className="products_deal">
        <h3> {title} </h3>
        <button className="view_btn">View All</button>
      </div>

      <Divider />

      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={true}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        showDots={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {products.map((e) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              className="product_items"
              onClick={() => navigate(`/product/${e._id}`)}
            >
              <div className="product_img">
                <img
                  style={{ width: 400, height: 300 }}
                  src={e.photos}
                  alt="productitem"
                />
              </div>
              <p classNamme="products_name">{e.title} </p>
              {/* <p className="products_offer">{e.discount}</p>
              <p className="products_explore">{e.tagline}</p> */}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slide;
