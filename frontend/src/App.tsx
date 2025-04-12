import { Routes, Route  } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Government from "./pages/Government";
import Services from "./pages/Services";
import News from "./pages/News";
import Login  from "./pages/Login";
import SignUp  from "./pages/SignUp";


const App = () => {
return (
<Routes>
    <Route element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="/government" element={<Government />} />
    <Route path="/services" element={<Services />} />
    <Route path="/news" element={<News />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    </Route>
  </Routes>
)
}
   
  


export default App
