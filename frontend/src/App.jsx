import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
//import OrderSuccess from "./pages/OrderSuccess";
//import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "swiper/css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            {/* 
            
           */}
            {/* <Route path="/order-success" element={<OrderSuccess />} /> */}
            {/* <Route path="profile" element={<Profile />} /> */}
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
