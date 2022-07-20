import Nav from "./Nav";
import Footer from "./Footer";

const About = () => {
    return (
        <div>
            <Nav />
            <div className="container-about">
                <div className="about">
                    <div className="aboutTitle">
                        <h3>Bienvenidos a Fine&Go</h3>
                        <h4>La app donde puedes hacer un seguimiento de tus finanzas</h4>
                    </div>
                    <div className="info">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-event" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <rect x="4" y="5" width="16" height="16" rx="2" />
                            <line x1="16" y1="3" x2="16" y2="7" />
                            <line x1="8" y1="3" x2="8" y2="7" />
                            <line x1="4" y1="11" x2="20" y2="11" />
                            <rect x="8" y="15" width="2" height="2" />
                        </svg>
                        <p className="textAbout">
                            Para comenzar elige en el desplegable el mes donde quieres ingresar tus gastos.
                        </p>
                    </div>

                    <div className="info">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-businessplan" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <ellipse cx="16" cy="6" rx="5" ry="3" />
                            <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                            <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                            <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                            <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                            <path d="M5 15v1m0 -8v1" />
                        </svg>
                        <p className="textAbout">
                            Para añadir tus gastos simplemente tienes que seleccionar el tipo de gasto,
                            poner el día, una descripción y el precio. <br/>Los decimales en el precio han de ir separados por un punto.
                            Tus gastos irán apareciendo en el lateral a medida que los vas insertando.
                        </p>
                    </div>

                    <div className="info">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chart-infographic" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="7" cy="7" r="4" />
                            <path d="M7 3v4h4" />
                            <line x1="9" y1="17" x2="9" y2="21" />
                            <line x1="17" y1="14" x2="17" y2="21" />
                            <line x1="13" y1="13" x2="13" y2="21" />
                            <line x1="21" y1="12" x2="21" y2="21" />
                        </svg>
                        <p className="textAbout">
                            En las tarjetas de arriba podrás ir viendo tus gastos y lo que vas ahorrando.
                        </p>
                    </div>

                    <div className="info">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mailbox" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5" />
                            <path d="M12 11v-8h4l2 2l-2 2h-4" />
                            <path d="M6 15h1" />
                        </svg>

                        <p className="textAbout">
                            Siempre que quieras podrás ponerte en contacto con Fine&Go
                            mandándonos un email en el apartado de "contacto".
                        </p>
                    </div>

                    <h4>¡Disfruta de la app!</h4>




                </div>

            </div>
            <Footer />
        </div>

    );
}

export default About;