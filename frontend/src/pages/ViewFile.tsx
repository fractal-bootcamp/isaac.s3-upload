// src/pages/ViewFile.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatBytes } from '../HelperFunctions';
import { isImageFile } from '../HelperFunctions';

interface FileData {
    id: string;
    name: string;
    size: string;
    createdAt: string;
    owner: boolean; // TODO: Replace with actual owner data when available
    url: string;
}

const ViewFile: React.FC = () => {
    const { fileId } = useParams<{ fileId: string }>();
    const [fileData, setFileData] = useState<FileData | null>(null);

    useEffect(() => {
        // Fetch data from the backend API
        const apiBaseUrl = "http://localhost:3001"; // Temporary till we deploy it later
        fetch(`${apiBaseUrl}/api/files`)
            .then((response) => response.json())
            .then((data) => {
                // Map data to match the FileData interface
                const files: FileData[] = data.files.map((file: any) => ({
                    id: file.key,
                    name: file.key,
                    size: formatBytes(file.size),
                    createdAt: new Date(file.lastModified).toLocaleDateString(),
                    owner: true, // TODO: Replace with actual owner data when available
                    url: file.url,
                }));

                // Find the file that matches the fileId from params
                const matchedFile = files.find((file) => file.id === fileId);
                setFileData(matchedFile || null);
            })
            .catch((error) => {
                console.error('Error fetching files:', error);
            });
    }, [fileId]);

    const handleShare = () => {
        console.log('Sharing file:', fileData?.name);
    };

    if (!fileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{fileData.name}</h2>
            <p>
                <strong>Size:</strong> {fileData.size}
            </p>
            <p>
                <strong>Created At:</strong> {fileData.createdAt}
            </p>
            {fileData.owner && (
                <button
                    onClick={handleShare}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Share
                </button>
            )}
            {isImageFile(fileData.name) && (
                <div className="mt-4">
                    <img src={fileData.url} alt={fileData.name} className="max-w-full h-auto" />
                </div>
            )}
        </div>
    );
};

export default ViewFile;
