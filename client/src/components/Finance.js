import React, { Component, useState, useEffect } from "react";
import Nav from "./Nav";
import Message from "./Message";
import Footer from "./Footer";

const Finance = () => {

    const [message, setMessage] = useState("");
    const [month, setMonth] = useState("Enero");

    const [income, setIncome] = useState("");
    const [savings, setSavings] = useState("");

    const [savedincome, setSavedincome] = useState("");
    const [savedspendings, setSavedspendings] = useState("");

    const [isDataMonthLoading, setDataMonthLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [day, setDay] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const [data, setData] = useState('');


    useEffect(() => {
        const getId = localStorage.getItem('idLoggedUser');
        

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ getId }),
        };

        fetch("incomes", requestOptions)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setMonth(res.month);
                setSavedincome(res.income);
                setSavedspendings(res.expectedSavings);
                setDataMonthLoading(false);
            });

        // console.log(res.json)
        console.log(savedincome);
        console.log(savedspendings);
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('idLoggedUser');

        console.log('month: ', month);

        const getSpendings = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ month: month, userId }),
        };

        fetch("spendings", getSpendings)
            .then((res) => res.json())
            .then((res) => {
                //console.log('res: ', res.data);
                setData(res.data);
                //console.log(data);
            });
    }, [data]);



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
                    setMonth(res.data.month);
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

    const renderDataMonth = () => {
        // if(isDataMonthLoading){
        //     return <span>Aquí se mostrarán tus datos una vez le des a "empezar"</span>
        // }

        return (
            <div className='dataMonth'>
                <h4>Mes:<span>{month}</span></h4>
                <h4>Ingresos:<span>{savedincome}</span></h4>
                <h4>Ahorro esperado:<span>{savedspendings}</span></h4>
                <h4>Gasto total:<span></span></h4>
            </div>
        )
    };

    //function to send spending info into table

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

    const renderSpendings = () => {
        return (
            <div className='container-spendings'>
                {data ? data.map((e, i) =>
                    <div key={i} className='dataSpendings'>
                        <p>Día: {e.dia} - {e.descripcion}: {e.precio}€ </p>
                    </div>) : ""}
            </div>
        )
    };


    return (
        <div>
            <Nav />
            <main>
                <Message
                    message={message}
                />
                <div className='finance'>
                    <div>
                        <label className="month">Mes</label>
                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
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

                    <div>
                        <input className='income' placeholder='ingresos este mes' type='number' onChange={(e) => setIncome(e.target.value)}></input>
                        <input className='expectedSaving' placeholder='ahorro esperado' type='number' onChange={(e) => setSavings(e.target.value)}></input>
                    </div>
                </div>

                <div className="container-btnSpendings">
                    <button className='btnSpendings' onClick={() => sendIncome()}>Empezar</button>
                </div>

                {renderDataMonth()}

                <div className='spendingData'>
                    <select value={title} onChange={(e) => setTitle(e.target.value)}>
                        <option></option>
                        <option>Gastos Fijos</option>
                        <option>Gastos en supermercados</option>
                        <option>Gastos en ocio</option>
                    </select>
                    {month}
                    <input className='day' placeholder='día' type='number' onChange={(e) => setDay(e.target.value)}></input>
                    <input className='description' placeholder='descripción' type='text' onChange={(e) => setDescription(e.target.value)}></input>
                    <input className='amount' placeholder='precio' type='number' onChange={(e) => setAmount(e.target.value)}></input>
                </div>

                <div className='addSpending'>
                    <button className='btnSpendings' onClick={() => sendSpending()}>Añadir gasto</button>
                </div>

                {renderSpendings()}

                {/* <div className='container-spendings'>
                    <div className='dataSpendings'>
                        {title}
                        {day}
                        {description}
                        {amount}
                    </div>
                </div> */}

            </main>

            <Footer />

        </div>
    );
}

export default Finance;