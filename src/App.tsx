import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Tags from "./pages/Tags.tsx";
import NotFound from "./pages/NotFound";
import Header from "./components/navigations/Header";
import Footer from "./components/navigations/Footer";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 main-container">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/tags"
            element={<Tags />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
