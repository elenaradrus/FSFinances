import "./MonthOverview.css"
import React, { Component, useState, useEffect } from "react";

const MonthOverview = ({ month, onChangeMonth }) => {

    const [totalAmount, setTotalAmount] = useState('')
    const [income, setIncome] = useState('')
    const [monthSaving, setMonthSaving] = useState('')
    console.log(onChangeMonth);


    useEffect(() => {
        const userId = localStorage.getItem('idLoggedUser');
        console.log("monthOverview", month)


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ month: month, userId }),
        };

        fetch("month-end", requestOptions)
            .then((res) => res.json())
            .then((res) => {
                if (res.status) {
                    setTotalAmount(res.totalAmount);
                    setIncome(res.income[0].ingreso);
                    setMonthSaving((res.income[0].ingreso - totalAmount));
                } else {
                    setTotalAmount('');
                    setIncome('');
                    setMonthSaving('');
                }
                console.log(res);
                console.log(res.income[0].ingreso);
                console.log(totalAmount);
                console.log(res.income[0].ingreso - totalAmount)

            });


        console.log(totalAmount)
        console.log(income)
        console.log(monthSaving)

    }, [month]);


    return (
        <div className="container-overview">
            <div className="monthCardOverview">
                <select className="selectCardOverview" value={month} onChange={(e) => onChangeMonth(e.target.value)}>
                    {/* <option></option> */}
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

            {/* <div className="overview">
                <h4>Ingresos: <span>{income}</span>€</h4>
            </div>

            <div className="overview">
                <h4>Gastos: <span>{totalAmount}</span>€</h4>
            </div>

            <div className="overview">
                <h4>Ahorrado: <span>{monthSaving}</span>€</h4>
            </div> */}

        </div>
    );
}

export default MonthOverview;