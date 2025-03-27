import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Userlayout from "./components/Layout/Userlayout";
import Home from "./Pages/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Userlayout />}>
            <Route index element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
