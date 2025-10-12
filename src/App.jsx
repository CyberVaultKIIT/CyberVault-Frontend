import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar.jsx';
import NotFound from "./components/NotFound/notFound";
import RegistrationForm from './components/RegistrationForm/registrationForm.jsx';
import Home from './pages/home/home.jsx';
import Footer from './components/Footer/Footer.jsx';
import About from './pages/about/about.jsx';
import Login from './pages/auth/SignIn.jsx';
import SignUp from './pages/auth/SignUp.jsx';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          
          {/* <Route path="/form/:formid" element={<RegistrationForm />} /> */}
          <Route path="/form" element={<RegistrationForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
