import { useEffect } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { authUser } from './Functions/UserQuery';
import About from './Pages/About';
import AddSFOwner from './Pages/AddSFOwner';
import Help from './Pages/Help';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';
import Owner from './Pages/Owner';
import OwnerRegister from './Pages/OwnerRegister';
import Profile from './Pages/Profile';
import ProfileReservation from './Pages/ProfileReservation';
import Register from './Pages/Register';
import Reservation from './Pages/Reservation';
import Search from './Pages/Search';
import SFDetail from './Pages/SFDetial';
import SFOwner from './Pages/SFOwner';
import SFownerEdit from './Pages/SFOwnerEdit';
import SportFields from './Pages/SportFields';
import Turns from './Pages/Turns';

const getUser = async () => {
  localStorage.getItem('token') && (await authUser());
};

function App() {
  useEffect(() => {
    getUser().catch(() => console.log('Auth Failed'));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/inicio" element={<Home />}></Route>

        <Route path="/reservas" element={<Reservation />}></Route>
        <Route path="/reservas/:sport" element={<Search />}></Route>
        <Route path="/reservas/:sport/canchas" element={<SportFields />}></Route>
        <Route path="/reservas/:sport/canchas/:id" element={<SFDetail />}></Route>

        <Route path="/propietarios" element={<Owner />}></Route>
        <Route path="/propietarios/canchas" element={<SFOwner />}></Route>
        <Route path="/propietarios/canchas/:id" element={<SFownerEdit />}></Route>
        <Route path="/propietarios/turnos" element={<Turns />}></Route>
        <Route path="/propietarios/agregar-cancha" element={<AddSFOwner />}></Route>
        <Route path="/propietarios/registro" element={<OwnerRegister />}></Route>

        <Route path="/perfil" element={<Profile />}></Route>
        <Route path="/perfil/reservas" element={<ProfileReservation />}></Route>

        <Route path="/ayuda" element={<Help />}></Route>
        <Route path="/nosotros" element={<About />}></Route>

        <Route path="/ingresar" element={<Login />}></Route>
        <Route path="/registro" element={<Register />}></Route>

        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
