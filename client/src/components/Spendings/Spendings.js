import React, { Component, useState, useEffect } from "react";
import "./Spendings.css"
import Message from "../Message";

const Spendings = ({month}) => {
    const [message, setMessage] = useState("");

    const [title, setTitle] = useState("");
    const [day, setDay] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    console.log('spendings month: ', month);

    const sendSpending = () => {
        const getId = localStorage.getItem('idLoggedUser');

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title, month: month, day: day, description: description, amount: amount, getId }),
            //idLoggedUser 
        };

        fetch("add-spending", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log('res: ', res);
                if (res.status) {
                    setTitle(res.data.title);
                    setDay(res.data.day);
                    setDescription(res.data.description);
                    setAmount(res.data.amount);

                } else {
                    setMessage({ error: res.message });
                }
            });

    };

    return (
        <div className="containerSpendings">

            <div className='data-Spendings'>
                <label className="spendingType">Tipo de gasto</label>
                <select value={title} onChange={(e) => setTitle(e.target.value)}>
                    <option></option>
                    <option>Gastos Fijos</option>
                    <option>Gastos en supermercados</option>
                    <option>Gastos en ocio</option>
                </select>
            </div>

            {/* {month} */}
            <div className="container-inputSpendings">
                <input className='dayInput' placeholder='día' type='number' onChange={(e) => setDay(e.target.value)}></input>
                <input className='descriptionInput' placeholder='descripción' type='text' onChange={(e) => setDescription(e.target.value)}></input>
                <input className='amountInput' placeholder='precio' type='number' onChange={(e) => setAmount(e.target.value)}></input>
            </div>

            <div className='containerBtnSpendings'>
                <button className='spendingsBtn' onClick={() => sendSpending()}>Añadir gasto</button>
            </div>

            <Message
                message={message}
            />

        </div>
    );
}

export default Spendings;