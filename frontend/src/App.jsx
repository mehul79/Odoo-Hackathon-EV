import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Layout from './components/Layout'
import ViewPost from './components/ViewPost'
import NotificationPage from './components/Notifications'
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import Home from './components/Home';
import Temp from './pages/Temp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Layout>
        <Routes><Route path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/questions/:id" element={<ViewPost />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/test" element={<Temp />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
