import { Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./hooks/useAuthContext";
import { LoaderIcon } from "lucide-react";

const App = () => {
  const { user, isLoading } = useAuthContext();
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-base-200 flex items-center justify-center"
        data-theme="coffee"
      >
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div data-theme="coffee">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create"
          element={user ? <CreatePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/note/:id"
          element={user ? <NoteDetailPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
