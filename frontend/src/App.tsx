import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadFiles from './pages/UploadFiles.tsx';
import ViewFolder from './pages/ViewFolder.tsx';
import ViewFile from './pages/ViewFile.tsx';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex space-x-4">
        <Link to="/upload" className="text-blue-600">Upload Files</Link>
        <Link to="/view-folder" className="text-blue-600">View Folder</Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/upload" element={<UploadFiles />} />
          <Route path="/view-folder" element={<ViewFolder />} />
          <Route path="/view-folder/:fileId" element={<ViewFile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
