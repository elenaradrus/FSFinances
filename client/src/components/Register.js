import React, { useState, useEffect } from "react";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createAccount = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accountName: name, accountEmail: email, accountPassword: password }),
        };

        fetch("registro", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                setName(res.name)
                setEmail(res.email)
                setPassword(res.password);
            })
    };

    return (
        <div class='container'>
            <div class='card'>
                <div class='data'>
                    <input type='text' placeholder='nombre' onChange={(e) => setName(e.target.value)}/>
                    <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' placeholder='contraseña' onChange={(e) => setPassword(e.target.value)}/>
                    <button class='btn' onClick={() => createAccount()}>Crear cuenta</button>
                </div>
            </div>
        </div>
    );
}

export default Register;