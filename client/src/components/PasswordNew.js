import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const PasswordNew = () => {

    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('');
    const {email, token} = useParams();

    const changePassword = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword, email, token }),
        };

        fetch("/resetpassword", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    
                })
    }

    return (
        <div>
            <div className="container-changePassword">
                <div className="containerEmail">
                    <p className="messagePassword">Inserta tu nueva contraseña</p>
                    <input type='password' placeholder='contraseña nueva' onChange={(e) => setNewPassword(e.target.value)} />
                    <button class='btn' onClick={() => changePassword()}>Cambiar</button>
                    {message}
                </div>


            </div>

        </div>
    );
}

export default PasswordNew;