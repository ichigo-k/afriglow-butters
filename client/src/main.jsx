import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router";
import {Toaster} from "sonner";
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
      <Toaster/>
  </BrowserRouter>
)
