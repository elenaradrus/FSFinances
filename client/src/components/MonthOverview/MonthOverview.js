import "./MonthOverview.css"
import React, { Component, useState, useEffect } from "react";

const MonthOverview = ({ month, onChangeMonth, changeSpending }) => {


    const [income, setIncome] = useState(0)
    const [monthSaving, setMonthSaving] = useState(0)
    const [response, setResponse] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('idLoggedUser');



        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ month: month, userId }),
        };

        fetch("month-end", requestOptions)
            .then((res) => res.json())
            .then((res) => {
                if (res.status) {
                    setResponse(res);
                } else {
                    setIncome(0);
                    setMonthSaving(0);
                }
            });

    }, [month, changeSpending]);


    const getIncome = (response) => {
        if (response?.income?.length) {
            return response.income[0].ingreso;
        }
        return 0;
    };

    const getSavings = (response) => {
        return (
            (getIncome(response) - response?.totalAmount).toFixed(2)
        );
    }

    return (
        <div className="container-overview">
            <div className="monthCardOverview">
                <select className="selectCardOverview" value={month} onChange={(e) => onChangeMonth(e.target.value)}>
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

            <div className="overview">
                <h4>Ingresos: <span>{getIncome(response)}</span>€</h4>
            </div>

            <div className="overview">
                <h4>Gastos: <span>{response?.totalAmount}</span>€</h4>
            </div>

            <div className="overview">
                <h4>Ahorrado: <span>{getSavings(response)}</span>€</h4>
            </div>

        </div>
    );
}

export default MonthOverview;