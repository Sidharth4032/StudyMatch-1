import { Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/LandingPage/main';
import { LoginPage } from "./pages/loginPage/main";
import { CoursesPage } from "./pages/coursesPage/main";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses" element={<searchPage />} />
        <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </nav>
        <Switch>
          <Route path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <Route path="/terms-of-service">
            <TermsOfService />
          </Route>
        {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
