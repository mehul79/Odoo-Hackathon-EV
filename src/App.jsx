import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import ViewPost from './components/ViewPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ViewPost />
    </>
  )
}

export default App
