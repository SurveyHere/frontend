import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import MySurvey from './SurveyComponent/MySurvey';
import Login from './LoginComponent/Login';
import Survey from './SurveyComponent/Surveys';
import AboutUs from './FooterComponent/AboutUs';
import CreateSurvey from './SurveyComponent/Create-Survey';
import Home from './HomeComponent/Home';
import ScrollToTop from './HomeComponent/Scroll-top';
import Navbar from './HomeComponent/Navbar';
import Footer from './FooterComponent/Footer';
import ContactUs from './FooterComponent/ContactUs';
import TermsAndCondition from './FooterComponent/TermsAndCondition';
import Admin from './AdminComponent/Admin'

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
function AppContent() {
  const location = useLocation();
  const hideNavbar = (location.pathname === '/')|| (location.pathname==='/Admin');
  return (
    <div className="App">
      <ScrollToTop />
      {!hideNavbar && (<><Navbar /></>)}
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Create-Survey' element={<CreateSurvey />} />
        <Route path='/MySurvey' element={<MySurvey />} />
        <Route path='/' element={<Login />} />
        <Route path='/Survey' element={<Survey />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/ContactUs' element={<ContactUs />} />
        <Route path='/TermsAndCondition' element={<TermsAndCondition />} />
        <Route path='/Admin' element={<Admin/>}/>
      </Routes>
      {!hideNavbar && (<><Footer /></>)}
    </div>
  );
}

export default App;
