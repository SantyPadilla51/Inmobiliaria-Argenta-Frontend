import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PropertyDetail } from "./shop/components/PropertyDetail";
import HomePage from "./shop/pages/HomePage";
import Login from "./views/auth/Login";
import Register from "./views/auth/Resgister";
import TasacionesForm from "./shop/pages/Tasaciones";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasaciones" element={<TasacionesForm />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/propiedad/:id" element={<PropertyDetail />} />

          <Route path="*" element={<h1>404 - No encontrado</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
