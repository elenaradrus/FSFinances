import React, { Component } from "react";
import Nav from "./Nav";

const Finance = () => {
    return (
        <div>
            <Nav/>
            <main>
                <div class='finance'>
                    <div>
                        <label>Mes</label>
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
                        <input class='income' placeholder='ingresos este mes'></input>
                        <input class='expectedSaving' placeholder='ahorro esperado'></input>
                    </div>
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
                    <button class='btn'>Añadir gasto</button>
                </div>

                <div class='container-spendings'>
                    <div class='dataSpendings'>
                    </div>
                </div>

            </main>

        </div>
    );
}

export default Finance;