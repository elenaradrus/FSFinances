import React, { Component, useState, useEffect } from "react";
import "./List.css"

const List = ({ month, onSpendingChange, changeList, sendAmount }) => {

    const [data, setData] = useState('');
    const [message, setMessage] = useState("");


    useEffect(() => {
        const userId = localStorage.getItem('idLoggedUser');


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
                onSpendingChange({});
                //console.log(data);
            });
    }, [month, changeList]);

    const renderSpendings = () => {
        return (
            <div>
                {data ? data.map((e, i) =>
                    <div key={i}>
                        <h4>Día {e.dia}. {e.descripcion} - {e.precio}€ </h4>
                    </div>) : ""}
            </div>
        )
    };

    const handleOnClick = () => {
        setMessage("Mes finalizado. A por el siguiente!")
    }

    return (
        <div className="container-dataList">
            {data.length ? renderSpendings() :
                <div className="listMessage"> <p>No tienes gastos para este mes </p></div>}
            <div className="container-listBtn">
                <button className='listBtn' onClick={() => handleOnClick()}>Finalizar mes</button>
            </div>
            <div className="endMonthMessage">
                <p>{message}</p>
            </div>


        </div>

    );
}

export default List;