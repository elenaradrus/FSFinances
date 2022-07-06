import Contact from "./components/Contact";
import Log from "./components/Log";
import Register from "./components/Register";
import Finance from "./components/Finance";
import Nav from "./components/Nav";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Finance/> */}
      <BrowserRouter>
        <Main />
      </BrowserRouter>

    </div>
  );
}

export default App;
