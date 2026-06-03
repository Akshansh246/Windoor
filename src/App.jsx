import { Route, Routes } from "react-router"
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SystemsPage from './pages/SystemsPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ShowroomsPage from './pages/ShowroomsPage'
import ContactPage from './pages/ContactPage'
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"
import CustomCursor from "./components/CustomCursor"
import AmbientLayer from "./components/AmbientLayer"

const App = () => {
    return (
        <>
        <AmbientLayer/>
        <CustomCursor/>
        <Navbar/>
        <ScrollToTop/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/systems" element={<SystemsPage/>} />
            <Route path="/projects" element={<ProjectsPage/>} />
            <Route path="/projects/:slug" element={<ProjectDetailPage/>} />
            <Route path="/showrooms" element={<ShowroomsPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
        </Routes>
        </>
    )
}

export default App
