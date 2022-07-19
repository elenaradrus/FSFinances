import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { passwordRegex } from "./Register";


const PasswordNew = () => {

    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('');
    const [messagePass, setMessagePass] = useState('');
    const { email, token } = useParams();

    const changePassword = () => {
        if (!passwordRegex.test(newPassword)) {
            setMessage({ error: 'La contraseña no es válida' });
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword, email, token }),
            };
    
            fetch("/resetpassword", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    setMessagePass(res.message)
                });
        }
        
    };

    return (
        <div>
            <div className="container-changePassword">
                <div className="containerEmail">
                    <p className="messagePassword">Inserta tu nueva contraseña</p>
                    <input type='password' placeholder='contraseña nueva' onChange={(e) => setNewPassword(e.target.value)} />
                    <button class='btn' onClick={() => changePassword()}>Cambiar</button>
                    <div className="messagePassword">
                        <p className="textNewPass">{message}</p>
                        <p className="textNewPass">{messagePass}</p>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default PasswordNew;