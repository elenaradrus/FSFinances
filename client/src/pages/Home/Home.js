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

    //const [month, setMonth] = useState('Enero');

    const onChangeMonth = (month) => {
        setMonth(month);
        console.log("month home", month)
    }

    return ( 
        <div>
            <Nav />
            <MonthOverview month={month} onChangeMonth={onChangeMonth}/>
            <div className="containerHome">
                <div className="left">
                   <MonthIncome month={month} onChangeMonth={onChangeMonth}/>
                   <Spendings month={month}/>
                </div>

                <div className="right">
                    <List month={month}/>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}
 
export default Home;