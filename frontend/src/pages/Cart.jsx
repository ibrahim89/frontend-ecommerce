import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = totalPrice * 0.15; // Example: 15% discount
  const deliveryCharge = totalPrice > 500 ? 0 : 40; // Free delivery if total > 500
  const finalAmount = totalPrice - discount + deliveryCharge;

  return (
    <div className="container mx-auto p-4 grid grid-cols-12 gap-6">
      {/* Left Section (Cart Items) */}
      <div className="col-span-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Cart ({cartItems.length} items)</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex border-b py-4">
              {/* Product Image */}
              <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-cover" />

              {/* Product Details */}
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <p className="text-green-600">Delivery by Tomorrow</p>

                {/* Quantity Controls */}
                <div className="mt-2 flex items-center space-x-2">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-10 text-center border rounded"
                  />
                  <button
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    +
                  </button>
                </div>

                {/* Save & Remove Links */}
                <div className="mt-2 text-sm">
                  <button className="text-blue-600">SAVE FOR LATER</button> |{" "}
                  <button className="text-red-600" onClick={() => dispatch(removeFromCart(item.id))}>
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Place Order Button */}
        {cartItems.length > 0 && (
          <button onClick={() => navigate("/checkout")} className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md text-lg font-semibold">
            Proceed to Checkout
          </button>
        )}
      </div>

      {/* Right Section (Price Details) */}
      <div className="col-span-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold border-b pb-2">PRICE DETAILS</h2>
        <div className="mt-4 text-gray-700">
          <p className="flex justify-between">
            <span>Price ({cartItems.length} items):</span> <span>₹{totalPrice}</span>
          </p>
          <p className="flex justify-between text-green-600">
            <span>Discount:</span> <span>-₹{discount.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Delivery Charges:</span> <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between text-lg font-semibold">
            <span>Total Amount:</span> <span>₹{finalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
