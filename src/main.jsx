import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from "./Pages/Home.jsx";
import Category from "./Pages/Category.jsx";
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import SearchResult from "./Pages/SearchResult.jsx";
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path=':category' element={<Category />} />
      <Route path='search/:search' element={<SearchResult />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
