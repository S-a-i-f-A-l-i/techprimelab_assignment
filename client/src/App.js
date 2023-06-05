import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectedRoute";
import SharedLayout from "./pages/SharedLayout";
import Dashboard from "./pages/Dashboard";
import ProjectListing from "./pages/ProjectListing";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
