import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Fragment } from "react";

const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendContactData = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dataName: name, dataEmail: email, dataMessage: message }),
        };

        fetch("contacto", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                setName(res.name)
                setEmail(res.email)
                setMessage(res.message);
            })
    };

    return (
        <Fragment>
            <Nav />
            <div class='container'>

                <div class='card'>
                    <div class='data'>
                        <input type='text' placeholder='nombre' onChange={(e) => setName(e.target.value)} />
                        <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                        <label>Mensaje</label>
                        <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
                        <button class='btn' onClick={() => sendContactData()}>Enviar</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Contact;