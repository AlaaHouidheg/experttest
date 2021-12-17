import React, { useEffect, useState } from "react";
import "./Product.css";

import axios from "axios";
import { IoSearchSharp } from "react-icons/io5";

const ProductList = () => {
  const [product, setproduct] = useState([]);
  useEffect(async () => {
    const dataproduct = await axios
      .get("/api/post/allpost")
      .then((res) => setproduct(res.data.posts));
  }, []);
  return (
    <div style={{ marginBottom: "100px" }}>
      <div className="product-list">
        {product.slice(3, 11).map((el) => (
          <div className="product">
            <img src={el?.url} alt={el?.title} />
            <div className="product-body">
              <h1>{el.title}</h1>
              <p>{el.body} </p>

              <button>See more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
