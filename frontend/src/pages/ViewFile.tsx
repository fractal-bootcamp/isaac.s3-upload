import React from 'react';
import { useParams } from 'react-router-dom';

const ViewFile: React.FC = () => {
    const { fileId } = useParams<{ fileId: string }>();

    // TODO: This is temporary mock data that affects all files uniformly
    // In production, this data will be fetched from the backend per file
    // For instance, the 'owner' property controls share button visibility globally until backend integration
    const fileData = {
        id: fileId,
        name: 'File1.png',
        size: '2MB',
        createdAt: '2024-01-01',
        owner: false,
    };

    const handleShare = () => {
        console.log("Sharing file:", fileData.name);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{fileData.name}</h2>
            <p><strong>Size:</strong> {fileData.size}</p>
            <p><strong>Created At:</strong> {fileData.createdAt}</p>
            {fileData.owner && (
                <button
                    onClick={handleShare}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Share
                </button>
            )}
        </div>
    );
};

export default ViewFile;