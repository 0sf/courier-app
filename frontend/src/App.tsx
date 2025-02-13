import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/SignUp/SignUp";
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import CreateShipment from './pages/Dashboard/CreateShipment';
import TrackShipment from './pages/Tracking/TrackShipment';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import TrackPublic from './pages/Tracking/TrackPublic'
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/track/" element={<TrackShipment />} />
      <Route path="/track/:trackingNumber" element={<TrackShipment />} />
      <Route path="/track-public" element={<TrackPublic />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/create-shipment" element={<CreateShipment />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Route>

      {/* Admin Protected Route */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  )
}

export default App
