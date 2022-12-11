import "bootstrap/dist/css/bootstrap.min.css";
import 'charts.css';
import './App.css';
import { BrowserRouter , Route , Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/AppBar/ResponsiveAppBar";

function App() {
    return (
        <BrowserRouter>
            <ResponsiveAppBar />
        </BrowserRouter>
    );
}

export default App;
