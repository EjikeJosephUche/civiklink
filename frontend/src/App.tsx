import { Routes, Route  } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Government from "./pages/Government";
import Services from "./pages/Services";
import News from "./pages/News";

const App = () => {
return (
<Routes>
    <Route element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="/government" element={<Government />} />
    <Route path="/services" element={<Services />} />
    <Route path="/news" element={<News />} />
    </Route>
  </Routes>
)
}
   
  


export default App
