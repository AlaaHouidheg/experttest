import React, { useEffect, useState } from "react";
import Product from "./Product";
import "./Product.css";
import P1 from "../assets/p1.png";
import P2 from "../assets/p2.png";
import P3 from "../assets/p3.png";
import P4 from "../assets/p4.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";

const ProductList = () => {
  const [product, setproduct] = useState([]);
  const [search, setsearch] = useState("");
  const [cat, setcat] = useState("");
  const params = useParams();

  useEffect(async () => {
    const dataproduct = await axios
      .get("/api/post/allpost")
      .then((res) => setproduct(res.data.posts));
  }, []);

  return (
    <div style={{ marginBottom: "100px" }}>
      <div className="category-search">
        <p>{product.length} results found in 5ms</p>
        <div className="cat-search">
          <input
            type="text"
            placeholder="Search hear"
            onChange={(e) => setsearch(e.target.value)}
          />
          <IoSearchSharp size={24} />
        </div>
      </div>
      <div className="product-list">
        {product.length ? (
          product
            .filter(
              (el) =>
                el.category == params.key &&
                el.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((el) => (
              <div className="product">
                <img src={el?.url} alt={el?.title} />
                <div className="product-body">
                  <h1>{el.title}</h1>
                  <p>{el.body} </p>
                  <Link to={`/product/${el._id}`}>
                    <button>See more</button>
                  </Link>
                </div>
              </div>
            ))
        ) : (
          <img
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--QHuL8Cy7--/c_imagga_scale,f_auto,fl_progressive,h_420,q_66,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/cmidlcq1jvb4o8gg76a6.gif"
            alt=""
            style={{
              display: "block",
              margin: "0 auto",
              width: "200px",
              marginTop: "100px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
