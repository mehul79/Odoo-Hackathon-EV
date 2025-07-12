import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Layout from './components/Layout'
import ViewPost from './components/ViewPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/questions/:id" element={<ViewPost />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
