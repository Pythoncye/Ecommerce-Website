// src/Components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 px-8 py-10 mt-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <p className="text-sm">
            <b>Address:</b>
            <br />
            8-5-1, Kodurupadu, Nellore
            <br />
            Andhra Pradesh - 524314
          </p>
          <p className="mt-3">
            <b>Phone:</b>
            <br />
            <a href="tel:+918074807561" className="text-blue-400 hover:underline">
              +91 8074807561
            </a>
          </p>
          <p className="mt-3">
            <b>Email:</b>
            <br />
            <a href="mailto:helps.redmart@gmail.com" className="text-blue-400 hover:underline">
              helps.redmart@gmail.com
            </a>
          </p>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-lg font-semibold mb-3">My Account</h3>
          <ul className="space-y-2">
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><a href="#" className="hover:underline">Order History</a></li>
            <li><a href="#" className="hover:underline">My Wishlist</a></li>
            <li><a href="#" className="hover:underline">Track Order</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} RedMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
