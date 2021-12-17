import React from "react";
import { FaPhoneAlt, FaPrint, FaMailBulk } from "react-icons/fa";
import Pict from "../assets/about-pic.png";
const AboutUs = () => {
  return (
    <div className="about-bottom">
      <div className="about-container">
        <div className="cont1">
          {" "}
          <p>QUI SOMMES NOUS</p>
          <h1>A propos de nous</h1>
          <p>
            La spécifité de la société EXPERT, baseé sur la qualité d’écoute et
            le partenariat, s’attache à metriser les concepte avancés des
            produits qu’elle distribue .
          </p>
          <div className="socials">
            <div className="social-row">
              <FaPhoneAlt /> <p>00216 75 22 06 96</p>
            </div>
            <div className="social-row">
              <FaPrint /> <p>00216 75 22 06 96</p>
            </div>
            <div className="social-row">
              <FaMailBulk /> <p>00216 75 22 06 96</p>
            </div>
          </div>
        </div>

        <img src={Pict} alt="" />
      </div>
      <div className="bottom-content">
        <h1 style={{ fontSize: "32px", color: "white", marginBottom: "50px" }}>
          Services & equipements industriels
        </h1>

        <div className="bottom-cont">
          <div className="b-cont">
            <div className="b-row">
              <h1>1</h1>
              <p>Assistance D’achat</p>
            </div>
            <p>
              Vous souhaitez déleguer vos achats de materiel électrique ou
              equipements industriels , Consultez-nous pour définir un accord
              cadre .{" "}
            </p>
          </div>
          <div className="b-cont">
            <div className="b-row">
              <h1>2</h1>
              <p>Gestion de Parc Produit</p>
            </div>
            <p>
              Nous proposons des solutions clé en main pour externaliser la
              gestion de vos stocks de matériel .
            </p>
          </div>{" "}
          <div className="b-cont">
            <div className="b-row">
              <h1>3</h1>
              <p>Service Apres Vente</p>
            </div>
            <p>Tous nos produits bénéficient de la garantie constructeur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
