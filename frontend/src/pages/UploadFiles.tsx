import React, { useState, useRef } from 'react';
import axios from 'axios';
import sanitize from 'sanitize-filename';
import * as unorm from 'unorm';

const UploadFiles: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for the file input

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];

            // Normalize and sanitize the file name
            const normalizedFileName = unorm.nfc(selectedFile.name);
            const sanitizedFileName = sanitize(normalizedFileName);

            // Create a new sanitized File object
            const sanitizedFile = new File([selectedFile], sanitizedFileName, {
                type: selectedFile.type,
                lastModified: selectedFile.lastModified,
            });

            setFile(sanitizedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setMessage(null);

        try {
            const apiBaseUrl = "http://localhost:3001"; // Temporary till we deploy it later
            const response = await axios.post(`${apiBaseUrl}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);

            // Reset file and file input element after successful upload
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("Failed to upload file");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Upload Files</h2>
            <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef} // Attach the ref to the input element
                className="mb-4"
            />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={!file || uploading}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default UploadFiles;
