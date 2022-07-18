import "./MonthOverview.css"
import React, { Component, useState, useEffect } from "react";

const MonthOverview = ({ month, onChangeMonth, changeSpending }) => {

    const [totalAmount, setTotalAmount] = useState(0)
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
                console.log('rtx  ha hecho la llamada');
                if (res.status) {
                    console.log('rtx status: ', res);
                    setResponse(res);
                } else {
                    console.log('rtx if status es false');
                    setTotalAmount(0);
                    setIncome(0);
                    setMonthSaving(0);
                }
            });

    }, [month, changeSpending]);

    console.log('rtx respose render: ', response);

    const getIncome = (response) =>{
        if(response && response.income?.length){
            return response.income[0].ingreso;
        }
        return 0;

    }

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

            <div className="overview">
                <h4>Ingresos: <span>{getIncome(response)}</span>€</h4>
            </div>

            <div className="overview">
                <h4>Gastos: <span>{response?.totalAmount}</span>€</h4>
            </div>

            <div className="overview">
                <h4>Ahorrado: <span>{getIncome(response) - response?.totalAmount}</span>€</h4>
            </div>

        </div>
    );
}

export default MonthOverview;