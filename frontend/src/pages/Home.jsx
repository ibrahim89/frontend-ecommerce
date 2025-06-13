import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Carousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";
import { setSelectedCategory } from "../store/slices/searchSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState ([]);
  const searchQuery = useSelector((state) => state.search.query);
  const selectedCategory = useSelector((state) => state.search.selectedCategory || "all");

  // Fetch products dynamically
 useEffect(() => {
  fetch("https://fakestoreapi.com/products?limit=12")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data)
      const uniqueCategories = [
        "all",
        ...new Set(data.map((product) => product.category.trim().toLowerCase())),
      ];
      setCategories(uniqueCategories);
    }).catch((err) => console.error("Error fetching products:", err));
}, []);

 // Filter products based on search query & selected category
 const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
  (selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase())
);

const dispatch = useDispatch();
const navigate = useNavigate();

const handleCategoryClick = (category) => {
  dispatch(setSelectedCategory(category)); // Update Redux store
  navigate("/products"); // Redirect to ProductList page
};

  return (
    <div className="container mx-auto p-4">
       {/* Carousel Section */}
       <Carousel />

      {/* Categories Section */}
      <h2 className="text-2xl font-semibold mt-8">Shop by Categories</h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {categories.map((category, index) => (
          <Link key={index} to="/products"  onClick={() => dispatch(setSelectedCategory(category))} >
            <div className="bg-gray-200 p-6 text-center rounded-lg shadow-md cursor-pointer hover:bg-gray-300">
              {category}
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Products Section */}
      <h2 className="text-2xl font-semibold mt-8">Featured Products</h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
      {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
              <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
              <h3 className="text-lg font-semibold mt-2">{product.title.slice(0, 20)}...</h3>
              <p className="text-gray-600">₹{product.price}</p>
              <Link to={`/product/${product.id}`}>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md w-full">
                  View Product
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}

      </div>

      {/* Special Offers Section */}
      <h2 className="text-2xl font-semibold mt-8">Special Offers</h2>
      <div className="bg-yellow-200 p-6 mt-4 rounded-lg text-center">
        <h3 className="text-xl font-bold">Limited Time Offer</h3>
        <p className="mt-2">Flat 20% Off on Electronics. Use Code: **SAVE20**</p>
      </div>
    </div>
  );
};

export default Home;
