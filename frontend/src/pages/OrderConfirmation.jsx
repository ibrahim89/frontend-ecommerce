import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        {/* Confirmation Icon & Title */}
        <div className="flex flex-col items-center">
          <span className="text-5xl">🎉</span>
          <h2 className="text-green-600 text-2xl font-bold mt-3">Order Confirmed!</h2>
          <p className="text-gray-600 mt-1">Thank you for your purchase.</p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 p-4 rounded-md mt-6 text-left space-y-2">
          <p className="text-gray-700 flex items-center gap-2">
            📦 <span>Order Number:</span> <span className="font-semibold">707457</span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            💰 <span>Total Amount:</span> <span className="font-semibold">$1299.99</span>
          </p>
        </div>

        {/* Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
