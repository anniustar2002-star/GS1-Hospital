import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { DepartmentPage } from './pages/DepartmentPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sala/:id" element={<DepartmentPage />} />
    </Routes>
  )
}

export default App
