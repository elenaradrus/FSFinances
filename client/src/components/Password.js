import React, { useState } from "react";

const Password = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const checkUserEmail = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        };

        fetch("changepassword", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    //console.log(res.message);
                    if (res.status) {
                        setMessage(res.message);
                    } else {
                        setMessage(res.message );
                    }
                })
    }

    return (
        <div className="container-changePassword">
            <div className="containerEmail">
                <p className="messagePassword">Inserta tu email para cambiar la contraseña</p>
                <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <button class='btn' onClick={() => checkUserEmail()}>Enviar</button>
                {message}
            </div>


        </div>
    );
}

export default Password;