import { Routes, Route } from "react-router-dom";
import PhishGuard from "./Home";
import ServerPage from "./server";

function App() {
  return (
    <Routes>
      <Route path="/PhishGuard-front/" element={<PhishGuard />} />
      <Route path="/server" element={<ServerPage />} />
    </Routes>
  );
}

export default App;
