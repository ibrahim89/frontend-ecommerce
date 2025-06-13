import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} className="w-96 h-96 object-cover" />
      <p className="mt-4 text-gray-700">{product.description}</p>
      <p className="mt-2 font-semibold">Price: ${product.price}</p>

       {/* Buttons */}
       <div className="mt-4 flex space-x-4">
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add to Cart
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md">
          Buy Now
        </button>
        </div>
    </div>
  );
};

export default ProductDetails;
