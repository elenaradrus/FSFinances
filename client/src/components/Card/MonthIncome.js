import "./MonthIncome.css"
import React, { Component, useState, useEffect } from "react";
import Message from "../Message";

const MonthIncome = ({ month, onChangeMonth }) => {

    const [isForm, setForm] = useState(false);

    const [message, setMessage] = useState("");


    const [income, setIncome] = useState("");
    const [savings, setSavings] = useState("");

    const [savedincome, setSavedincome] = useState("");
    const [savedspendings, setSavedspendings] = useState("");

    const [isDataMonthLoading, setDataMonthLoading] = useState(true);

    console.log('month income month: ', month);


    const sendIncome = () => {
        setDataMonthLoading(true);

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const idLoggedUser = JSON.parse(localStorage.getItem("idLoggedUser"));
        console.log(loggedUser);
        console.log(idLoggedUser);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ month: month, income: income, expectedSavings: savings, loggedUser, idLoggedUser }),
        };

        fetch("add-income", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log('res: ', res);
                if (res.code !== 200) {
                    setMessage({ error: res.message });
                    setDataMonthLoading(false);
                } else {
                    console.log('res: ', res.message);
                    setSavedincome(res.data.income);
                    setSavedspendings(res.data.expectedSavings);
                    setDataMonthLoading(false);
                };

                // if (res.status) {
                //     setMessage({ error: res.message });
                // } else {
                //     setMessage({ error: res.message });
                // }
            });

    }

    useEffect(() => {
        const getId = localStorage.getItem('idLoggedUser');


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ month: month, getId }),
        };

        fetch("incomes", requestOptions)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setSavedincome(res.income);
                setSavedspendings(res.expectedSavings);
                setDataMonthLoading(false);
            });

        // console.log(res.json)
        console.log(savedincome);
        console.log(savedspendings);
    }, [month]);

    const renderData = () => {
        return (
            <div className='containerMonth'>
                <h4>Mes:<span>{month}</span></h4>
                <h4>Ingresos:<span>{savedincome}</span></h4>
                <h4>Ahorro esperado:<span>{savedspendings}</span></h4>
                <button className='btnSpendingsCard' onClick={() => setForm(true)}>Volver</button>
            </div>
        )


    }

    const renderForm = () => {
        return (
            <div className="containerCard">
                <div className="monthCard">
                    <select className="selectCard" value={month} onChange={(e) => onChangeMonth(e.target.value)}>
                        <option></option>
                        <option>Enero</option>
                        <option>Febrero</option>
                        <option>Marzo</option>
                        <option>Abril</option>
                        <option>Mayo</option>
                        <option>Junio</option>
                        <option>Julio</option>
                        <option>Agosto</option>
                        <option>Septiembre</option>
                        <option>Octubre</option>
                        <option>Noviembre</option>
                        <option>Diciembre</option>
                    </select>
                </div>

                <div className="container-inputCard">
                    <input className='inputCard' placeholder='ingresos este mes' type='number' onChange={(e) => setIncome(e.target.value)}></input>
                    <input className='inputCard' placeholder='ahorro esperado' type='number' onChange={(e) => setSavings(e.target.value)}></input>
                </div>

                <div className="container-btnSpendingsCard">
                    <button className='btnSpendingsCard' onClick={() => sendIncome()}>Empezar</button>
                    <button className='btnSpendingsCard' onClick={() => setForm(false)}>Ver mes</button>
                </div>

                <Message
                    message={message}
                />
            </div>

        );
    }

    return isForm ? renderForm() : renderData();


    // <div className="containerCard">
    //     <button className='edit' onClick={() => renderRed()}>Edit</button>
    //     <div className="monthCard">
    //         <select className="selectCard" value={month} onChange={(e) => onChangeMonth(e.target.value)}>
    //             <option></option>
    //             <option>Enero</option>
    //             <option>Febrero</option>
    //             <option>Marzo</option>
    //             <option>Abril</option>
    //             <option>Mayo</option>
    //             <option>Junio</option>
    //             <option>Julio</option>
    //             <option>Agosto</option>
    //             <option>Septiembre</option>
    //             <option>Octubre</option>
    //             <option>Noviembre</option>
    //             <option>Diciembre</option>
    //         </select>
    //     </div>

    //     <div className="container-inputCard">
    //         <input className='inputCard' placeholder='ingresos este mes' type='number' onChange={(e) => setIncome(e.target.value)}></input>
    //         <input className='inputCard' placeholder='ahorro esperado' type='number' onChange={(e) => setSavings(e.target.value)}></input>
    //     </div>

    //     <div className="container-btnSpendingsCard">
    //         <button className='btnSpendingsCard' onClick={() => sendIncome()}>Empezar</button>
    //     </div>

    //     <Message
    //         message={message}
    //     />
    // </div>
    //);
}

export default MonthIncome;