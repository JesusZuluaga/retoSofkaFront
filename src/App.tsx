import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import "./App.css";
import ProductTable from "./components/tableProduct";
import Footer from "./components/Footer";
import BuyTable from "./components/tableBuy";
import HomePage from "./layout/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<HomePage />}></Route>
              <Route path="/products" element={<ProductTable />}></Route>
              <Route path="/buys" element={<BuyTable />}></Route>
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
