import React, { Component, useState, useEffect } from "react";
import Nav from "./Nav";
import Message from "./Message";
import Footer from "./Footer";

const Finance = () => {

    const [message, setMessage] = useState("");
    const [month, setMonth] = useState("");

    const [income, setIncome] = useState("");
    const [savings, setSavings] = useState("");

    const [savedincome, setSavedincome] = useState("");
    const [savedspendings, setSavedspandings] = useState("");

    const [isDataMonthLoading, setDataMonthLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [day, setDay] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");


    useEffect(() => {
        const getId = localStorage.getItem('idLoggedUser');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ getId }),
        };

        fetch("traerinformacion", requestOptions)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setMonth(res.month);
                setSavedincome(res.income);
                setSavedspandings(res.expectedSavings);
                setDataMonthLoading(false);
            });
        
            // console.log(res.json)
            console.log(savedincome);
            console.log(savedspendings);
    }, []);



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

        fetch("ingresos", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log('res: ', res);
                if(res.code !== 200){
                    setMessage({ error: res.message });
                    setDataMonthLoading(false);
                } else{
                    console.log('res: ', res.message);
                    setMonth(res.data.month);
                    setSavedincome(res.data.income);
                    setSavedspandings(res.data.expectedSavings);
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
    }

    //function to send spending info into table

    const sendSpending = () => {
        const getId = localStorage.getItem('idLoggedUser');

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title, month: month, day: day, description: description, amount: amount, getId}),
            //idLoggedUser 
        };

        fetch("finanzas", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log('res: ', res);
                // if(res.code !== 200){
                //     setMessage({ error: res.message });
                //     setDataMonthLoading(false);
                // } else{
                //     console.log('res: ', res.message);
                //     setMonth(res.data.month);
                //     setSavedincome(res.data.income);
                //     setSavedspandings(res.data.expectedSavings);
                //     setDataMonthLoading(false);
                // };

               
            });

            // hacer otro endpoint para coger el id de gastos
            //y meterlo en la tabla relacional junto con la
            //fk de usuario del localStorage

    }


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
                    <button className='btnSpendings'>Añadir gasto</button>
                </div>

                <div className='container-spendings'>
                    <div className='dataSpendings'>
                        {day}
                        {description}
                        {amount}
                    </div>
                </div>

            </main>

            <Footer />

        </div>
    );
}

export default Finance;