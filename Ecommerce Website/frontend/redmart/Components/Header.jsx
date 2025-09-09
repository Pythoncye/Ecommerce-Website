// src/Components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogIn, UserPlus, HelpCircle, Search, LogOut } from "lucide-react";
import logo from "../image/logo.png";

const HeaderButton = ({ icon: Icon, label, onClick, link }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-1 hover:text-blue-500"
  >
    <Icon size={18} />
    {link ? (
      <Link to={link}>
        <span className="hidden sm:inline">{label}</span>
      </Link>
    ) : (
      <span className="hidden sm:inline">{label}</span>
    )}
  </button>
);

const Header = ({ access, superuser, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  const suggestions = [
    "Rice","Oil","Snacks","Baby Diapers","Shampoo","Detergent",
    "Chocolates","Soft Drinks","Toys","Medicines",
  ];

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Header Top */}
      <header className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-3 mb-3 md:mb-0">
          <img src={logo} alt="REDMART Logo" className="h-14 w-14 rounded-full" />
          <h1 className="text-xl font-bold text-blue-600">REDMART</h1>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="bg-transparent outline-none px-3 w-full text-sm"
            />
          </div>

          {showSuggestions && searchQuery && (
            <ul className="absolute bg-white border mt-2 w-full rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onMouseDown={() => {
                      setSearchQuery(item);
                      setShowSuggestions(false);
                    }}
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 text-sm">No results</li>
              )}
            </ul>
          )}
        </div>

        {/* Right Menu */}
        <div className="flex items-center space-x-4 mt-3 md:mt-0">
          <HeaderButton icon={HelpCircle} label="Help Line" />
          {access ? (
            <>
              <HeaderButton icon={LogOut} label="Logout" onClick={handleLogout} />
              {superuser && <HeaderButton icon={UserPlus} label="Admin Register" link="/adminregister" />}
              <HeaderButton icon={ShoppingCart} label="Cart" />
            </>
          ) : (
            <>
              <HeaderButton icon={LogIn} label="Login" link="/login" />
              <HeaderButton icon={UserPlus} label="Register" link="/register" />
              <HeaderButton icon={ShoppingCart} label="Cart" />
            </>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
        <ul className="flex space-x-6 font-medium">
          <Link to='/'><li className="hover:underline cursor-pointer">Home</li></Link>
          <li className="hover:underline cursor-pointer">Flash Sale</li>
          <li className="hover:underline cursor-pointer">All Brands</li>
          <li className="hover:underline cursor-pointer">All Categories</li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
