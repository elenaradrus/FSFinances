import React, { Component, useState, useEffect } from "react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import "./Home.css";
import MonthIncome from "../../components/Card/MonthIncome"
import Spendings from "../../components/Spendings/Spendings";
import List from "../../components/List/List";
import MonthOverview from "../../components/MonthOverview/MonthOverview";


const Home = () => {

    const yearMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const date = new Date();
    const getMonth = yearMonths[date.getMonth()];
    const [month, setMonth] = useState(getMonth);

    const [changeList, setChangeList] = useState({});

    const [changeSpending, setChangeSpending] = useState({});

    const onSpendingChange = (add) => {
        setChangeSpending(add);
    }



    //const [month, setMonth] = useState('Enero');
    //funcion callback para que cuando se añada una inserccion en gasto, 
    //la lista se actualice automaticamnete pasandole el prop
    const onDataChange = (isChanged) => {
        console.log('cambia: ', isChanged);
        setChangeList(isChanged);
    }

    const onChangeMonth = (newMonth) => {
        setMonth(newMonth);
    }

    return ( 
        <div>
            <Nav />
            <MonthOverview month={month} onChangeMonth={onChangeMonth} changeSpending={changeSpending}/>
            <div className="containerHome">
                <div className="left">
                   <MonthIncome month={month}/>
                   <Spendings month={month} onDataChange={onDataChange}/>
                </div>

                <div className="right">
                    <List month={month} changeList={changeList} onSpendingChange={onSpendingChange} />
                </div>
                
            </div>
            <Footer />
        </div>
    );
}
 
export default Home;