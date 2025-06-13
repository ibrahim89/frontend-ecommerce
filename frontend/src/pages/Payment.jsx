import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Fake payment processing (3 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/order-confirmation"); // Redirect to Order Confirmation
    }, 3000);
  }, [navigate]);

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Processing Payment</h2>

      {/* Fake Loading Spinner */}
      {isProcessing ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Please wait while we process your payment...</p>
        </div>
      ) : (
        <p className="text-green-600 font-semibold">Payment Successful!</p>
      )}
    </div>
  );
};

export default Payment;
