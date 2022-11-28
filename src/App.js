import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Col , Container , Row } from "react-bootstrap";
import { BrowserRouter , Route , Routes } from "react-router-dom";
import LoginComponent from "./components/Login/LoginComponent";
import SignUpComponent from "./components/Signup/SignUpComponent";
import HomeComponent from "./components/Home/HomeComponent";
import AppBarComponent from "./components/AppBar/AppBarComponent";
import AlimentiComponent from "./components/Alimenti/AlimentiComponent";

function App() {
    return (
        <BrowserRouter>
            <Container fluid>
                <Row className="d-flex justify-content-between">
                    <AppBarComponent />
                    <Col xs={ 12 } className={ "py-2 px-0" }>
                        <Routes>
                            <Route path="/login" element={ <LoginComponent/> }/>
                            <Route path="/signup" element={ <SignUpComponent/> }/>
                            <Route path="/" element={ <HomeComponent/> }/>
                            <Route path="/alimenti" element={ <AlimentiComponent/> }/>
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
}

export default App;
