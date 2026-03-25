// import "./styles.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFound from './pages/NotFound'
import Layout from "./pages/Layout";
import Main from "./components/Main";
import Login from "./components/Login";
import AlbumDetail from "./components/AlbumDetail";
import { PlayerProvider } from "./context/PlayerContext";

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Main/>}/>
            <Route path="album/:id" element={<AlbumDetail/>} />
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}
