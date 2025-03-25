import { Routes, Route, Navigate } from "react-router-dom";
import PhishGuard from "./Home";
import ServerPage from "./server";
import LoginPage from "./login";
import RegisterPage from "./register";
import MainPage from "./MainPage";
import Options from "./Options";
import FAQPage from "./FAQ";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ element }) {
  const isLoggedIn = localStorage.getItem("login") === "true";
  return isLoggedIn ? element : <Navigate to="/PhishGuard-front/login" />;
}

function App() {
  if (!localStorage.getItem("login")) {
    localStorage.setItem("login", "false");
  }

  return (
    <Routes>
      <Route
        path="/PhishGuard-front/home"
        element={<PrivateRoute element={<PhishGuard />} />}
      />
      <Route
        path="/PhishGuard-front/midHome"
        element={<PrivateRoute element={<Options />} />}
      />
      <Route
        path="/server"
        element={<PrivateRoute element={<ServerPage />} />}
      />
      <Route
        path="/PhishGuard-front/faq"
        element={<PrivateRoute element={<FAQPage />} />}
      />
      <Route path="/PhishGuard-front" element={<MainPage />} />
      <Route path="/PhishGuard-front/login" element={<LoginPage />} />
      <Route path="/PhishGuard-front/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
