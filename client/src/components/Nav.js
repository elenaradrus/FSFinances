import React, { Component } from "react";
import {Link} from "react-router-dom";

class Nav extends Component {

    render() {
        return (
        <div className="navBar">
            <header>
                <h2>Fine&Go</h2>
            </header>
            <nav>
                {/* <Link to={"/informacion"}>Sobre la aplicación</Link> */}
                <Link className="linkNav" to={"/finanzas"}>Mis finanzas</Link>
                <Link className="linkNav" to={"/contacto"}>Contacto</Link>
            </nav>
        </div>
        );
    }
}
export default Nav;