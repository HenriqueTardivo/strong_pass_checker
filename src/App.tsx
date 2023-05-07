import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Form } from "./pages/Form";
import { Sucess } from "./pages/Sucess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path={"/success"} element={<Sucess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
