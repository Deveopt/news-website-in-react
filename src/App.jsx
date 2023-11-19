import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from './Components/Footer';
import Header from './Components/Header';
import Navigation from './Components/Navigation';

const App = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default App;
