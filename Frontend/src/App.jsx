import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Services from "./pages/Services";
import F_detection from "./components/F_detection";
import CropYieldPrediction from './components/CropYieldPrediction';
import Wpr from './components/Wpr';
import About from './pages/About';
import ContactMe from './pages/ContactMe';

const App = () => {
  const [activePage, setActivePage] = useState("");  // 🔹 Add useState for active page

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fertilizer-detection" element={<F_detection />} />
        <Route path="/crop-yield" element={<CropYieldPrediction />} />
        <Route path="/wpr" element={<Wpr />} />
        <Route path="/contactMe" element={<ContactMe setActivePage={setActivePage} />} /> 
        {/* 🔹 Pass setActivePage here */}
      </Routes>
    </div>
  );
};

export default App;
