// src/pages/UploadFiles.tsx
import React, { useState } from 'react';

const UploadFiles: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        // Placeholder function to handle file upload
        console.log("Uploading:", file);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Upload Files</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4"
            />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={!file}
            >
                Upload
            </button>
        </div>
    );
};

export default UploadFiles;
