import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectedRoute";
import SharedLayout from "./pages/SharedLayout";
import Dashboard from "./pages/Dashboard";
import ProjectListing from "./pages/ProjectListing";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/projects" element={<ProjectListing />} />
          <Route path="/create-project" element={<CreateProject />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
