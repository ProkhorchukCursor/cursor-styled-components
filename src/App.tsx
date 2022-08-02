import { useEffect, useState } from "react";
import { Route, HashRouter, Routes, Navigate } from "react-router-dom";

import { Container } from "@mui/material";

import { HomePage, LoginPage, RegisterPage } from "./pages";

function App() {
 const [user, setUser] = useState("");

 useEffect(() => {
  const localUser = window.localStorage.getItem("user");
  if (localUser) setUser(localUser);
 }, []);

 return (
  <Container>
   <HashRouter>
    <Routes>
     <Route
      path="/"
      element={
       user ? <HomePage /> : <Navigate to="/login" replace />
      }
     />
     <Route path="/login" element={<LoginPage setUser={setUser}/>} />
     <Route path="/register" element={<RegisterPage setUser={setUser} />} />
    </Routes>
   </HashRouter>
  </Container>
 );
}

export default App;
