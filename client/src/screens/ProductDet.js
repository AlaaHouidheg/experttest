import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SendEmail from "../components/SendEmail";

const ProductDet = () => {
  const [products, setproducts] = useState([]);
  const params = useParams();
  useEffect(async () => {
    const dataproduct = await axios
      .get("/api/post/allpost")
      .then((res) => setproducts(res.data.posts));
  }, []);

  const product = products?.filter((el) => el._id == params.id);
  console.log(product);
  return (
    <div className="prod-detail">
      <div className="prod-det-container">
        <div className="prod-img">
          <img src={product[0]?.url} alt="" />
        </div>
        <div className="prod-content">
          <div className="content-container">
            <div className="prod-row">
              <h4>Marque :</h4> <p>{product[0] ? product[0].title : "  "}</p>
            </div>
            <div className="prod-row">
              <h4 style={{ marginRight: "10px", width: "200px " }}>
                Category :
              </h4>{" "}
              <p>{product[0] ? product[0].category : "  "}</p>
            </div>
            <div className="prod-row">
              <h4 style={{ marginRight: "10px", width: "200px " }}>
                description :
              </h4>{" "}
              <p>{product[0] ? product[0].body : "  "}</p>
            </div>

            <SendEmail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDet;
