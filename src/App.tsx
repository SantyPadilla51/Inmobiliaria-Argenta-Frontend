import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./shop/pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Aquí puedes agregar más rutas si lo necesitas */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
