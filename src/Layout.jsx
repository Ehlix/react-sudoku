import MainPage from "./components/MainPage.jsx";
import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';

const Layout = () => (
  <MainPage/>
);

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <Layout/>
</React.StrictMode>,);
