import { useState } from "react"
import { Route, Routes } from "react-router"
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ShowroomsPage from './pages/ShowroomsPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"
import AmbientLayer from "./components/AmbientLayer"
import LoadingScreen from "./components/LoadingScreen"
import ContactPopup from "./components/ContactPopup"

const App = () => {
    const [showLoading, setShowLoading] = useState(() => {
        return !sessionStorage.getItem('windoor_loaded')
    })

    const handleLoadingComplete = () => {
        setShowLoading(false)
        sessionStorage.setItem('windoor_loaded', 'true')
    }

    return (
        <>
        {showLoading && (
            <LoadingScreen onComplete={handleLoadingComplete} />
        )}
        <AmbientLayer/>
        <Navbar/>
        <ScrollToTop/>
        <ContactPopup/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/products" element={<ProductsPage/>} />
            <Route path="/products/:category" element={<ProductCategoryPage/>} />
            <Route path="/projects" element={<ProjectsPage/>} />
            <Route path="/projects/:slug" element={<ProjectDetailPage/>} />
            <Route path="/showrooms" element={<ShowroomsPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage/>} />
            <Route path="/terms-of-service" element={<TermsPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        </>
    )
}

export default App
