import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const searchQuery = useSelector((state) => state.search.query);
  const selectedCategory = useSelector((state) => state.search.selectedCategory);
  console.log("Redux Category State:", selectedCategory);
  useEffect(() => {
    // Fetch products from a public API (DummyJSON)
    fetch("https://fakestoreapi.com/products?limit=12")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Products inside ProductList:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products inside ProductList:", error));
  }, []);

  
    // Filter logic
    const filteredProducts = products.filter((product) => {
    const productCategory = product.category.trim().toLowerCase();
    const selected = selectedCategory.trim().toLowerCase();
  
    console.log("Comparing:", productCategory, "vs", selected); // Debugging
  
    return product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
           (selected === "all" || productCategory === selected);
  });
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        { }
        {filteredProducts.length > 0 ? (filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="mt-2 text-lg font-semibold text-center">
              <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline">
                {product.title}
              </Link>
            </h2>
          </div>
        ))) : (<p>No products found</p>)}
      </div>
    </div>
  );
};

export default ProductList;
