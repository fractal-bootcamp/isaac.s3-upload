import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import UploadFiles from './pages/UploadFiles';
import ViewFolder from './pages/ViewFolder';
import ViewFile from './pages/ViewFile';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function NavBar() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <nav className="p-4 bg-gray-200 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/upload" className="text-blue-600">Upload Files</Link>
        <Link to="/view-folder" className="text-blue-600">View Folder</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user.email}</span>
        <button
          onClick={() => signOut()}
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={
              <ProtectedRoute>
                <UploadFiles />
              </ProtectedRoute>
            } />
            <Route path="/view-folder" element={
              <ProtectedRoute>
                <ViewFolder />
              </ProtectedRoute>
            } />
            <Route path="/view-folder/:fileId" element={
              <ProtectedRoute>
                <ViewFile />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/view-folder" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;