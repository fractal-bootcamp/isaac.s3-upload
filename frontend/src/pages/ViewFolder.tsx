// src/pages/ViewFolder.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatBytes } from '../HelperFunctions';

const ViewFolder: React.FC = () => {
    const [myFiles, setMyFiles] = useState<
        Array<{ id: string; name: string; size: string; createdAt: string; owner: boolean }>
    >([]);

    // This is for later
    const sharedFiles = [
        { id: '3', name: 'Shared1.jpg', size: '3MB', createdAt: '2024-01-03', owner: false },
    ];

    useEffect(() => {
        // Fetch data from the backend API
        const apiBaseUrl = "http://localhost:3001"; // Temporary till we deploy it later
        fetch(`${apiBaseUrl}/api/files`)
            .then((response) => response.json())
            .then((data) => {
                // Map data to match the myFiles format
                const files = data.files.map((file: any) => ({
                    id: file.key,
                    name: file.key,
                    size: formatBytes(file.size),
                    createdAt: new Date(file.lastModified).toLocaleDateString(),
                    owner: true,
                }));
                setMyFiles(files);
            })
            .catch((error) => {
                console.error('Error fetching files:', error);
            });
    }, []);

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Files</h2>
            <ul className="mb-6">
                {myFiles.map((file) => (
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
                {sharedFiles.map((file) => (
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
