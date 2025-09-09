import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import special from "../image/special.png";
import product from "../image/product.png";

const Home_page = ({ access, superuser, onLogout }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/category/");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const productSections = [
    { title: "NEW Products", img: product },
    { title: "Featured Products", img: product },
    { title: "Best Seller", img: product },
  ];

  return (
    <div className="font-sans">
      <Header access={access} superuser={superuser} onLogout={onLogout} />

      {/* Special Offers */}
      <section className="my-6">
        <img src={special} alt="Special Offer" className="w-full rounded-xl shadow-lg" />
      </section>

      {/* Categories */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Shop by Category</h2>
        {loading && <p>Loading categories...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/${cat.name}`}>
              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-3 hover:scale-105 transition">
                <img
                  src={cat.category_image}
                  alt={cat.name}
                  className="h-24 w-24 object-cover rounded-full"
                />
                <p className="mt-2 text-sm font-medium text-gray-700 text-center">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Sections */}
      {productSections.map((section, idx) => (
        <section key={idx} className="px-6 py-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">{section.title}</h2>
          <hr className="mb-5" />
          <div className="flex justify-center">
            <img src={section.img} alt={section.title} className="rounded-lg shadow-lg" />
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
};

export default Home_page;
