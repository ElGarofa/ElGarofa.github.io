import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Likes from "./pages/Likes";
import Chat from "./pages/Chat";
import Ranking from "./pages/Ranking";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
