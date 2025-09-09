import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";


const ProductDetailPage = ({ access, superuser, onLogout }) => {
    const { category,product_name } = useParams(); 
    const [productDetail, setProductDetail] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
         const fetchProduct = async () => {
           try {
             const res = await axios.get(
               `http://localhost:8000/api/productdetail/${category}/${product_name}/`
             );
             setProductDetail(res.data); //API returns array
             console.log(res.data);
           } catch (err) {
             setError("Failed to load product");
           } finally {
             setLoading(false);
           }
         };
         fetchProduct();
       }, [category,product_name]);

       console.log("data1",productDetail)

    if (loading) return <p className="text-center mt-10">Loading product...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (productDetail.length === 0)
        return <p className="text-center text-gray-600">No products found.</p>;
  return (
    <>
        <Header access={access} superuser={superuser} onLogout={onLogout} />
        <div className="px-6 py-10 max-w-6xl mx-auto">
        <div key={productDetail.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <img
            src={`http://localhost:8000${productDetail.product_image}`}
            alt={productDetail.product_name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{productDetail.product_name}</h1>
            <p className="text-2xl font-semibold text-blue-600 mt-4">
              ₹{productDetail.price}
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
    </div> 
    <Footer/>
    </>  
  );
}

export default ProductDetailPage
