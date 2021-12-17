import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutUs from "./screens/AboutUs";
import Category from "./screens/Category";
import Home from "./screens/Home";
import ProductDet from "./screens/ProductDet";

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ marginTop: "70px" }}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/category/:key" element={<Category />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/product/:id" element={<ProductDet />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
