import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Catalog />}>
            <Route path="product/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
