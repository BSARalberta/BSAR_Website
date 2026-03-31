import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DonatePage from './pages/DonatePage'
import JoinPage from './pages/JoinPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import TransparencyPage from './pages/TransparencyPage'
import ListingDetailPage from './pages/ListingDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/public-events-info" element={<TransparencyPage />} />
        <Route path="/public-events-info/:slug" element={<ListingDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/listings" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  )
}

export default App
