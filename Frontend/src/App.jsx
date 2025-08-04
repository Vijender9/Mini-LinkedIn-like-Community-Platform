import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import CreatePost from './pages/createPost.jsx'; // Capitalized fix

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // show a spinner component
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
