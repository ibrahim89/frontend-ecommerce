import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearchQuery, setSelectedCategory } from "../store/slices/searchSlice";
import "./Header.css";


const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);
  const selectedCategory = useSelector((state) => state.search.selectedCategory);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
  };
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Products:", data); // Debugging API response
        // setProducts(data);

        // Extract unique categories dynamically from products
        const uniqueCategories = [
          "all",
          ...new Set(data.map((product) => product.category.trim().toLowerCase())),
        ];
        console.log("Extracted Categories:", uniqueCategories); // Debugging categories
        setCategories(uniqueCategories);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchQuery(e.target.value));  // Update Redux store
  };

  const handleCategoryChange = (e) => {
    console.log('selected category', e.target.value);
    dispatch(setSelectedCategory(e.target.value)); // Update Redux store
  };


  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          BarakahMart
        </Link>

        {/* Search Bar */}
        <div className="search-container">


          {/* Category Dropdown */}
          <select
            className="category-dropdown"
            value={selectedCategory} // Ensure it keeps the selected category
            onChange={handleCategoryChange}
          >
            <option value="all">ALL CATEGORIES</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.toUpperCase()}
              </option>
            ))}
          </select>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search for products..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="search-button">
              🔍
            </button>
          </div>
        </div>

        {/* Right Side: Login & Cart */}
        <div className="flex items-center space-x-6">
          {/* Login Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <FaUser size={20} />
              <span>{username ? username : "Login"}</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                {username ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      👤 {username}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
            <FaShoppingCart size={24} />
            {/* Cart Item Count (Optional) */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
