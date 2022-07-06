import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

export const nameRegex = (/^([A-Za-z]{1,15})$/);
export const emailRegex = (/^([\d\w_\.-]+)@([\d\w\.-]+)\.([\w\.]{3})$/);
export const passwordRegex = (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
);

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const createAccount = () => {

        if (!name || !email || !password) {
            setMessage({ error: 'No pueden haber campos vacíos' });
        } else if (!nameRegex.test(name)) {
            setMessage({ error: 'El nombre no puede contener números' })
        } else if (!passwordRegex.test(password)) {
            setMessage({ error: 'La contraseña no es válida' });
        } else if (!emailRegex.test(email)) {
            setMessage({ error: 'Email incorrecto' });
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accountName: name, accountEmail: email, accountPassword: password }),
            };

            fetch("registro", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    // setName(res.name)
                    // setEmail(res.email)
                    // setPassword(res.password);
                    //cojo el mensaje del back para mostrarlo en el front si el usuario ya esta registrado
                    console.log(res.message);
                    if (res.status) {
                        setMessage({ error: res.message });
                    } else {
                        setMessage({ error: res.message });
                    }
                })

            navigate("/");
        }
    };

    return (
        <div class='container'>
            <div class='card'>
                <Message
                    message={message}
                />
                <div class='data'>
                    <input type='text' placeholder='nombre' onChange={(e) => setName(e.target.value)} />
                    <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='contraseña' onChange={(e) => setPassword(e.target.value)} />
                    <button class='btn' onClick={() => createAccount()}>Crear cuenta</button>
                </div>
            </div>
        </div>
    );
}

export default Register;