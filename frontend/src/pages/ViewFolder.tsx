// src/pages/ViewFolder.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const ViewFolder: React.FC = () => {
    const myFiles = [
        { id: '1', name: 'File1.png', size: '2MB', createdAt: '2024-01-01', owner: true },
        { id: '2', name: 'File2.pdf', size: '1.5MB', createdAt: '2024-01-02', owner: true },
    ];

    const sharedFiles = [
        { id: '3', name: 'Shared1.jpg', size: '3MB', createdAt: '2024-01-03', owner: false },
    ];

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Files</h2>
            <ul className="mb-6">
                {myFiles.map(file => (
                    <li key={file.id} className="mb-2 p-4 bg-gray-100 rounded">
                        <Link to={`/view-folder/${file.id}`} className="text-blue-600">
                            {file.name}
                        </Link>
                        <p className="text-sm text-gray-600">
                            {file.size} - Created: {file.createdAt}
                        </p>
                    </li>
                ))}
            </ul>

            <h2 className="text-2xl font-bold mb-4">Shared With Me</h2>
            <ul>
                {sharedFiles.map(file => (
                    <li key={file.id} className="mb-2 p-4 bg-gray-100 rounded">
                        <Link to={`/view-folder/${file.id}`} className="text-blue-600">
                            {file.name}
                        </Link>
                        <p className="text-sm text-gray-600">
                            {file.size} - Created: {file.createdAt}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewFolder;
