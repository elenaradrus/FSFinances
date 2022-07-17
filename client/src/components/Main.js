import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Finance from "./Finance";
import Contact from "./Contact";
import Register from "./Register";
import Log from "./Log";
import About from "./About";
import Home from "../pages/Home/Home";

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Log />} />
                    {/* <Route path="/finanzas" element={<Finance />}/> */}
                    <Route path="/registro" element={<Register />} />
                    <Route path="/informacion" element={<About />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/finanzas" element={<Home />} />
                </Routes>
            </div>
        );
    }
}
export default Main;
