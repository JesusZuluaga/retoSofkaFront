import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import "./App.css";
import ProductTable from "./components/table";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/products" element={<ProductTable />}></Route>
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
