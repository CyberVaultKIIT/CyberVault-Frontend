import React from 'react'
// import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer'
import NotFound from './components/NotFound/notFound'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Home from './pages/home/home.jsx'
import About from './pages/about/about.jsx'
const Layout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<NotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
