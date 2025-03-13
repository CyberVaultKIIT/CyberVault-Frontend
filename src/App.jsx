import React from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/Footer';
import NotFound from "./components/NotFound/notFound";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from './pages/home/home.jsx';
import Team from './pages/team/Team.jsx';
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <Home />
          }/>
          <Route path="/team" element={
            <Team/>
          }/>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


