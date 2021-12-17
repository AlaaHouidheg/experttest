import React, { useEffect, useState } from "react";
import Cat1 from "../assets/cat-1.png";
import Cat2 from "../assets/cat2.png";
import Cat3 from "../assets/cat-3.png";
import Cat4 from "../assets/cat-4.png";
import Third from "../assets/Group 1000000844.png";
import { FaCircle } from "react-icons/fa";
import ProductListHome from "../components/ProductListeHome";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setcategories] = useState([]);

  useEffect(async () => {
    const datacategory = await axios
      .get("/api/category/all")
      .then((res) => setcategories(res.data.Categorys));
  }, []);
  return (
    <div className="home">
      <div className="landing">
        <div className="landing-description">
          <p>Sté-Expert</p>
          <h1>Service & equpements industriels</h1>
          <Link to="/about">
            {" "}
            <button>More</button>
          </Link>
        </div>
      </div>

      <div className="second">
        <div className="categories">
          {categories?.map((el) => (
            <div className="category">
              <h1>{el.title}</h1>
              <p>{el.body} </p>
              <Link to={`/category/${el.key}`}>
                <button>More</button>
              </Link>
              <img src={el.url} alt="" />
            </div>
          ))}
        </div>
        <div className="second-2">
          <h1 className="title">BEST SELLERS</h1>
          <ProductListHome />
        </div>
      </div>

      <div className="third">
        <div className="third-content">
          <p>Whats Expert</p>
          <h1>Pourquoi rejoindre notre communitée ?</h1>
          <p>
            La spécifité de la société EXPERT, baseé sur la qualité d’écoute et
            le partenariat, s’attache à metriser les concepte avancés des
            produits qu’elle distribue .
          </p>
          <ul>
            <li>
              <FaCircle color="#217BF4" /> Assistance D’achat
            </li>
            <li>
              <FaCircle color="#217BF4" /> Gestion de Parc Produit
            </li>
            <li>
              <FaCircle color="#217BF4" /> Service Apres Vent
            </li>
          </ul>
        </div>
        <img src={Third} alt="" />
      </div>
    </div>
  );
};

export default Home;
