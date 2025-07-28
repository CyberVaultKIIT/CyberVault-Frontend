import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar.jsx';
import NotFound from "./components/NotFound/notFound";
import RegistrationForm from './components/RegistrationForm/registrationForm.jsx';
import Home from './pages/home/home.jsx';
import Team from './pages/Team/Team.jsx';
import About from './pages/about/about.jsx';
import Login from './pages/auth/SignIn.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import AddMember from './pages/addMember/AddMember.jsx';
import Event from './pages/events/events.jsx';

import Footer from './components/Footer/Footer.jsx';

import { AlertProvider } from "./components/Alert/AlertContext.jsx"; 


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
    <AlertProvider>
    <Router>
      
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path ="/events" element={<Event/>}/>
          <Route path="/team" element={<Team />} />
          <Route path="/addMember" element={<AddMember />} />
          <Route path="/form" element={<RegistrationForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      
    </Router>
    </AlertProvider>
  );
}

export default App;
