import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  
  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    deliveryMethod: "standard",
    paymentMethod: "cod",
  });

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleCheckout = (e) => {
    e.preventDefault();
    console.log("Checkout Data:", formData);
    navigate("/payment"); // Redirect to fake payment page
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      
      {/* Checkout Form */}
      <form onSubmit={handleCheckout} className="bg-white p-6 shadow-md rounded-lg">
        
        {/* Address Details */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        {/* Delivery Options */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Delivery Options</h3>
          <select
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="standard">Standard (5-7 Days) - Free</option>
            <option value="express">Express (2-3 Days) - $5</option>
          </select>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="creditCard">Credit/Debit Card</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;
