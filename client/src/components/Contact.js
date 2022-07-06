import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Fragment } from "react";
import { nameRegex, emailRegex } from "./Register";
import Message from "./Message";

const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");

    const [message, setMessage] = useState("");


    const sendContactData = () => {
        if (!nameRegex.test(name)) {
            setMessage({ error: 'El nombre no puede contener números o símbolos' })
        } else if (!emailRegex.test(email)) {
            setMessage({ error: 'Email incorrecto' });

        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataName: name, dataEmail: email, dataMessage: content }),
            };

            fetch("contacto", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    if (res.status) {
                        setMessage({ error: res.message });
                    } else {
                        setMessage({ error: res.message });
                    }
                })
        }
    };

    return (
        <Fragment>
            <Nav />
            <div class='container'>

                <div class='card'>
                    <Message
                        message={message}
                    />
                    <div class='data'>
                        <input type='text' placeholder='nombre' onChange={(e) => setName(e.target.value)} />
                        <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                        <label>Mensaje</label>
                        <textarea onChange={(e) => setContent(e.target.value)}></textarea>
                        <button class='btn' onClick={() => sendContactData()}>Enviar</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Contact;