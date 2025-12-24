import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Catalog />}>
            <Route path="product/:id" element={<ProductDetails />} />
          </Route>
          <Route path="/cart" element={<CartPage />}>
            <Route path="product/:id" element={<ProductDetails />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
