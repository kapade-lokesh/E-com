import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Userlayout from "./components/Layout/Userlayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
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
