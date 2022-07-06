// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import { Link } from "react-router-dom";
import { emailRegex, passwordRegex } from "./Register";

const Log = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const logUser = () => {
        if (!email || !password) {
            setMessage({ error: 'No pueden haber campos vacíos' });
        } else if (!passwordRegex.test(password)) {
            setMessage({ error: 'La contraseña no es válida' });
        } else if (!emailRegex.test(email)) {
            setMessage({ error: 'Email incorrecto' });
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ loginEmail: email, passLog: password }),
            };

            fetch("login", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res.message);
                    if (res.status) {
                        setMessage({ error: res.message });
                    } else {
                        setMessage({ error: res.message });
                    }
                })

            navigate("/finanzas");
        }
    };

    return (
        <div class='container'>
            <div class='card'>
                <Message
                    message={message}
                />
                <div class='logIn'>
                    <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' placeholder='contraseña' onChange={(e) => setPassword(e.target.value)}/>
                    <button class='btn' onClick={() => logUser()}>Iniciar sesión</button>
                    <Link className="linkNav linkLog" to={"/registro"}>Registrarse</Link>
                    <Link className="linkNav linkLog" to={"/registro"}>Olvidé Contraseña</Link>
                </div>
            </div>

        </div>
    );
}

export default Log;