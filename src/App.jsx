import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Toaster />
    </>
  );
};
export default App;
