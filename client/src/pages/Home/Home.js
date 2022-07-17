import React, { Component, useState, useEffect } from "react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import "./Home.css";
import MonthIncome from "../../components/Card/MonthIncome"
import Spendings from "../../components/Spendings/Spendings";
import List from "../../components/List/List";
import MonthOverview from "../../components/MonthOverview/MonthOverview";


const Home = () => {

    const [month, setMonth] = useState("");

    const onChangeMonth = (month) =>{
        setMonth(month);
    }

    return ( 
        <div>
            <Nav />
            <MonthOverview />
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