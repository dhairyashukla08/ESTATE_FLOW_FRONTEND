import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AgentDashboard from "./pages/AgentDashboard.jsx";
import AdminPanel from "./pages/Admin/AdminPanel.jsx";
import AddProperty from "./pages/AddProperty.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import Agents from "./pages/Agents.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Commercial from "./pages/Commercial.jsx";
import Plots from "./pages/Plots.jsx";
import Auth from "./pages/Auth.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/plots" element={<Plots />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />

            {/*  USER ROUTES  */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["user", "agent", "admin"]}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Agent/Seller Routes */}
            <Route
              path="/list-property"
              element={
                <ProtectedRoute allowedRoles={["agent", "admin"]}>
                  <AddProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent/manage"
              element={
                <ProtectedRoute allowedRoles={["agent", "admin"]}>
                  <AgentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
