const Finance = () => {
    return (
        <div>
            <header>
                <h1>Fine&Go</h1>
            </header>

            <nav>
                <a href>Sobre la aplicación</a>
                <a href>Mis finanzas</a>
                <a href>Contacto</a>
            </nav>

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

                <div class='data'>
                    <h4>Ingresos:<span></span></h4>
                    <h4>Ahorro esperado:<span></span></h4>
                    <h4>Gasto total:<span></span></h4>
                </div>

                <div class='spendingData'>
                    <input class='day' placeholder='día'></input>
                    <input class='description' placeholder='descripción'></input>
                    <input class='amount' placeholder='precio'></input>

                </div>

            </main>

        </div>
    );
}

export default Finance;