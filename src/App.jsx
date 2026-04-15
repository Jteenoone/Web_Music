import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from "./context/PlayerContext";

// User-facing pages
import Layout from "./pages/Layout";
import NotFound from './pages/NotFound';
import HomePage from "./components/HomePage";
import AlbumDetail from "./components/AlbumDetail";
import Login from "./components/Login";
import Register from "./components/Register";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SongManager from "./pages/admin/SongManager";
import AlbumManager from "./pages/admin/AlbumManager";
import UserManager from "./pages/admin/UserManager";

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="album/:id" element={<AlbumDetail/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<AdminDashboard/>}/>
            <Route path="songs" element={<SongManager/>}/>
            <Route path="albums" element={<AlbumManager/>}/>
            <Route path="users" element={<UserManager/>}/>
          </Route>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}
