import { useState, lazy, Suspense } from "react"
import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"
import AmbientLayer from "./components/AmbientLayer"
import LoadingScreen from "./components/LoadingScreen"
import ContactPopup from "./components/ContactPopup"
import Skeleton from "./components/Skeleton"

// Lazy loaded page components
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductCategoryPage = lazy(() => import('./pages/ProductCategoryPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))
const ShowroomsPage = lazy(() => import('./pages/ShowroomsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

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
        <Suspense fallback={<Skeleton.Page />}>
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
        </Suspense>
        </>
    )
}

export default App
