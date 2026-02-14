import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import AboutUsPage from "./Pages/AboutUsPage";
import HomePage from "./Pages/HomePage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>

      <Toaster />
    </>
  );
};
export default App;
