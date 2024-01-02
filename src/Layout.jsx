import MainPage from "./components/MainPage.jsx";
import ReactDOM from 'react-dom/client';
import './index.css';
import {StrictMode} from "react";

export const Layout = () => (
  <MainPage/>
);

ReactDOM.createRoot(document.getElementById('root')).render(<StrictMode>
  <Layout/>
</StrictMode>,);
