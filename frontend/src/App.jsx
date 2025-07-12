import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Layout from './components/Layout'
import ViewPost from './components/ViewPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <ViewPost />
    </Layout>
  )
}

export default App
