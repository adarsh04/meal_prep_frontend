import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import CreateRecipe from "./pages/recipe/create.tsx";
import React from "react";
import ViewRecipe from "./pages/recipe/view.tsx";
import Login from "./pages/login/index.tsx";
import Register from "./pages/register/index.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="create" element={<CreateRecipe />} />
          <Route path="recipe/:id" element={<ViewRecipe />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
