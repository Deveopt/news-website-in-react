import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from './Components/Footer';
import Header from './Components/Header';
import Navigation from './Components/Navigation';

const App = () => {
  return (
    <div className='container mx-auto'>
      <Header />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App;
