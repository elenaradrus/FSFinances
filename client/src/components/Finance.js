import React, { Component, useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Finance = () => {

    const [income, setIncome] = useState("");
    const [savings, setSavings] = useState("");

    const sendIncome = () => {

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const idLoggedUser = JSON.parse(localStorage.getItem("idLoggedUser"));
        console.log(loggedUser);
        console.log(idLoggedUser);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ income: income, expectedSavings: savings, loggedUser, idLoggedUser }),
        };

        fetch("ingresos", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                // if (res.status) {
                //     setMessage({ error: res.message });
                // } else {
                //     setMessage({ error: res.message });
                // }
            })

    }


    return (
        <div>
            <Nav />
            <main>
                <div class='finance'>
                    <div>
                        <label className="month">Mes</label>
                        <select>
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
                        <input class='income' placeholder='ingresos este mes' onChange={(e) => setIncome(e.target.value)}></input>
                        <input class='expectedSaving' placeholder='ahorro esperado' onChange={(e) => setSavings(e.target.value)}></input>
                    </div>
                </div>

                <div className="container-btnSpendings">
                    <button class='btnSpendings' onClick={() => sendIncome()}>Empezar</button>
                </div>

                <div class='dataMonth'>
                    <h4>Ingresos:<span></span></h4>
                    <h4>Ahorro esperado:<span></span></h4>
                    <h4>Gasto total:<span></span></h4>
                </div>

                <div class='spendingData'>
                    <select>
                        <option>Hogar</option>
                        <option>Supermercados</option>
                        <option>Restaurantes</option>
                        <option>Ocio</option>
                    </select>
                    <input class='day' placeholder='día' type='number'></input>
                    <input class='description' placeholder='descripción' type='text'></input>
                    <input class='amount' placeholder='precio' type='number'></input>
                </div>

                <div class='addSpending'>
                    <button class='btnSpendings'>Añadir gasto</button>
                </div>

                <div class='container-spendings'>
                    <div class='dataSpendings'>
                    </div>
                </div>

            </main>

            <Footer />

        </div>
    );
}

export default Finance;