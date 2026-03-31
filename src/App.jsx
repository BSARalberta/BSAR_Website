import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DonatePage from './pages/DonatePage'
import JoinPage from './pages/JoinPage'
import AboutPage from './pages/AboutPage'
import TransparencyPage from './pages/TransparencyPage'
import ListingDetailPage from './pages/ListingDetailPage'
import AdminListingsPage from './pages/AdminListingsPage'

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
        <Route path="/admin/listings" element={<AdminListingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
